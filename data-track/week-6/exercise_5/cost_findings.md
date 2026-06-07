# Cost findings for rg-hyf-data

Complete this report using the **Cost Analysis** blade in the Azure Portal (see `exercise.sh` for the direct link). Your teacher granted your group **Cost Management Reader** on this resource group — you can view costs but not change budgets.

## Month-to-date total (EUR)

TODO: paste the total from the portal Cost Analysis view

## Top 3 cost drivers

List the three services or resources that cost the most this month. Approximate percentages are fine.

1. TODO (service/resource name + ~% of total)
2. TODO
3. TODO

## Bills when idle?

Fill yes or no for each shared resource (see Chapter 6 cost-awareness table for hints):

| Resource | Bills when idle? |
|---|---|
| PostgreSQL (`hyf-data-pg`) | TODO |
| Blob Storage (`hyfstoragedev`) | TODO |
| Container App Job | TODO |
| Container Registry (`hyfregistry`) | TODO |
| Container Apps environment (`env-hyf-data`) | TODO |

## One sentence: what would save the most money?

TODO: e.g. stopping Postgres when class is not in session

## Optional: compare with the pricing calculator

Open the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/) and estimate a `Standard_B1ms` Postgres Flexible Server in West Europe. Is the portal month-to-date total in the same ballpark as the ~€13/month estimate from Chapter 6?

TODO: yes/no + one sentence why they differ (partial month, shared resources, etc.)
