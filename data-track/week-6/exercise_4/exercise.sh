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
#
# Once written, you can run the dry-run check with: python3 check.

# TODO: Fill in the az containerapp job create command below
az containerapp job create \
  --name job-weather-ingest \
  --resource-group rg-weather-dev \
  --environment env-weather-dev \
  ...
