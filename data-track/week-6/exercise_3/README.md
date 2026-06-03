# Exercise 3: Debug a Broken Connection String

Take a Postgres connection string with three problems, identify each one, and produce a fixed version. Pure Python: no network call needed.

## Setup

No extra dependencies. The starter uses only `urllib.parse` from the standard library.

## Task

The broken string is hard-coded at the top of `exercise.py`:

```text
postgresql://admin:password@hyf-data-pg/weather_db
```

1. Run `python3 exercise.py` and read the `NotImplementedError` traceback.
2. Implement `diagnose(url)` (TODO 1 + TODO 2). It returns a list of short sentences naming each problem. There are three.
3. Implement `fix(url)` (TODO 3). It returns the same URL with all three problems fixed.
4. Run the script. Confirm the output matches the `# Expected output:` block at the bottom of the file.

The three problems, in case you get stuck:

- Host is missing the Azure FQDN suffix (`.postgres.database.azure.com`).
- No port. Azure Postgres listens on `5432`, and some client libraries refuse to default.
- `sslmode=require` is missing. Azure Postgres rejects unencrypted connections.

## Success criteria

- `diagnose(BROKEN_URL)` returns exactly three problems, in order: host, port, SSL.
- `fix(BROKEN_URL)` returns `postgresql://admin:password@hyf-data-pg.postgres.database.azure.com:5432/weather_db?sslmode=require`.
- The script runs without raising and prints the expected output.

## Stretch

- Pair with the widget version of this exercise, [Parse Postgres URL](https://lasse.be/simple-hyf-teach-widget/?exercise=w6_azure_postgresql__parse_postgres_url&lang=python), to see the same problem from a different angle.
- Extend `diagnose()` to also flag a default `admin` username (Azure recommends per-environment usernames), and a password that looks like a placeholder.
