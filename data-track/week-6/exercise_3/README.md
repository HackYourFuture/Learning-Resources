# Exercise 3: Connect to Postgres, Create Table, Ingest CSV and Query

Connect to the shared Azure Database for PostgreSQL, create a practice table in your own schema, ingest rows from a local CSV file, and query them using Python and `psycopg2`.

## Setup

1. Install dependencies:
   ```bash
   uv sync
   ```
2. Retrieve the connection string from Key Vault (same flow as Chapter 5):
   ```bash
   export POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)"
   ```

## Task

1. Open `exercise.py` and implement `run_postgres_ops(url, csv_path)`.
2. Complete the five TODOs in order:
   * **TODO 1:** Connect with `psycopg2.connect(url)` inside `contextlib.closing()`.
   * **TODO 2:** Create a student-specific schema (e.g. `dev_lasse`), `SET search_path` to it, then run `cur.execute(CREATE_PRACTICE_READINGS_SQL)` — the table DDL is pre-written at the top of the file.
   * **TODO 3:** Read `weather_data.csv` with `csv.DictReader` and insert each row with a parameterised `INSERT`.
   * **TODO 4:** `SELECT` and print the inserted rows.
   * **TODO 5:** `conn.commit()`.
3. Run the script:
   ```bash
   uv run python exercise.py
   ```

## Success criteria

- Without `POSTGRES_URL`, the script exits with a clear error message.
- With Key Vault credentials set, the script creates your schema, ingests the three CSV rows, and prints query results.
- Re-running the script appends duplicate rows (expected) — your personal schema keeps your data separate from other students.

## Stretch

- Add `ON CONFLICT DO NOTHING` on `(station, timestamp)` so reruns are idempotent.
- Change the schema name to `dev_<your_name>` and verify in psql that your table lives there, not in `public`.
