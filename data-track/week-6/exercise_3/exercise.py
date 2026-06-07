"""Exercise 3: Connect to Postgres, Create Table, Ingest CSV and Query.

This exercise verifies that you can connect to your Azure Database for PostgreSQL,
create a table, read rows from a local CSV file, insert them using psycopg2,
and query the table to confirm the ingestion succeeded.
"""

import os
import sys
import csv
from pathlib import Path
from contextlib import closing
import psycopg2

POSTGRES_URL = os.environ.get("POSTGRES_URL")
CSV_PATH = Path(__file__).parent / "weather_data.csv"

# Table DDL is provided so you can focus on connection, schema isolation, and DML.
CREATE_PRACTICE_READINGS_SQL = """
CREATE TABLE IF NOT EXISTS practice_readings (
    id SERIAL PRIMARY KEY,
    station TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    temperature_c DOUBLE PRECISION NOT NULL
)
"""

if not POSTGRES_URL:
    print("Error: POSTGRES_URL environment variable is not set.")
    print("Please set it in your terminal, e.g.:")
    print("  export POSTGRES_URL=\"postgresql://pipeline_user:<PASSWORD>@hyf-data-pg.postgres.database.azure.com:5432/team1?sslmode=require\"")
    sys.exit(1)


def run_postgres_ops(url: str, csv_path: Path) -> None:
    # TODO 1: Connect to the PostgreSQL database using psycopg2.connect(url).
    #         Wrap the connection in contextlib.closing() to ensure it closes cleanly.
    #         Create a cursor from the connection.
    #
    # TODO 2: Create and set search path to a student-specific schema (e.g. dev_lasse)
    #         to prevent clashing with other students sharing the team1 database:
    #           "CREATE SCHEMA IF NOT EXISTS dev_<name>;"
    #           "SET search_path TO dev_<name>;"
    #         Then execute CREATE_PRACTICE_READINGS_SQL with cur.execute().
    #
    # TODO 3: Open `csv_path` using Python's `csv.DictReader`. Loop over the rows,
    #         parsing temperature_c as a float, and insert each row into the
    #         'practice_readings' table. Use parameterised query (with %s placeholders).
    #
    # TODO 4: Execute a SELECT query to retrieve rows from 'practice_readings'.
    #         Fetch and print the results to verify the inserts succeeded.
    #
    # TODO 5: Commit your transaction using connection.commit().
    raise NotImplementedError


if __name__ == "__main__":
    print("Connecting to PostgreSQL and running operations...")
    run_postgres_ops(POSTGRES_URL, CSV_PATH)
    print("PostgreSQL operations completed successfully.")
