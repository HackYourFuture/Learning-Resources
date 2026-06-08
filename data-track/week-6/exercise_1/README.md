# Exercise 1: Trace a Resource Group

List the shared Azure resources and classify them by type, chapter, and idle billing behaviour.

> 🖼️ [Visual: resources in rg-hyf-data](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/bcd40b4adef81347309c9b931a04098f/raw/rg_hyf_data_resources_visual.html)

## Setup

This exercise runs `az` commands. Log in first:

```bash
az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
```

## Task

1. Open `exercise.sh` and fill in the `az` command to list all resources in `rg-hyf-data` as a table.
2. Run `bash exercise.sh` and read the output.
3. Open `resource_table.md` and fill one row per core resource: **Resource Name**, **Type**, **Chapter**, **Bills When Idle**.
4. Compare your table with `solutions/resource_table.md` after attempting.

## Success criteria

- `bash exercise.sh` prints a table of resources in `rg-hyf-data`.
- `resource_table.md` has at least five classified rows with a chapter reference for each.

## Stretch

- Add the `--query` filter from the solution to show only name and type.
- Pick one resource and run `az resource show` to inspect its full metadata.
