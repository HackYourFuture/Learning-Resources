#!/usr/bin/env bash
# Exercise 4: Dry-Run a Container App Job
#
# Write the exact `az containerapp job create` command you would run for the
# weather-ingest job. Use backslash continuations to split the command across
# multiple lines.
#
# Use these exact values in your command:
#   Name: job-weather-ingest
#   Resource Group: rg-weather-dev
#   Environment: env-weather-dev
#   Registry Server: acrweatherdev.azurecr.io
#   Image: acrweatherdev.azurecr.io/weather-ingest:1.0
#   Container Name: weather-ingest
#   Replica Timeout: 600
#   Trigger Type: Schedule
#   Cron Expression: "0 * * * *"
#   Env Vars: POSTGRES_URL=secretref:postgres-url AZURE_STORAGE_CONNECTION_STRING=secretref:storage-conn

az containerapp job create \
  --name job-weather-ingest \
  --resource-group rg-weather-dev \
  --environment env-weather-dev \
  --trigger-type Schedule \
  --cron-expression "0 * * * *" \
  --replica-timeout 600 \
  --image acrweatherdev.azurecr.io/weather-ingest:1.0 \
  --registry-server acrweatherdev.azurecr.io \
  --container-name weather-ingest \
  --env-vars POSTGRES_URL=secretref:postgres-url AZURE_STORAGE_CONNECTION_STRING=secretref:storage-conn

# Prove that the container app job has been created
az containerapp job list --resource-group rg-weather-dev -o table

# Provide the Azure Portal link to the created job
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
echo "Azure Portal URL: https://portal.azure.com/#resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/rg-weather-dev/providers/Microsoft.App/jobs/job-weather-ingest"

