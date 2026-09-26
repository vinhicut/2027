import json
import base64
import sys
import argparse
from pathlib import Path

# Base CSP directives
BASE_CSP = {
    "default-src": ["'self'"],
    "script-src": ["'self'"],
    "wasm-unsafe-eval": ["'self'"],  # Some browsers require this for wasm, alternatively we use specific wasm hashes if supported
    "style-src": ["'self'", "'unsafe-inline'"], # React/Vue might need unsafe-inline for dev, extract to strict nonces in prod
    "connect-src": ["'self'", "https://api.yourdomain.com"],
    "img-src": ["'self'", "data:"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
}

def generate_csp(manifest_path: Path, csp_output: Path):
    print(f"[*] Generating dynamic Content Security Policy (CSP) from {manifest_path}...")
    
    csp_policy = BASE_CSP.copy()
    
    if not manifest_path.exists():
        print(f"[-] Error: Wasm manifest file not found at {manifest_path}.", file=sys.stderr)
        print("[-] Ensure the package_wasm.py script ran successfully before this.", file=sys.stderr)
        sys.exit(1)

    try:
        with open(manifest_path, "r") as f:
            manifest = json.load(f)
            
        for filename, info in manifest.get("files", {}).items():
            if filename.endswith(".js") or filename.endswith(".wasm"):
                # Convert hex sha256 to base64 for CSP
                hex_hash = info["sha256"]
                b64_hash = base64.b64encode(bytes.fromhex(hex_hash)).decode('utf-8')
                # Wasm can also have a sha256 in the script-src in some browsers/specs
                csp_policy["script-src"].append(f"'sha256-{b64_hash}'")
                print(f"  -> Added hash for {filename} to script-src")

        # Construct the CSP string
        csp_string_parts = []
        for directive, sources in csp_policy.items():
            csp_string_parts.append(f"{directive} {' '.join(sources)}")
            
        csp_string = "; ".join(csp_string_parts) + ";"
        
        # Save as Nginx config format, or write directly to a .env file to be injected into the web server
        csp_output.parent.mkdir(parents=True, exist_ok=True)
        with open(csp_output, "w") as f:
            f.write(f'add_header Content-Security-Policy "{csp_string}" always;\n')
            
        print(f"[+] CSP generation complete. Policy saved to {csp_output}")
        print(f"    Policy: {csp_string[:100]}...")
    except json.JSONDecodeError as e:
        print(f"[-] Error: Failed to parse manifest JSON: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"[-] Error during CSP generation: {e}", file=sys.stderr)
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Dynamic CSP Generator")
    parser.add_argument("--manifest", type=str, default="devsecops/wasm_manifest.json", help="Path to the Wasm manifest JSON file")
    parser.add_argument("--output", type=str, default="devsecops/csp_headers.conf", help="Path to output the CSP headers config")
    
    args = parser.parse_args()
    
    generate_csp(Path(args.manifest), Path(args.output))

if __name__ == "__main__":
    main()
