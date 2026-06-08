# Exercise 3: Blob upload + Postgres ingest (both env vars)

Practice the assignment's dual-output pattern: upload raw CSV to Blob Storage, then ingest the same file into Postgres in your personal schema.

> 🖼️ [Visual: SQLite vs managed PostgreSQL](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/8a615596328ac899d5b99b197570e059/raw/sqlite_vs_postgres_visual.html)

## Setup

1. Install dependencies:
   ```bash
   uv sync
   ```
2. Export **both** secrets from Key Vault (same flow as Chapter 5 and Exercise 2):
   ```bash
   export POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)"
   export AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"
   ```
3. Replace `<your_name>` in `BLOB_PREFIX` inside `exercise.py` with your GitHub handle (lowercase).

## Task

1. Implement `upload_csv_to_blob()` (TODO A): upload `weather_data.csv` to the `raw` container.
2. Implement `run_postgres_ops()` (TODOs 1–5): schema isolation, table DDL, CSV ingest, query, commit.
3. Run:
   ```bash
   uv run python exercise.py
   ```
4. Verify in **DBeaver** (Chapter 4): connect with the same credentials as `POSTGRES_URL`, set `search_path` to your schema, and `SELECT * FROM practice_readings`.

## Success criteria

- Script exits with a clear message if either env var is missing.
- Blob appears at `raw/practice/<your_name>/weather_data.csv` (check with `az storage blob list` or the portal).
- Postgres shows ingested rows in `dev_<your_name>.practice_readings`.
- DBeaver query matches the Python `SELECT` output.

## Stretch

- Add `ON CONFLICT DO NOTHING` on `(station, timestamp)` for idempotent reruns.
- Delete your practice blob when finished.
