# Cost findings for rg-hyf-data

Example answers — portal totals change daily. Focus on the *pattern*, not exact euros.

## Month-to-date total (EUR)

~€15–20 month-to-date (early June; partial month on a shared class subscription).

## Top 3 cost drivers

1. **Azure Database for PostgreSQL** (~85–90% of rg-hyf-data spend) — runs 24/7
2. **Container Registry** (~5–10%) — fixed monthly fee for `hyfregistry`
3. **Storage** (<5%) — blob data at rest in `hyfstoragedev`

Container App Jobs typically do not appear in the top three at class scale because they bill only during execution and sit inside the free tier.

## Bills when idle?

| Resource | Bills when idle? |
|---|---|
| PostgreSQL (`hyf-data-pg`) | yes |
| Blob Storage (`hyfstoragedev`) | yes (per GB stored) |
| Container App Job | no (only during execution) |
| Container Registry (`hyfregistry`) | yes |
| Container Apps environment (`env-hyf-data`) | no (consumption plan) |

## One sentence: what would save the most money?

Stopping the Postgres server when class is not in session saves the most — it is the only major resource that bills compute 24/7.

## Optional: compare with the pricing calculator

Roughly yes for Postgres alone (~€13/month for `Standard_B1ms`). The portal total can be higher because it includes ACR, storage, and partial-month rounding across all resources in the group.
