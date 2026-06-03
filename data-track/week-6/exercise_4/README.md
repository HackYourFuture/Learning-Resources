# Exercise 4: Dry-Run a Container App Job

Write the `az containerapp job create` command you would run for the weather-ingest job, then check it against the Week 6 gotchas list. Pure Python: no Azure access required.

## Setup

No extra dependencies. The starter is stdlib-only.

## Task

1. Open `exercise.py`. Read `REQUIRED_FLAGS` and the constants above it.
2. Implement `build_create_command()` (TODO 1). Use the constants verbatim (do not invent values) so the self-check can verify the literal flags.
3. Run `python3 exercise.py`. It prints your command, then runs `check_command()` to confirm every flag in `REQUIRED_FLAGS` is present.
4. If a flag is missing, the script exits non-zero and tells you which. Fix and rerun until you see `Self-check OK`.

## Success criteria

- The script prints a multi-line `az containerapp job create ...` command.
- Every flag from `REQUIRED_FLAGS` appears in your command.
- Final line reads `Self-check OK. All required flags are present.` and the exit code is `0`.

## Why this exercise exists

Container Apps Job failures in Week 6 trace back to a missing flag more often than a runtime bug. Writing the command first and reviewing it against a checklist catches the mistake **before** you spend Azure credits creating a broken job.

Run the [Validate Container App Job create command widget](https://lasse.be/simple-hyf-teach-widget/?exercise=w6_azure_container_apps_jobs__validate_create_command&lang=python) to train the same flag-spotting habit on a different string.

## Stretch

- Extend `check_command()` to flag plain-text secrets (e.g. `POSTGRES_PASSWORD=hunter2`) and warn the student to use `secretref:` instead.
- Generate the command from a Python dict and use `shlex.join()` to assemble it. What changes when the password contains a space?
