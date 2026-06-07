"""Exercise 5: Query Live Azure Costs.

This exercise connects to the Azure Cost Management API using the official Azure SDK
to query the actual, real-time costs incurred by the shared resource group `rg-hyf-data`.
"""

import os
import sys
from azure.identity import DefaultAzureCredential
from azure.mgmt.costmanagement import CostManagementClient

# Get subscription ID from env
SUBSCRIPTION_ID = os.environ.get("AZURE_SUBSCRIPTION_ID")
RESOURCE_GROUP = os.environ.get("AZURE_RESOURCE_GROUP", "rg-hyf-data")

if not SUBSCRIPTION_ID:
    print("Error: AZURE_SUBSCRIPTION_ID is not set.")
    print("Please export your active subscription ID first using:")
    print("  export AZURE_SUBSCRIPTION_ID=$(az account show --query id -o tsv)")
    sys.exit(1)


def get_actual_costs(subscription_id: str, resource_group: str) -> list[list]:
    """Query the Azure Cost Management SDK for daily pretax costs.

    Returns the rows of results from the query execution.
    """
    # TODO 1: Initialize the DefaultAzureCredential.
    cred = None

    # TODO 2: Initialize the CostManagementClient passing the credential.
    client = None

    # The scope and payload query dictionary are pre-configured for you.
    scope = f"/subscriptions/{subscription_id}/resourceGroups/{resource_group}"

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

    # TODO 3: Execute the query by calling `client.query.usage()` passing `scope` and `payload`
    #         as the `parameters` keyword argument.
    #         e.g., res = client.query.usage(scope=..., parameters=...)
    res = None

    # TODO 4: Return the rows from the result (`res.rows`).
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
        # Rows contain: [PreTaxCost, UsageDate, ResourceGroupName, Currency]
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
