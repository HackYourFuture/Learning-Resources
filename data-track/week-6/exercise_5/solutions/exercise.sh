#!/usr/bin/env bash
# Exercise 5: Cost Analysis in the Azure Portal

set -euo pipefail

RESOURCE_GROUP="rg-hyf-data"

SUBSCRIPTION_ID=$(az account show --query id -o tsv)
SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
echo "Subscription: ${SUBSCRIPTION_NAME} (${SUBSCRIPTION_ID})"
echo ""
echo "Portal link for ${RESOURCE_GROUP}:"
echo "https://portal.azure.com/#@/resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/overview"
echo ""
echo "Navigate: Cost Management → Cost Analysis → Month to date."
echo "Then compare your cost_findings.md with solutions/cost_findings.md."
