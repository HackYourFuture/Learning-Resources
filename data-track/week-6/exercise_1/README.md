# Exercise 1: Trace a Resource Group

Parse the output of `az resource list` and label every resource in the shared resource group: what it is and which chapter introduced it.

## Setup

No extra dependencies. `exercise.py` uses only the standard library and reads `az_resource_list_output.json` next to it.

The JSON file is a representative mock of the shared `rg-weather-dev` resource group. If you have Azure access, replace it with your own:

```bash
az resource list --resource-group <your-group> --output json > az_resource_list_output.json
```

## Task

1. Open `exercise.py` and fill in `TYPE_CATALOG` (TODO 1) so each `Microsoft.*` type maps to a short label and a Week 6 chapter number.
2. Implement `classify_resources()` (TODO 2) so it returns one dict per resource with `name`, `type_label`, `chapter`. Skip unknown types as `("unknown", None)` instead of crashing.
3. Run `python3 exercise.py` and confirm the table matches the `# Expected output:` block at the bottom of the file.

## Success criteria

- The script prints a 7-row table without errors.
- Every resource is correctly mapped to its short type name and chapter label.

## Stretch

- Add an eighth resource type to the JSON (e.g. `Microsoft.Network/publicIPAddresses`) and confirm your code labels it as `unknown` without crashing.
- Run `az resource list --resource-group <your-group> --output json` against your own shared group, save the file, and rerun the script to label your real environment.

