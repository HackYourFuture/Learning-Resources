# Exercise 2: End-to-End Blob Verification

Upload a JSON file from Python, then verify it from the CLI. This is the loop you will use throughout the assignment to prove your pipeline actually wrote what it claims to have written.

> 🖼️ [Visual: Blob Storage hierarchy](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/9ae619afdba937a57ceed0c03fcd7699/raw/blob_storage_hierarchy_visual.html)
>
> 🖼️ [Visual: three different "containers" in Week 6](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/8a615596328ac899d5b99b197570e059/raw/three_containers_visual.html)

## Setup

This exercise needs the **shared Azure Storage account**. Retrieve the connection string from Key Vault using the CLI commands from Chapter 5.

```bash
uv sync
export AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"
```

`.env.example` shows the shape. Copy it to `.env` (gitignored) if you prefer to keep it on disk.

The starter detects a missing connection string and exits with a clear message: run `python3 exercise.py` first **without** the env var to see the graceful failure, then export the string and run again.

## Task

1. Finish TODO 1 in `exercise.py`: build a `BlobServiceClient` from the connection string.
2. Finish TODO 2: upload the JSON payload returned by `build_payload()` to the blob name returned by `build_blob_name()`. Use `overwrite=True` so you can rerun without conflicts.
3. Finish TODO 3: print the blob name plus the two `az storage blob ...` commands the student should now run.
4. From the CLI, run the two `az storage blob` commands the script printed. Confirm the blob appears in the list and the downloaded content matches what you uploaded.
5. Clean up: `az storage blob delete --account-name hyfstoragedev --container-name raw --name test/practice_<date>.json --auth-mode login`.

## Success criteria

- Without `AZURE_STORAGE_CONNECTION_STRING`, the starter prints clear instructions and exits non-zero.
- With the env var set, the script uploads to `test/practice_<today>.json` and prints the verification commands.
- `az storage blob list --prefix test/` shows the blob.
- `az storage blob download` retrieves a file whose contents match what Python uploaded.

## Stretch

- Replace the connection string with `DefaultAzureCredential` from `azure.identity` and `BlobServiceClient(account_url=..., credential=...)`. This is the pattern you will use in Week 12 (Key Vault + Managed Identity).
- Add a second upload with a different blob name and use `az storage blob list --prefix test/` to confirm both are present.

## For teachers

**Two auth layers.** Python uploads via `AZURE_STORAGE_CONNECTION_STRING` (account key). The printed CLI commands use `--auth-mode login`, which is **data-plane** Entra ID auth. Control-plane roles like Owner on `rg-hyf-data` do **not** grant blob read — you will see *"You do not have the required permissions"* even when the Python upload succeeded.

**Students** get `HYF Data Track Student` on `hyfstoragedev` through the `HYF-Students` group. Their `--auth-mode login` commands should work after `az login`. If a student reports a permissions error right after onboarding, wait ~60 seconds for RBAC propagation and retry.

**Verify the solution two ways:**

1. **Simulate student credentials** (matches what students run):

   ```bash
   uv run python solutions/exercise.py   # upload via connection string
   bash verify_as_student.sh             # CLI list + download via --auth-mode login
   ```

   `verify_as_student.sh` temporarily assigns you `HYF Data Track Student` on `hyfstoragedev`, waits for propagation (default 60 s; override with `PROPAGATION_SECS=90`), runs the list/download commands **without** `AZURE_STORAGE_CONNECTION_STRING`, then removes the assignment.

2. **Connection-string fallback** (quick smoke-test only — not the student path):

   ```bash
   az storage blob list --connection-string "$AZURE_STORAGE_CONNECTION_STRING" \
     --container-name raw --prefix test/ --output table
   ```
