#!/usr/bin/env bash
# Exercise 4: Create a Container App Job
#
# Write the `az containerapp job create` command for the shared HYF environment.
# Run validate_flags.sh before executing the create command.
#
# Replace placeholders before running against live Azure:
#   JOB_NAME       → job-practice-<your_name>  (unique per student)
#   IMAGE_TAG      → your ACR tag from Week 5 (e.g. 1.0 or a commit SHA)
#
# Shared values (from Chapter 5):
#   Resource Group:  rg-hyf-data
#   Environment:     env-hyf-data
#   Registry Server: hyfregistry.azurecr.io
#   Image:           hyfregistry.azurecr.io/weather-pipeline:<IMAGE_TAG>
#   Container Name:  weather-pipeline
#   Trigger Type:    Manual
#   Replica Timeout: 300
#
# Tip: look up your tag with:
#   az acr repository show-tags --name hyfregistry --repository weather-pipeline -o table

set -euo pipefail

JOB_NAME="job-practice-<your_name>"
IMAGE_TAG="<your_acr_tag>"

# TODO 1: Write the full `az containerapp job create` command below.
# Include --registry-server, --replica-timeout, and --env-vars with Key Vault values:
#   POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)"
#   AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)"

# TODO 2: Run the gotchas check before creating:
#   bash validate_flags.sh exercise.sh

# TODO 3: List container app jobs in rg-hyf-data after create:
#   az containerapp job list --resource-group rg-hyf-data -o table

# TODO 4: Print the Azure Portal URL to your job:
#   SUBSCRIPTION_ID=$(az account show --query id -o tsv)
#   echo "https://portal.azure.com/#resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/rg-hyf-data/providers/Microsoft.App/jobs/${JOB_NAME}"
