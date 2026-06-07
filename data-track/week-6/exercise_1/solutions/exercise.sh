#!/usr/bin/env bash
# Exercise 1: Trace a Resource Group
#
# 1. List all resources in the shared resource group as a table.
# 2. Fill in resource_table.md with type, chapter, and idle-billing columns.
#
# Run: bash exercise.sh

set -euo pipefail

RESOURCE_GROUP="rg-hyf-data"

echo "=== Resources in ${RESOURCE_GROUP} ==="
az resource list --resource-group "${RESOURCE_GROUP}" --output table
# WHY table output: readable in the terminal without JSON parsing. For scripting,
# add --query "[].{name:name, type:type}" -o table to narrow columns.

echo ""
echo "=== Name and type only (optional filter) ==="
az resource list \
  --resource-group "${RESOURCE_GROUP}" \
  --query "[].{Name:name, Type:type}" \
  --output table

echo ""
echo "Next step: open resource_table.md and classify each resource you see above."
echo "See solutions/resource_table.md for an example filled table."
