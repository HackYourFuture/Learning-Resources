"""Exercise 3: Debug a broken connection string.

Your teacher hands you this connection string for the shared Azure Postgres server:

    postgresql://admin:password@hyf-data-pg/weather_db

It has three problems. Find them, fix them, and explain each one in plain English.

Connection-string errors are the number one cause of "it works locally but not on
Azure" failures. Practising the diagnosis now saves time during the assignment.

This exercise is pure Python: no network call required. You parse the string with
`urllib.parse.urlparse`, decide what is wrong, and produce a fixed version that
WOULD connect if you ran it against a real server.
"""

from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

BROKEN_URL = "postgresql://admin:password@hyf-data-pg/weather_db"


def diagnose(url: str) -> list[str]:
    """Return a list of human-readable problems with the given Postgres URL.

    Should detect three issues for BROKEN_URL:
      1. Host has no FQDN suffix (Azure flexible server needs '.postgres.database.azure.com').
      2. No port (Azure flexible server requires 5432 explicitly when used from some clients).
      3. SSL is not requested (Azure Postgres requires sslmode=require).
    """
    # TODO 1: Parse `url` with urllib.parse.urlparse. Use the resulting object's
    #         .hostname, .port, and .query attributes to inspect the string.
    # TODO 2: Build a list[str] of problems. For each rule that fails, append one
    #         short sentence that names the field and the fix. Examples:
    #           "host 'hyf-data-pg' is missing the Azure FQDN suffix
    #            '.postgres.database.azure.com'"
    #           "no port set; add ':5432'"
    #           "sslmode is not 'require'; Azure Postgres rejects unencrypted connections"
    raise NotImplementedError


def fix(url: str) -> str:
    """Return a connection string with the three problems fixed."""
    # TODO 3: Rebuild the URL with urlunparse so the result has:
    #           - host  -> hyf-data-pg.postgres.database.azure.com
    #           - port  -> 5432
    #           - query -> sslmode=require (merged with any existing query params)
    #         Keep user, password, and the database path unchanged.
    raise NotImplementedError


if __name__ == "__main__":
    print(f"Broken URL: {BROKEN_URL}\n")
    print("Problems:")
    for problem in diagnose(BROKEN_URL):
        print(f"  - {problem}")
    print(f"\nFixed URL: {fix(BROKEN_URL)}")

# Expected output:
#
# Broken URL: postgresql://admin:password@hyf-data-pg/weather_db
#
# Problems:
#   - host 'hyf-data-pg' is missing the Azure FQDN suffix '.postgres.database.azure.com'
#   - no port set; Azure Postgres listens on 5432
#   - sslmode is not 'require'; Azure Postgres rejects unencrypted connections
#
# Fixed URL: postgresql://admin:password@hyf-data-pg.postgres.database.azure.com:5432/weather_db?sslmode=require
