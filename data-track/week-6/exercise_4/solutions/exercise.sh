#!/usr/bin/env bash
# Exercise 4: Create a Container App Job
#
# Shared HYF values aligned with Chapter 5 (Azure Container Apps Jobs).

set -euo pipefail

JOB_NAME="job-practice-example"
YOUR_HANDLE="example"
IMAGE_TAG="1.0"
# Reference solution uses the teacher fallback image so `bash solutions/exercise.sh` runs
# without a personal Week 5 ACR repo. Students substitute their own handle and tag.
IMAGE="hyfregistry.azurecr.io/weather-pipeline:assignment"
# Student image: hyfregistry.azurecr.io/${YOUR_HANDLE}-weather-pipeline:${IMAGE_TAG}

echo "=== Validating flags before create ==="
bash validate_flags.sh solutions/exercise.sh

az containerapp job create \
  --name "${JOB_NAME}" \
  --resource-group rg-hyf-data \
  --environment env-hyf-data \
  --trigger-type Manual \
  --replica-timeout 300 \
  --replica-retry-limit 0 \
  --image "${IMAGE}" \
  --registry-server hyfregistry.azurecr.io \
  --env-vars \
    POSTGRES_URL="$(az keyvault secret show --vault-name kv-hyf-data --name postgres-url --query value -o tsv)" \
    AZURE_STORAGE_CONNECTION_STRING="$(az keyvault secret show --vault-name kv-hyf-data --name storage-connection-string --query value -o tsv)" \
    LOG_LEVEL=INFO
# WHY inline Key Vault retrieval: matches the chapter pattern students already practised
# in exercises 2 and 3. Production setups use secret references; Week 6 keeps it explicit.
# WHY job name = container name for logs: default --container matches the job name.

echo ""
echo "=== Jobs in rg-hyf-data ==="
az containerapp job list --resource-group rg-hyf-data -o table

SUBSCRIPTION_ID=$(az account show --query id -o tsv)
echo ""
echo "Azure Portal URL: https://portal.azure.com/#resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/rg-hyf-data/providers/Microsoft.App/jobs/${JOB_NAME}"

echo ""
echo "=== Starting job ==="
az containerapp job start --name "${JOB_NAME}" --resource-group rg-hyf-data
# WHY start after create: Manual trigger jobs do not run on create; students who skip start see zero rows in Postgres.

echo "Waiting for the job to finish before fetching logs..."
sleep 20

echo ""
echo "=== Job logs ==="
az containerapp job logs show --name "${JOB_NAME}" --resource-group rg-hyf-data --container "${JOB_NAME}"
# WHY --container = job name: the logs command names the replica container; for jobs it defaults to the job resource name.

echo ""
echo "=== Verify outputs (if execution succeeded) ==="
echo "Blob:  az storage blob list --account-name hyfstoragedev --container-name raw --auth-mode login --prefix raw/ -o table"
echo "Rows:  confirm in DBeaver or compare with Ex3 practice_readings pattern"
