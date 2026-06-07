"""Exercise 3: Connect to Postgres, Create Table, Insert and Query.

This exercise verifies that you can connect to your Azure Database for PostgreSQL,
create a table, insert rows, and query them using Python and psycopg2.

It requires the environment variable `POSTGRES_URL` to be set.
"""

import os
import sys
from contextlib import closing
import psycopg2

# We retrieve the connection URL from environment variables.
# You can set it locally using: export POSTGRES_URL="postgresql://..."
POSTGRES_URL = os.environ.get("POSTGRES_URL")

if not POSTGRES_URL:
    print("Error: POSTGRES_URL environment variable is not set.")
    print("Please set it in your terminal, e.g.:")
    print("  export POSTGRES_URL=\"postgresql://pipeline_user:<PASSWORD>@hyf-data-pg.postgres.database.azure.com:5432/team1?sslmode=require\"")
    sys.exit(1)


def run_postgres_ops(url: str) -> None:
    # TODO 1: Connect to the PostgreSQL database using psycopg2.connect(url).
    #         Wrap the connection in contextlib.closing() to ensure it closes cleanly.
    #         Create a cursor from the connection and execute a CREATE TABLE query.
    #         The table should be named 'practice_readings' and contain some columns
    #         (e.g., station TEXT, timestamp TIMESTAMPTZ, temperature_c DOUBLE PRECISION).
    #
    # TODO 2: Insert two rows of sample data.
    #
    # TODO 3: Execute a SELECT query to retrieve all rows from 'practice_readings'.
    #         Fetch and print the results to verify the inserts succeeded.
    #
    # TODO 4: Commit your transaction using connection.commit().
    raise NotImplementedError


if __name__ == "__main__":
    print("Connecting to PostgreSQL and running operations...")
    run_postgres_ops(POSTGRES_URL)
    print("PostgreSQL operations completed successfully.")
