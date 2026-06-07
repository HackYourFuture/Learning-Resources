"""Exercise 5: Query Live Azure Costs.

This exercise connects to the Azure Cost Management API to query the actual,
real-time costs incurred by the shared resource group `rg-hyf-data`.

It uses the standard `azure-identity` package to obtain an Azure access token
under your login credentials, and calls the ARM REST API.
"""

import os
import sys
import requests
from azure.identity import DefaultAzureCredential

# Get subscription ID from env
SUBSCRIPTION_ID = os.environ.get("AZURE_SUBSCRIPTION_ID")
RESOURCE_GROUP = os.environ.get("AZURE_RESOURCE_GROUP", "rg-hyf-data")

if not SUBSCRIPTION_ID:
    print("Error: AZURE_SUBSCRIPTION_ID is not set.")
    print("Please export your active subscription ID first using:")
    print("  export AZURE_SUBSCRIPTION_ID=$(az account show --query id -o tsv)")
    sys.exit(1)


def get_actual_costs(subscription_id: str, resource_group: str) -> list[tuple[float, str, str]]:
    """Query the Azure Cost Management REST API for daily pretax costs.

    Returns a list of tuples: (cost, date_str, resource_group_name).
    """
    # TODO 1: Initialize the DefaultAzureCredential.
    # TODO 2: Obtain an access token for the management plane: "https://management.azure.com/.default"
    # TODO 3: Construct the POST request to the Cost Management query endpoint:
    #         https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.CostManagement/query?api-version=2021-10-01
    # TODO 4: Send the query payload:
    #         {
    #             "type": "ActualCost",
    #             "timeframe": "MonthToDate",
    #             "dataset": {
    #                 "granularity": "Daily",
    #                 "aggregation": {
    #                     "totalCost": {
    #                         "name": "PreTaxCost",
    #                         "function": "Sum"
    #                     }
    #                 },
    #                 "grouping": [
    #                     {
    #                         "type": "Dimension",
    #                         "name": "ResourceGroupName"
    #                     }
    #                 ]
    #             }
    #         }
    # TODO 5: Parse the status and response JSON. If 200, return the rows from the response properties.
    raise NotImplementedError


if __name__ == "__main__":
    print(f"Querying actual costs for resource group '{RESOURCE_GROUP}'...")
    try:
        rows = get_actual_costs(SUBSCRIPTION_ID, RESOURCE_GROUP)
        print("\nDaily Cost Report:")
        print(f"{'Date':<10} {'Resource Group':<20} {'Cost (Pre-Tax)':<15}")
        print("-" * 50)
        total = 0.0
        currency = "EUR"
        for cost, date_val, rg, curr in rows:
            total += cost
            currency = curr
            # Format YYYYMMDD to YYYY-MM-DD
            date_str = f"{str(date_val)[:4]}-{str(date_val)[4:6]}-{str(date_val)[6:]}"
            print(f"{date_str:<10} {rg:<20} {cost:.4f} {curr}")
        print("-" * 50)
        print(f"Total Month-to-Date: {total:.4f} {currency}")
    except Exception as e:
        print(f"Error querying cost API: {e}")
        sys.exit(1)
