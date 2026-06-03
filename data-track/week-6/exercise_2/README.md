# Exercise 2: End-to-End Blob Verification

Upload a JSON file from Python, then verify it from the CLI. This is the loop you will use throughout the assignment to prove your pipeline actually wrote what it claims to have written.

## Setup

This exercise needs the **shared Azure Storage account**. Ask your teacher for the connection string (or read it from the Key Vault you have access to).

```bash
pip install -r requirements.txt
export AZURE_STORAGE_CONNECTION_STRING='DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net'
```

`.env.example` shows the shape. Copy it to `.env` (gitignored) if you prefer to keep it on disk.

The starter detects a missing connection string and exits with a clear message: run `python3 exercise.py` first **without** the env var to see the graceful failure, then export the string and run again.

## Task

1. Finish TODO 1 in `exercise.py`: build a `BlobServiceClient` from the connection string.
2. Finish TODO 2: upload the JSON payload returned by `build_payload()` to the blob name returned by `build_blob_name()`. Use `overwrite=True` so you can rerun without conflicts.
3. Finish TODO 3: print the blob name plus the two `az storage blob ...` commands the student should now run.
4. From the CLI, run the two `az storage blob` commands the script printed. Confirm the blob appears in the list and the downloaded content matches what you uploaded.
5. Clean up: `az storage blob delete --account-name <name> --container-name raw --name test/practice_<date>.json --auth-mode login`.

## Success criteria

- Without `AZURE_STORAGE_CONNECTION_STRING`, the starter prints clear instructions and exits non-zero.
- With the env var set, the script uploads to `test/practice_<today>.json` and prints the verification commands.
- `az storage blob list --prefix test/` shows the blob.
- `az storage blob download` retrieves a file whose contents match what Python uploaded.

## Stretch

- Replace the connection string with `DefaultAzureCredential` from `azure.identity` and `BlobServiceClient(account_url=..., credential=...)`. This is the pattern you will use in Week 12 (Key Vault + Managed Identity).
- Add a second upload with a different blob name and use `az storage blob list --prefix test/` to confirm both are present.
