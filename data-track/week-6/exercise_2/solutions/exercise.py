"""Exercise 2: End-to-end blob verification.

Upload a JSON file to Azure Blob Storage from Python, then verify it from the CLI.
This trains the upload-from-code, check-from-CLI loop you will use throughout the
assignment to prove your pipeline actually wrote what it claims to have written.

This exercise needs a real Azure Storage account. Retrieve the connection string
from the Key Vault using the CLI commands from Chapter 5. Export it before running:

    export AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"

The Codespace shell session lasts long enough for one practice run. For a longer
session, put it in `.env` and run with `python-dotenv`, or set it in your shell
profile.
"""

import json
import os
import sys
from datetime import date

from azure.storage.blob import BlobServiceClient

CONTAINER_NAME = "raw"
BLOB_PREFIX = "test/"


def require_connection_string() -> str:
    conn = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
    if not conn:
        print(
            "AZURE_STORAGE_CONNECTION_STRING is not set.\n"
            "Retrieve it from Key Vault using the CLI, then export it before running:\n\n"
            "    export AZURE_STORAGE_CONNECTION_STRING=\"$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)\"\n",
            file=sys.stderr,
        )
        sys.exit(1)
    return conn


def build_blob_name() -> str:
    """Return the blob name for today's practice file, e.g. test/practice_2026-04-01.json."""
    return f"{BLOB_PREFIX}practice_{date.today().isoformat()}.json"


def build_payload() -> dict:
    return {
        "exercise": "week_6_practice_2",
        "uploaded_on": date.today().isoformat(),
        "message": "If you can download this from the CLI, the loop works.",
    }


def main() -> None:
    conn = require_connection_string()

    # TODO 1: Import BlobServiceClient from azure.storage.blob and build a client
    #         from the connection string.
    service = BlobServiceClient.from_connection_string(conn)
    # WHY from_connection_string: the connection string already encodes the account
    # name, key, and endpoint. Using it directly avoids the four-argument
    # account_url + credential dance you would otherwise need. Week 12 swaps this for
    # DefaultAzureCredential + Managed Identity, which is the production pattern.

    # TODO 2: Get a ContainerClient for CONTAINER_NAME, then upload the JSON payload
    #         to the blob name returned by build_blob_name(). Use overwrite=True so
    #         repeated runs do not fail with BlobAlreadyExists.
    container = service.get_container_client(CONTAINER_NAME)
    blob_name = build_blob_name()
    payload_bytes = json.dumps(build_payload(), indent=2).encode("utf-8")
    container.upload_blob(name=blob_name, data=payload_bytes, overwrite=True)
    # WHY overwrite=True: idempotent reruns matter for practice exercises. Without
    # overwrite, the second `python3 exercise.py` raises ResourceExistsError, which
    # would force students to delete the blob manually between attempts. In a real
    # pipeline, overwrite=True belongs only on idempotent paths (re-running the
    # same date); for append-only writes, prefer unique blob names per run.

    # TODO 3: After uploading, print:
    #           - the full blob name you wrote
    #           - the two CLI commands the student should now run to verify:
    #               az storage blob list --account-name hyfstoragedev --container-name raw --prefix test/ --output table --auth-mode login
    #               az storage blob download --account-name hyfstoragedev --container-name raw --name <blob_name> --file /tmp/downloaded.json --auth-mode login
    account_name = service.account_name
    print(f"Uploaded {blob_name} ({len(payload_bytes)} bytes)")
    print("Next steps (run from the CLI):")
    print(
        f"  az storage blob list     --account-name {account_name} --container-name {CONTAINER_NAME} "
        f"--prefix {BLOB_PREFIX} --output table --auth-mode login"
    )
    print(
        f"  az storage blob download --account-name {account_name} --container-name {CONTAINER_NAME} "
        f"--name {blob_name} --file /tmp/downloaded.json --auth-mode login"
    )
    # WHY print the exact CLI commands: the whole point of the exercise is the
    # round-trip between Python (writer) and CLI (verifier). Printing the literal
    # `az` commands removes a layer of friction: copy, paste, run, compare.


if __name__ == "__main__":
    main()

# Expected output once AZURE_STORAGE_CONNECTION_STRING is set and TODOs are done:
#
# Uploaded test/practice_2026-04-01.json (123 bytes)
# Next steps (run from the CLI):
#   az storage blob list     --account-name hyfstoragedev --container-name raw --prefix test/ --output table --auth-mode login
#   az storage blob download --account-name hyfstoragedev --container-name raw --name test/practice_2026-04-01.json --file /tmp/downloaded.json --auth-mode login
#
# Expected output WITHOUT the env var (this is the graceful failure mode):
#
#   AZURE_STORAGE_CONNECTION_STRING is not set.
#   ... instructions ...
#   exit code: 1
