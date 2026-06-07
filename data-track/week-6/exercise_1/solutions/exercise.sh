#!/usr/bin/env bash
# Exercise 1: Trace a Resource Group
#
# Write the Azure CLI command to list all resources in your shared resource group,
# formatted as a table.
#
# Run this script with: bash exercise.sh

az resource list --resource-group rg-hyf-data --output table
