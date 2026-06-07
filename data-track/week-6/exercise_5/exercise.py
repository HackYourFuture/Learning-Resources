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


def get_actual_costs(subscription_id: str, resource_group: str) -> list[tuple[float, int, str, str]]:
    """Query the Azure Cost Management REST API for daily pretax costs.

    Returns a list of tuples: (cost, date_val, resource_group_name, currency).
    """
    # TODO 1: Initialize the DefaultAzureCredential.
    #         (Recall how you did this in Chapter 3/Exercise 2 for Blob Storage).
    cred = None

    # TODO 2: Obtain an access token for the management plane by calling:
    #         cred.get_token("https://management.azure.com/.default")
    token = None

    # The Azure Resource Manager (ARM) REST URL and payload are configured for you.
    # The Cost Management API is highly specific, so the structure is pre-filled here:
    url = f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.CostManagement/query?api-version=2021-10-01"

    payload = {
        "type": "ActualCost",
        "timeframe": "MonthToDate",
        "dataset": {
            "granularity": "Daily",
            "aggregation": {
                "totalCost": {
                    "name": "PreTaxCost",
                    "function": "Sum"
                }
            },
            "grouping": [
                {
                    "type": "Dimension",
                    "name": "ResourceGroupName"
                }
            ]
        }
    }

    # TODO 3: Construct the headers dictionary. You must pass:
    #           - "Authorization": "Bearer <your_token_string>" (from token.token)
    #           - "Content-Type": "application/json"
    headers = {}

    # TODO 4: Make a POST request to `url` using `requests.post()` passing headers and payload.
    #         Verify the response status is 200, otherwise raise an error or print res.text.
    res = None

    # TODO 5: Parse the daily rows from the response JSON and map them to the return format.
    #         The JSON response carries the data under:
    #           data = res.json()
    #           rows = data["properties"]["rows"]
    #
    #         Each row in the response is a list matching the columns:
    #           [PreTaxCost, UsageDate, ResourceGroupName, Currency]
    #         Iterate over them, cast costs to float and dates to int, and return the tuples.
    #
    # Note: Raise NotImplementedError when starting.
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
    except NotImplementedError:
        print("\nTODO: Implement get_actual_costs() in exercise.py")
    except Exception as e:
        print(f"Error querying cost API: {e}")
        sys.exit(1)
