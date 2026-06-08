"""Exercise 3: Upload CSV to Blob Storage, ingest into Postgres, verify both."""

import os
import sys
import csv
from pathlib import Path
from contextlib import closing

import psycopg2
from azure.storage.blob import BlobServiceClient

POSTGRES_URL = os.environ.get("POSTGRES_URL")
STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
CSV_PATH = Path(__file__).parent.parent / "weather_data.csv"
CONTAINER_NAME = "raw"
BLOB_PREFIX = "practice/example/"

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
        print(f"Error: missing environment variable(s): {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)
    return POSTGRES_URL, STORAGE_CONNECTION_STRING


def upload_csv_to_blob(connection_string: str, csv_path: Path, blob_name: str) -> None:
    service = BlobServiceClient.from_connection_string(connection_string)
    container = service.get_container_client(CONTAINER_NAME)
    data = csv_path.read_bytes()
    container.upload_blob(name=blob_name, data=data, overwrite=True)


def run_postgres_ops(url: str, csv_path: Path) -> None:
    with closing(psycopg2.connect(url)) as conn:
        with conn.cursor() as cur:
            cur.execute("CREATE SCHEMA IF NOT EXISTS dev_practice;")
            cur.execute("SET search_path TO dev_practice;")
            cur.execute(CREATE_PRACTICE_READINGS_SQL)

            with open(csv_path, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    cur.execute(
                        """
                        INSERT INTO practice_readings (station, timestamp, temperature_c)
                        VALUES (%s, %s, %s)
                        """,
                        (row["station"], row["timestamp"], float(row["temperature_c"])),
                    )

            cur.execute(
                "SELECT station, timestamp, temperature_c FROM practice_readings ORDER BY id DESC LIMIT 5"
            )
            rows = cur.fetchall()
            print("Query results:")
            for row in rows:
                print(f"  Station: {row[0]}, Time: {row[1]}, Temp: {row[2]}°C")

            conn.commit()


if __name__ == "__main__":
    postgres_url, storage_conn = require_env()
    blob_name = f"{BLOB_PREFIX}weather_data.csv"

    print("Step 1: upload CSV to Blob Storage...")
    upload_csv_to_blob(storage_conn, CSV_PATH, blob_name)
    print(f"  Uploaded to {CONTAINER_NAME}/{blob_name}")

    print("Step 2: ingest CSV into Postgres...")
    run_postgres_ops(postgres_url, CSV_PATH)
    print("PostgreSQL operations completed successfully.")
