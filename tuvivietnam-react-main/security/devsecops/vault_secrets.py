import os
import sys
import hvac
import argparse
import requests
from pathlib import Path

# In a real CI environment, VAULT_ROLE_ID and VAULT_SECRET_ID would be injected via GitLab CI / GitHub Actions secrets.
VAULT_ADDR = os.environ.get("VAULT_ADDR", "http://127.0.0.1:8200")
ROLE_ID = os.environ.get("VAULT_ROLE_ID")
SECRET_ID = os.environ.get("VAULT_SECRET_ID")

def authenticate_vault(client):
    """Authenticates with HashiCorp Vault using AppRole."""
    if not ROLE_ID or not SECRET_ID:
        print("[-] VAULT_ROLE_ID or VAULT_SECRET_ID not set. Using dev token authentication if VAULT_TOKEN is set.", file=sys.stderr)
        if not os.environ.get("VAULT_TOKEN"):
             print("[-] Error: No VAULT_TOKEN found either. Please configure Vault credentials.", file=sys.stderr)
             return False
        return True # HVAC will automatically use VAULT_TOKEN environment variable

    try:
        response = client.auth.approle.login(
            role_id=ROLE_ID,
            secret_id=SECRET_ID
        )
        print("[+] Vault authentication successful (AppRole).")
        client.token = response['auth']['client_token']
        return True
    except hvac.exceptions.InvalidRequest as e:
        print(f"[-] Vault authentication failed: {e}", file=sys.stderr)
        return False
    except requests.exceptions.RequestException as e:
        print(f"[-] Error connecting to Vault at {VAULT_ADDR}: {e}", file=sys.stderr)
        return False

def fetch_and_inject_secrets(client, secrets_path, mount_point="secret", env_file_path=Path(".env")):
    """Fetches secrets from the specified Vault path and writes them to a .env file."""
    print(f"[*] Fetching secrets from {mount_point}/data/{secrets_path}...")
    try:
        read_response = client.secrets.kv.v2.read_secret_version(
            mount_point=mount_point,
            path=secrets_path,
            raise_on_deleted_version=True,
        )
        secrets = read_response['data']['data']
        
        # Read existing .env to append or overwrite
        existing_env = {}
        if env_file_path.exists():
            with open(env_file_path, "r") as f:
                for line in f:
                    if "=" in line and not line.strip().startswith("#"):
                        key, val = line.strip().split("=", 1)
                        existing_env[key] = val

        # Update with Vault secrets
        existing_env.update(secrets)

        # Write back to .env
        with open(env_file_path, "w") as f:
            f.write("# Auto-generated from Vault via DevSecOps Pipeline\n")
            for key, val in existing_env.items():
                f.write(f"{key}={val}\n")
                
        print(f"[+] Secrets injected successfully into {env_file_path}")
        return True

    except hvac.exceptions.InvalidPath:
        print(f"[-] Error: Secret path not found in Vault: {secrets_path}", file=sys.stderr)
        return False
    except hvac.exceptions.Forbidden:
        print(f"[-] Error: Access denied to secret path {secrets_path}. Check policy permissions.", file=sys.stderr)
        return False
    except requests.exceptions.RequestException as e:
        print(f"[-] Error communicating with Vault: {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"[-] Unexpected error fetching secrets: {e}", file=sys.stderr)
        return False

def main():
    parser = argparse.ArgumentParser(description="HashiCorp Vault Secret Injector")
    parser.add_argument("--path", type=str, required=True, help="Vault secret path (e.g., app/production/database)")
    parser.add_argument("--mount", type=str, default="secret", help="KV secret engine mount point (default: secret)")
    parser.add_argument("--env-file", type=str, default=".env", help="Path to the .env file to update")
    args = parser.parse_args()

    client = hvac.Client(url=VAULT_ADDR)
    
    if not authenticate_vault(client):
        sys.exit(1)
        
    if not fetch_and_inject_secrets(client, args.path, args.mount, Path(args.env_file)):
        sys.exit(1)

if __name__ == "__main__":
    main()
