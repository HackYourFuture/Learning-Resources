#!/usr/bin/env bash
# Exercise 4: Create a Container App Job
#
# Write the `az containerapp job create` command for the shared HYF environment.
# Run validate_flags.sh before executing the create command.
#
# Replace placeholders before running against live Azure:
#   JOB_NAME       → job-practice-<your_name>  (unique per student)
#   YOUR_HANDLE    → lowercase GitHub username (Week 5 ACR repo prefix)
#   IMAGE_TAG      → your ACR tag from Week 5 (e.g. 1.0 or a commit SHA)
#
# Shared values (from Chapter 5):
#   Resource Group:  rg-hyf-data
#   Environment:     env-hyf-data
#   Registry Server: hyfregistry.azurecr.io
#   Image (yours):   hyfregistry.azurecr.io/<your-handle>-weather-pipeline:<IMAGE_TAG>
#   Fallback image:  hyfregistry.azurecr.io/weather-pipeline:assignment
#   Trigger Type:    Manual
#   Replica Timeout: 300
#
# Tip: look up your tag with:
#   az acr repository show-tags --name hyfregistry --repository <your-handle>-weather-pipeline -o table

set -euo pipefail

JOB_NAME="job-practice-<your_name>"
YOUR_HANDLE="<your-handle>"
IMAGE_TAG="<your_acr_tag>"

# TODO 1: Write the full `az containerapp job create` command below.
# Include --registry-server, --replica-timeout, and --env-vars with Key Vault values:
#   POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)"
#   AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"
#   LOG_LEVEL=INFO
# Image: use hyfregistry.azurecr.io/${YOUR_HANDLE}-weather-pipeline:${IMAGE_TAG}
# Fallback (if your image fails): hyfregistry.azurecr.io/weather-pipeline:assignment

# TODO 2: Run the gotchas check before creating:
#   bash validate_flags.sh exercise.sh

# TODO 3: List container app jobs in rg-hyf-data after create:
#   az containerapp job list --resource-group rg-hyf-data -o table

# TODO 4: Print the Azure Portal URL to your job:
#   SUBSCRIPTION_ID=$(az account show --query id -o tsv)
#   echo "https://portal.azure.com/#resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/rg-hyf-data/providers/Microsoft.App/jobs/${JOB_NAME}"

# TODO 5: Start the job (create ≠ start — the job does not run until you start it):
#   az containerapp job start --name "${JOB_NAME}" --resource-group rg-hyf-data

# TODO 6: Read execution logs (--container is the job name, not the image name):
#   az containerapp job logs show --name "${JOB_NAME}" --resource-group rg-hyf-data --container "${JOB_NAME}"

# TODO 7: If the run succeeded, verify outputs (same loop as Ex2/Ex3):
#   az storage blob list --account-name hyfstoragedev --container-name raw --auth-mode login --prefix <your_prefix> -o table
#   DBeaver: confirm new rows or check the teacher demo on screen
