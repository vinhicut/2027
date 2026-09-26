import os
import sys
import subprocess
import shutil
import hashlib
import json
import argparse
from pathlib import Path

def calculate_sha256(file_path: Path) -> str:
    """Calculates the SHA-256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def build_wasm(rust_dir: Path):
    """Builds the Rust Wasm project."""
    print(f"[*] Building Wasm from {rust_dir}...")
    if not rust_dir.exists():
        print(f"[-] Error: Rust Wasm directory {rust_dir} does not exist.", file=sys.stderr)
        sys.exit(1)

    import tempfile
    env = os.environ.copy()
    if "CARGO_TARGET_DIR" not in env:
        env["CARGO_TARGET_DIR"] = os.path.join(tempfile.gettempdir(), "cargo-target-wasm")

    wasm_build_cmd = ["wasm-pack", "build", "--target", "web", "--release"]
    try:
        subprocess.run(wasm_build_cmd, cwd=rust_dir, check=True, env=env)
        print("[+] Wasm build completed successfully.")
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print("[*] 'wasm-pack' not available/failed. Falling back to cargo build --target wasm32-unknown-unknown...")
        cargo_build_cmd = ["cargo", "build", "--target", "wasm32-unknown-unknown", "--release"]
        subprocess.run(cargo_build_cmd, cwd=rust_dir, check=True, env=env)
        
        target_dir = Path(env["CARGO_TARGET_DIR"]) / "wasm32-unknown-unknown" / "release"
        pkg_dir = rust_dir / "pkg"
        pkg_dir.mkdir(parents=True, exist_ok=True)
        
        for wasm_file in target_dir.glob("*.wasm"):
            dest_name = wasm_file.name
            shutil.copy2(wasm_file, pkg_dir / dest_name)
            print(f"[+] Copied {wasm_file.name} to {pkg_dir / dest_name}")

def package_and_hash(rust_dir: Path, frontend_assets_dir: Path, manifest_file: Path):
    """Copies the Wasm files to the frontend directory and calculates hashes for CSP."""
    print("[*] Packaging Wasm and calculating hashes...")
    os.makedirs(frontend_assets_dir, exist_ok=True)
    os.makedirs(manifest_file.parent, exist_ok=True)
    
    pkg_dir = rust_dir / "pkg"
    manifest = {"files": {}}
    
    if not pkg_dir.exists():
         print(f"[-] Error: Wasm package directory {pkg_dir} not found. Build may have failed or output to a different directory.", file=sys.stderr)
         sys.exit(1)

    has_files = False
    for file_path in pkg_dir.glob("*"):
        if file_path.is_file():
            has_files = True
            dest_path = frontend_assets_dir / file_path.name
            shutil.copy2(file_path, dest_path)
            
            # Calculate hash
            file_hash = calculate_sha256(dest_path)
            manifest["files"][file_path.name] = {
                "sha256": file_hash,
                "path": str(dest_path)
            }
            print(f"  -> Copied {file_path.name} (SHA256: {file_hash})")

    if not has_files:
        print(f"[-] Error: No files found in {pkg_dir}.", file=sys.stderr)
        sys.exit(1)

    with open(manifest_file, "w") as f:
        json.dump(manifest, f, indent=4)
    print(f"[+] Wasm packaging complete. Manifest saved to {manifest_file}.")

def main():
    parser = argparse.ArgumentParser(description="Wasm Packager and Hasher")
    parser.add_argument("--rust-dir", type=str, default="frontend/wasm-crypto", help="Path to the Rust Wasm project")
    parser.add_argument("--out-dir", type=str, default="frontend/public/wasm", help="Directory to output packaged Wasm files")
    parser.add_argument("--manifest", type=str, default="devsecops/wasm_manifest.json", help="Path to save the manifest JSON file")
    
    args = parser.parse_args()
    rust_dir = Path(args.rust_dir)
    out_dir = Path(args.out_dir)
    manifest = Path(args.manifest)

    build_wasm(rust_dir)
    package_and_hash(rust_dir, out_dir, manifest)

if __name__ == "__main__":
    main()
