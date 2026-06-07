# Exercise 5: Cost Analysis in the Azure Portal

View real costs for the shared resource group `rg-hyf-data` in the Azure Portal and document what you find. This matches the hands-on section in Chapter 6 (Cost Awareness) — no Python SDK required.

## Setup

```bash
az login --use-device-code --tenant 07a14c4e-d88c-42f7-83b3-13af7e57ff3d
```

Your group has **Cost Management Reader** on `rg-hyf-data`, so you can open Cost Analysis but cannot edit budgets.

## Task

1. Run `bash exercise.sh` — it verifies your CLI session and prints the portal link.
2. In the portal, open **Cost Management → Cost Analysis** for `rg-hyf-data`.
3. Set timeframe to **Month to date**. Try grouping by **Service name** or **Resource**.
4. Fill in every section of `cost_findings.md` from what you see.
5. Compare with `solutions/cost_findings.md` after attempting.

## Success criteria

- `cost_findings.md` has a month-to-date total, three cost drivers, and the idle-billing table filled in.
- Your idle-billing answers match the Chapter 6 table (Postgres and ACR = yes; jobs and environment = no).
- You can explain in one sentence which resource drives most of the spend.

## Pre-flight widget

The widget trains the *arithmetic* behind stop-vs-run savings — useful context before reading live portal numbers.

> 🚀 [Monthly cost in EUR exercise](https://lasse.be/simple-hyf-teach-widget/?exercise=w6_cost_awareness__monthly_cost_eur&lang=python)

## Documentation

- [Azure cost management documentation](https://learn.microsoft.com/azure/cost-management-billing/)
- [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/)
