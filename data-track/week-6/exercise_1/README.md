# Exercise 1: Trace a Resource Group

Write a bash script that lists all Azure resources in the shared resource group `rg-hyf-data` formatted as a table.

## Setup

No extra python dependencies needed. This exercise runs `az cli` commands, so you should run `az login` first:

```bash
az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
```

## Task

1. Open `exercise.sh` and fill in the `az` command to list all resources inside the resource group `rg-hyf-data` in a table format.
2. Run the script:
   ```bash
   bash exercise.sh
   ```
3. Verify that it prints a list of resources (storage accounts, postgres flexible server, etc.) currently provisioned in the resource group.

## Success criteria

- Running `bash exercise.sh` successfully calls the Azure CLI and outputs a table listing the resource names, types, and locations.

## Stretch

- Try query flags: use the `--query` flag to filter the output to show only the resource name and type. E.g., query for `"[].{Name:name, Type:type}"`.
