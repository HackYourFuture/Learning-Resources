# Exercise 4: Dry-Run a Container App Job

Write the `az containerapp job create` command you would run for the weather-ingest job in a bash script, then run a dry-run self-check against the Week 6 gotchas list.

## Setup

No extra dependencies. The validator script `check.py` is standard library-only.

## Task

1. Open `exercise.sh`.
2. Fill in the full `az containerapp job create` command using the exact configuration values described in the file's comments.
3. Run the dry-run check using the validator script:
   ```bash
   python3 check.py
   ```
4. If a flag is missing or carries an incorrect value, the script exits non-zero and prints the error. Fix your command in `exercise.sh` and rerun until you see `Self-check OK`.

## Success criteria

- `exercise.sh` contains a complete `az containerapp job create` command.
- Running `python3 check.py` outputs:
  ```text
  Self-check OK. All required flags and values in exercise.sh are present.
  ```

## Why this exercise exists

Container Apps Job failures in Week 6 trace back to a missing flag more often than a runtime bug. Writing the command first in a script and checking it catches mistakes **before** you spend Azure credits creating a broken job.
