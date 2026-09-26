# DevSecOps Automation Scripts

This directory contains Python scripts for automating DevSecOps tasks within the CI/CD pipeline, adhering to the architectural constraints:
- **Python** is used exclusively for DevOps, CI/CD automation, and infrastructure.
- **Microservices architecture** requires secure secret management per service.
- **Frontend E2EE encryption** relies on Rust compiled to WebAssembly (Wasm).

## Scripts Overview

### 1. `package_wasm.py`
Automates the build process for the Rust Wasm E2EE module.
- Compiles the Rust source code using `wasm-pack`.
- Calculates SHA-256 hashes for the generated `.wasm` and `.js` bindings.
- Copies the Wasm assets to the frontend public directory.
- Outputs a `wasm_manifest.json` containing the cryptographic hashes.

### 2. `generate_csp.py`
Generates a dynamic Content Security Policy (CSP) based on the Wasm build artifacts.
- Reads the `wasm_manifest.json` produced by the Wasm packaging script.
- Dynamically injects `sha256-...` hashes into the `script-src` directive for the Wasm JS bindings.
- This ensures that only the exactly compiled, unmodified E2EE logic can be executed by the browser, severely mitigating XSS attacks.
- Outputs a `csp_headers.conf` file (or similar format) that can be sourced by Nginx or injected into the web server.

### 3. `vault_secrets.py`
Securely fetches secrets from HashiCorp Vault.
- Authenticates using Vault AppRole (designed for CI/CD machine-to-machine authentication).
- Fetches secrets (e.g., database passwords, API keys) from a specific KV mount and path.
- Injects these secrets into a local `.env` file just before the application builds or deploys.

## CI/CD Pipeline Integration

These scripts integrate sequentially into a modern CI/CD pipeline (e.g., GitLab CI, GitHub Actions, Jenkins) to ensure secure builds and deployments.

### Example Pipeline Stages

#### Stage 1: Secret Injection (`pre-build`)
At the very beginning of the pipeline, before any code is compiled or containers are built, the runner authenticates with Vault and pulls the required environment variables.

```yaml
# Example CI snippet
secrets_job:
  stage: pre-build
  script:
    - pip install hvac
    - python devsecops/vault_secrets.py --path app/production/database --mount secret
  artifacts:
    paths:
      - .env
```
*Note: In production, the `.env` should never be committed to source control and is only exposed to the runner environment or injected directly into the container orchestrator.*

#### Stage 2: Wasm Build and Packaging (`build`)
The frontend pipeline triggers the Wasm compilation. The Python script handles the orchestration.

```yaml
build_wasm_job:
  stage: build
  script:
    - python devsecops/package_wasm.py
  artifacts:
    paths:
      - devsecops/wasm_manifest.json
      - frontend/public/wasm/
```

#### Stage 3: Security & CSP Generation (`security`)
Using the artifact hashes from the build stage, the CSP is dynamically generated.

```yaml
generate_csp_job:
  stage: security
  script:
    - python devsecops/generate_csp.py
  artifacts:
    paths:
      - devsecops/csp_headers.conf
```

#### Stage 4: Deployment (`deploy`)
During deployment, the generated Wasm files are bundled with the frontend, the `.env` secrets configure the backend microservices, and the `csp_headers.conf` is pushed to the reverse proxy (e.g., Nginx or Ingress Controller) or injected into the frontend server configuration.

This approach implements a **Zero-trust** methodology by ensuring secrets are only materialized when needed and that client-side execution boundaries (Wasm E2EE) are cryptographically enforced via dynamic CSPs.
