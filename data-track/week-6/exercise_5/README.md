# Exercise 5: Query Live Azure Costs

Connect to the Azure Cost Management API to query the actual, real-time costs incurred by the shared resource group `rg-hyf-data`.

## Setup

This exercise requires logging in to Azure CLI and setting your active subscription ID as an environment variable.

1. Login using your HackYourFuture Azure account:
   ```bash
   az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
   ```
2. Set your `AZURE_SUBSCRIPTION_ID` environment variable:
   ```bash
   export AZURE_SUBSCRIPTION_ID=$(az account show --query id -o tsv)
   ```

## Task

1. Open `exercise.py`.
2. Implement `get_actual_costs(subscription_id, resource_group)`. You should:
   * Initialize a `DefaultAzureCredential` instance.
   * Fetch an access token for the Azure management plane (`https://management.azure.com/.default`).
   * Perform a POST request using the `requests` library to the Cost Management query endpoint:
     `https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.CostManagement/query?api-version=2021-10-01`
   * Pass the JSON payload requesting daily pretax actual costs grouped by resource group.
   * Parse the response rows and return the daily cost records.
3. Run the script:
   ```bash
   python3 exercise.py
   ```

## Success criteria

- Running `python3 exercise.py` queries the live Cost Management API successfully and prints the daily pre-tax costs for `rg-hyf-data` along with a summed Month-to-Date total.
