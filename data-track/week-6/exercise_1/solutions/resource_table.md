# Resource classification for rg-hyf-data

Example answers — your CLI output may list additional resources (budgets, diagnostic settings, etc.). Focus on the core pipeline infrastructure.

| Resource Name | Type (short) | Chapter | Bills When Idle? |
|---|---|---|---|
| hyfstoragedev | Storage account | Ch 3 (Blob Storage) | yes (per GB stored) |
| hyf-data-pg | PostgreSQL Flexible Server | Ch 4 (Azure PostgreSQL) | yes (compute runs 24/7) |
| env-hyf-data | Container Apps environment | Ch 5 (Container Apps Jobs) | no (consumption plan) |
| hyfregistry | Container Registry | Ch 5 (ACR, Week 5) | yes (fixed monthly fee) |
| kv-hyf-data | Key Vault | Ch 5 (secrets retrieval) | yes (per-operation + storage) |

**Takeaway:** Postgres is the main always-on cost driver in this setup. Container App Jobs only bill during execution.
