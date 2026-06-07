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
# TODO: Fill in the command to list all resources in table format.
az ...

echo ""
echo "Next step: open resource_table.md and classify each resource you see above."
echo "Columns: Resource Name | Type | Chapter | Bills When Idle (yes/no)"
