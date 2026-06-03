"""Exercise 1: Trace a resource group.

You will parse the JSON output of `az resource list` and label every resource
in the shared resource group: what it is, which chapter introduced it, and
whether it bills you while it sits idle.

This is the muscle you need before you create your own resources in the
assignment. Knowing what already exists prevents duplicates and wasted credits.
"""

import json
from pathlib import Path

# A sample `az resource list --resource-group rg-weather-dev --output json` payload
# ships next to this file. If you have Azure access, you can replace it with your own:
#   az resource list --resource-group <your-group> --output json > my_resources.json
SAMPLE_PATH = Path(__file__).parent.parent / "az_resource_list_output.json"


def load_resources(path: Path) -> list[dict]:
    """Load the JSON array of resources from disk."""
    return json.loads(path.read_text())


# TODO 1: Map each Azure resource type string (the value of the "type" field) to a
#         short human label and the Week 6 chapter that introduced it. Cover at least
#         the seven types that appear in az_resource_list_output.json:
#           - Microsoft.Storage/storageAccounts          -> ("Storage account", 3)
#           - Microsoft.DBforPostgreSQL/flexibleServers  -> ("Postgres server", 4)
#           - Microsoft.App/managedEnvironments          -> ("Container Apps env", 5)
#           - Microsoft.App/jobs                         -> ("Container App Job", 5)
#           - Microsoft.ContainerRegistry/registries     -> ("Container Registry", 5)
#           - Microsoft.KeyVault/vaults                  -> ("Key Vault", 6)
#           - Microsoft.OperationalInsights/workspaces   -> ("Log Analytics", 6)
TYPE_CATALOG: dict[str, tuple[str, int]] = {
    "Microsoft.Storage/storageAccounts": ("Storage account", 3),
    "Microsoft.DBforPostgreSQL/flexibleServers": ("Postgres server", 4),
    "Microsoft.App/managedEnvironments": ("Container Apps env", 5),
    "Microsoft.App/jobs": ("Container App Job", 5),
    "Microsoft.ContainerRegistry/registries": ("Container Registry", 5),
    "Microsoft.KeyVault/vaults": ("Key Vault", 6),
    "Microsoft.OperationalInsights/workspaces": ("Log Analytics", 6),
}
# WHY a dict keyed by the literal "type" string: the Azure CLI returns this exact
# value, so a plain lookup with .get(resource["type"]) handles every resource in
# one line and degrades gracefully for unknown types via the default.


# TODO 2: Decide which resource types bill you while idle (no requests, no jobs running).
#         The honest answer is *most* managed Azure resources do, because the underlying
#         compute, storage, or networking stays reserved for you. The clearest exceptions
#         in this exercise:
#           - Container App Job (Microsoft.App/jobs) bills per execution, not per hour.
#           - Log Analytics workspace bills per GB ingested, not per hour.
#         Return True for "bills while idle", False otherwise.
_USAGE_BILLED_TYPES = {
    "Microsoft.App/jobs",
    "Microsoft.OperationalInsights/workspaces",
}


def bills_when_idle(resource_type: str) -> bool:
    return resource_type not in _USAGE_BILLED_TYPES
# WHY default to True: framing the rule as "bills idle UNLESS the type is on the
# usage-billed allowlist" is safer than the reverse. Forgetting to list a new
# resource type then errs on the side of "assume it costs money", which matches
# how a student should think about an unfamiliar Azure resource in a shared RG.


# TODO 3: For each resource in the list, produce a dict with these keys:
#           name, type_label, chapter, bills_idle
#         Skip resources whose type is not in TYPE_CATALOG (return them as "unknown" with
#         chapter=None instead of crashing). The chapter-readiness check matters because
#         a real shared RG will accumulate extra resources over time.
def classify_resources(resources: list[dict]) -> list[dict]:
    classified = []
    for r in resources:
        rtype = r["type"]
        label, chapter = TYPE_CATALOG.get(rtype, ("unknown", None))
        classified.append(
            {
                "name": r["name"],
                "type_label": label,
                "chapter": chapter,
                "bills_idle": bills_when_idle(rtype),
            }
        )
    return classified
# WHY tolerate unknown types: a real `az resource list` against a long-lived RG
# tends to include extras (public IPs, NSGs, managed identities) you did not
# create yourself. Crashing on the first unfamiliar entry would make the script
# useless against real data; labelling it "unknown" leaves the rest readable.


def format_table(rows: list[dict]) -> str:
    """Pretty-print the classification as a fixed-width table."""
    header = f"{'Name':<24} {'Type':<22} {'Chapter':<8} {'Bills idle?':<11}"
    sep = "-" * len(header)
    body = "\n".join(
        f"{r['name']:<24} {r['type_label']:<22} {str(r['chapter'] or '-'):<8} {('yes' if r['bills_idle'] else 'no'):<11}"
        for r in rows
    )
    return f"{header}\n{sep}\n{body}"


if __name__ == "__main__":
    resources = load_resources(SAMPLE_PATH)
    rows = classify_resources(resources)
    print(format_table(rows))
    idle_billers = sum(1 for r in rows if r["bills_idle"])
    print(f"\n{idle_billers} of {len(rows)} resources bill while idle.")

# Expected output (after you fill in the TODOs):
#
# Name                     Type                   Chapter  Bills idle?
# --------------------------------------------------------------------
# stweatherdev01           Storage account        3        yes
# pg-weather-dev           Postgres server        4        yes
# env-weather-dev          Container Apps env     5        yes
# job-weather-ingest       Container App Job      5        no
# acrweatherdev            Container Registry     5        yes
# kv-weather-dev           Key Vault              6        yes
# log-weather-dev          Log Analytics          6        no
#
# 5 of 7 resources bill while idle.
