# Exercise 5: Query Live Azure Costs

Connect to the Azure Cost Management API to query the actual, real-time costs incurred by the shared resource group `rg-hyf-data`.

## Setup

This exercise requires installing dependencies, logging in to Azure CLI, and setting your active subscription ID as an environment variable.

1. Install dependencies:
   ```bash
   uv sync
   ```
2. Login using your HackYourFuture Azure account:
   ```bash
   az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
   ```
3. Set your `AZURE_SUBSCRIPTION_ID` environment variable:
   ```bash
   export AZURE_SUBSCRIPTION_ID=$(az account show --query id -o tsv)
   ```

## Task

1. Open `exercise.py`.
2. Implement `get_actual_costs(subscription_id, resource_group)`. You should:
   * Initialize a `DefaultAzureCredential` instance.
   * Initialize the `CostManagementClient` passing the credential.
   * Execute the query by calling `client.query.usage()` passing the scope and the pre-configured `payload` dictionary as the `parameters` keyword argument.
   * Return the rows from the query result (`res.rows`).

   > 💡 **Tip:** While we use the Python SDK for simplicity (to handle token authentication and requests), the parameters payload structure is identical to the Azure REST API payload. You can refer to the REST API documentation for details.

3. Run the script:
   ```bash
   python3 exercise.py
   ```

## Success criteria

- Running `python3 exercise.py` queries the live Cost Management API successfully and prints the daily pre-tax costs for `rg-hyf-data` along with a summed Month-to-Date total.

## Documentation

- [Azure Cost Management Query REST API Reference](https://learn.microsoft.com/rest/api/costmanagement/query/usage): Official documentation detailing query scopes, payloads, and parameter definitions.
- [Azure SDK for Python - Cost Management](https://learn.microsoft.com/python/api/overview/azure/mgmt-costmanagement-readme): Package documentation for Azure Cost Management Client.

