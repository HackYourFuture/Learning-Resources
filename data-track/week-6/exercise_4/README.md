# Exercise 4: Create a Container App Job

Write the `az containerapp job create` command for the **shared** HYF environment, validate it against the gotchas list, then create, **start**, and verify your job.

> 🖼️ [Visual: Container App vs Job lifecycle](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/def227672a0a9fd8ad123a95350633b3/raw/container_app_vs_job_visual.html)
>
> 🖼️ [Visual: local vs cloud environment variables](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/8a615596328ac899d5b99b197570e059/raw/env_vars_local_vs_cloud_visual.html)
>
> 🖼️ [Visual: Exercise 4 deploy sequence](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/bcd40b4adef81347309c9b931a04098f/raw/ex4_deploy_sequence_visual.html)

## Setup

```bash
az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
```

Confirm **your** ACR image tag from Week 5 (lowercase GitHub handle):

```bash
az acr repository show-tags \
  --name hyfregistry \
  --repository <your-handle>-weather-pipeline \
  --output table
```

> **Fallback:** If your image is missing or fails to pull, use the teacher-maintained reference image `hyfregistry.azurecr.io/weather-pipeline:assignment` to practice the CLI workflow. Verify with `az acr repository show-tags --name hyfregistry --repository weather-pipeline -o table`.

## Task

1. Open `exercise.sh`. Replace `<your_name>`, `<your-handle>`, and `<your_acr_tag>` with your values.
2. Fill in the full `az containerapp job create` command using the shared values from Chapter 5 (`rg-hyf-data`, `env-hyf-data`, `hyfregistry.azurecr.io`).
3. Run the gotchas check **before** creating the job:
   ```bash
   bash validate_flags.sh exercise.sh
   ```
4. Once validation passes, run your create command, then list jobs and print the portal link.
5. **Start** the job and read **logs** (in class you always do this after create):
   ```bash
   az containerapp job start --name job-practice-<your_name> --resource-group rg-hyf-data
   az containerapp job logs show --name job-practice-<your_name> --resource-group rg-hyf-data --container job-practice-<your_name>
   ```
6. If the execution succeeded, verify outputs the same way as Ex2/Ex3: blob list + Postgres/DBeaver row check.

> **Class tip:** your teacher may first create a job **without** `--registry-server` to show the image-pull error on start, then recreate with the full flags.

## Success criteria

- `validate_flags.sh` passes on your `exercise.sh`.
- The create command targets `rg-hyf-data` / `env-hyf-data` / `hyfregistry.azurecr.io` (not fictional `rg-weather-dev` names).
- `az containerapp job list` shows your job, and the portal URL opens the correct blade.
- You ran **`job start`** and read **`job logs show`** with `--container` equal to the job name.
- You can explain why **create ≠ start** and why **`--registry-server`** is required.

## Cleanup

Delete your practice job when done:

```bash
az containerapp job delete --name job-practice-<your_name> --resource-group rg-hyf-data --yes
```

## Pre-flight widget

> 🚀 [Validate Container App Job create command](https://lasse.be/simple-hyf-teach-widget/?exercise=w6_azure_container_apps_jobs__validate_create_command&lang=python)
