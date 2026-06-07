# Exercise 3: Connect to Postgres, Create Table, Insert and Query

Connect to your live Azure Database for PostgreSQL, create a practice table, insert rows, and query them using Python and the `psycopg2` driver.

## Setup

This exercise requires the `psycopg2-binary` library and a valid `POSTGRES_URL` environment variable.

1. Install dependencies:
   ```bash
   uv sync
   ```
2. Set your `POSTGRES_URL` environment variable:
   ```bash
   export POSTGRES_URL="postgresql://pipeline_user:<PASSWORD>@hyf-data-pg.postgres.database.azure.com:5432/team1?sslmode=require"
   ```

## Task

1. Open `exercise.py`.
2. Implement `run_postgres_ops(url)`. You should:
   * Connect to Postgres and wrap the connection with `contextlib.closing`.
   * Create a table called `practice_readings`.
   * Insert two rows of mock weather data.
   * Query the table using `SELECT` and print the results to stdout.
   * Call `conn.commit()` to persist your changes.
3. Run the script:
   ```bash
   python3 exercise.py
   ```

## Success criteria

- Running `python3 exercise.py` connects to the database, creates the table (if missing), inserts the rows, and outputs the queried rows successfully.
