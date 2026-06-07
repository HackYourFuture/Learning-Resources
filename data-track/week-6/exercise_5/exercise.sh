#!/usr/bin/env bash
# Exercise 5: Cost Analysis in the Azure Portal
#
# Verifies az login, prints the direct portal link to Cost Analysis for rg-hyf-data,
# then prompts you to complete cost_findings.md from what you see in the portal.

set -euo pipefail

RESOURCE_GROUP="rg-hyf-data"

echo "=== Checking Azure CLI session ==="
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
echo "Subscription: ${SUBSCRIPTION_NAME}"
echo "Subscription ID: ${SUBSCRIPTION_ID}"
echo ""

echo "=== Open Cost Analysis in the Azure Portal ==="
echo "1. Click this link (or paste into your browser):"
echo ""
echo "   https://portal.azure.com/#@/resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/overview"
echo ""
echo "2. In the left menu, under 'Cost Management', click 'Cost Analysis'."
echo "3. Set the timeframe to 'Month to date' and group by 'Service name' or 'Resource'."
echo "4. Fill in cost_findings.md with what you observe."
echo ""
echo "=== Your task ==="
echo "Complete every TODO in cost_findings.md before comparing with solutions/cost_findings.md."
