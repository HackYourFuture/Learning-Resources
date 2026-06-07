# Exercise 4: Dry-Run a Container App Job

Write the `az containerapp job create` command you would run for the weather-ingest job in a bash script, then review it against the Week 6 gotchas list.

## Task

1. Open `exercise.sh`.
2. Fill in the full `az containerapp job create` command using the exact configuration values described in the file's comments.
3. Add a command to list the container app jobs in the `rg-weather-dev` resource group to verify the job exists.
4. Add commands to construct and print the direct Azure Portal URL to the created job.

## Success criteria

- `exercise.sh` contains a complete `az containerapp job create` command with all parameter values.
- Running `bash exercise.sh` successfully creates the job (if run against live Azure), outputs the list of jobs in the resource group, and prints a direct Azure Portal link to the job.


## Why this exercise exists

Container Apps Job failures in Week 6 trace back to a missing flag more often than a runtime bug. Writing the command first in a script and checking it catches mistakes **before** you spend Azure credits creating a broken job.

