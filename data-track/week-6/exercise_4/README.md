# Exercise 4: Create a Container App Job

Write the `az containerapp job create` command for the **shared** HYF environment, validate it against the gotchas list, then create and inspect your job.

## Setup

```bash
az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
```

Confirm your ACR image tag from Week 5:

```bash
az acr repository show-tags \
  --name hyfregistry \
  --repository weather-pipeline \
  --output table
```

## Task

1. Open `exercise.sh`. Replace `<your_name>` and `<your_acr_tag>` with your values.
2. Fill in the full `az containerapp job create` command using the shared values from Chapter 5 (`rg-hyf-data`, `env-hyf-data`, `hyfregistry.azurecr.io`).
3. Run the gotchas check **before** creating the job:
   ```bash
   bash validate_flags.sh exercise.sh
   ```
4. Once validation passes, run your create command, then list jobs and print the portal link.
5. Optional: start the job and read logs:
   ```bash
   az containerapp job start --name job-practice-<your_name> --resource-group rg-hyf-data
   az containerapp job logs show --name job-practice-<your_name> --resource-group rg-hyf-data --container weather-pipeline
   ```

## Success criteria

- `validate_flags.sh` passes on your `exercise.sh`.
- The create command targets `rg-hyf-data` / `env-hyf-data` / `hyfregistry.azurecr.io` (not fictional `rg-weather-dev` names).
- `az containerapp job list` shows your job, and the portal URL opens the correct blade.

## Cleanup

Delete your practice job when done:

```bash
az containerapp job delete --name job-practice-<your_name> --resource-group rg-hyf-data --yes
```

## Pre-flight widget

> 🚀 [Validate Container App Job create command](https://lasse.be/simple-hyf-teach-widget/?exercise=w6_azure_container_apps_jobs__validate_create_command&lang=python)
