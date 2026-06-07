"""Exercise 3: Upload CSV to Blob Storage, ingest into Postgres, verify both.

Mirrors the assignment pattern: read POSTGRES_URL and AZURE_STORAGE_CONNECTION_STRING
from the environment, land raw data in Blob Storage, then write structured rows to Postgres.
"""

import os
import sys
import csv
from pathlib import Path
from contextlib import closing

import psycopg2

POSTGRES_URL = os.environ.get("POSTGRES_URL")
STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
CSV_PATH = Path(__file__).parent / "weather_data.csv"
CONTAINER_NAME = "raw"
# Use a personal prefix so classmates do not overwrite each other's practice blobs.
BLOB_PREFIX = "practice/<your_name>/"

CREATE_PRACTICE_READINGS_SQL = """
CREATE TABLE IF NOT EXISTS practice_readings (
    id SERIAL PRIMARY KEY,
    station TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    temperature_c DOUBLE PRECISION NOT NULL
)
"""


def require_env() -> tuple[str, str]:
    missing = []
    if not POSTGRES_URL:
        missing.append("POSTGRES_URL")
    if not STORAGE_CONNECTION_STRING:
        missing.append("AZURE_STORAGE_CONNECTION_STRING")
    if missing:
        print(f"Error: missing environment variable(s): {', '.join(missing)}")
        print("Retrieve both from Key Vault before running:")
        print('  export POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)"')
        print('  export AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"')
        sys.exit(1)
    return POSTGRES_URL, STORAGE_CONNECTION_STRING


def upload_csv_to_blob(connection_string: str, csv_path: Path, blob_name: str) -> None:
    # TODO A: Import BlobServiceClient and upload `csv_path` to CONTAINER_NAME at `blob_name`.
    #         Use overwrite=True so reruns do not fail.
    raise NotImplementedError


def run_postgres_ops(url: str, csv_path: Path) -> None:
    # TODO 1: Connect with psycopg2.connect(url) inside contextlib.closing().
    #
    # TODO 2: CREATE SCHEMA IF NOT EXISTS dev_<name>; SET search_path; execute CREATE_PRACTICE_READINGS_SQL.
    #
    # TODO 3: Read csv_path with csv.DictReader; INSERT each row with parameterised SQL.
    #
    # TODO 4: SELECT and print rows to verify ingestion.
    #
    # TODO 5: conn.commit()
    raise NotImplementedError


if __name__ == "__main__":
    postgres_url, storage_conn = require_env()
    blob_name = f"{BLOB_PREFIX}weather_data.csv"

    print("Step 1: upload CSV to Blob Storage...")
    upload_csv_to_blob(storage_conn, CSV_PATH, blob_name)
    print(f"  Uploaded to {CONTAINER_NAME}/{blob_name}")

    print("Step 2: ingest CSV into Postgres...")
    run_postgres_ops(postgres_url, CSV_PATH)
    print("PostgreSQL operations completed successfully.")

    print()
    print("Step 3: verify in DBeaver (see Chapter 4):")
    print("  - Connect with the same host/user/sslmode=require from POSTGRES_URL")
    print("  - SET search_path TO dev_<your_name>;")
    print("  - SELECT * FROM practice_readings;")
