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

AZURE_PG_SUFFIX = ".postgres.database.azure.com"
AZURE_PG_PORT = 5432


def diagnose(url: str) -> list[str]:
    """Return a list of human-readable problems with the given Postgres URL.

    Should detect three issues for BROKEN_URL:
      1. Host has no FQDN suffix (Azure flexible server needs '.postgres.database.azure.com').
      2. No port (Azure flexible server requires 5432 explicitly when used from some clients).
      3. SSL is not requested (Azure Postgres requires sslmode=require).
    """
    # TODO 1: Parse `url` with urllib.parse.urlparse. Use the resulting object's
    #         .hostname, .port, and .query attributes to inspect the string.
    parsed = urlparse(url)
    # WHY urlparse over manual splits: connection strings are URL-shaped, so the
    # stdlib gives you .hostname (lowercased, no port), .port (typed as int or None),
    # and .query (raw string) for free. Manual string splitting on '@' and ':'
    # works until someone embeds a colon in the password.

    # TODO 2: Build a list[str] of problems. For each rule that fails, append one
    #         short sentence that names the field and the fix. Examples:
    #           "host 'hyf-data-pg' is missing the Azure FQDN suffix
    #            '.postgres.database.azure.com'"
    #           "no port set; add ':5432'"
    #           "sslmode is not 'require'; Azure Postgres rejects unencrypted connections"
    problems: list[str] = []
    host = parsed.hostname or ""
    if not host.endswith(AZURE_PG_SUFFIX):
        problems.append(
            f"host '{host}' is missing the Azure FQDN suffix '{AZURE_PG_SUFFIX}'"
        )
    if parsed.port is None:
        problems.append(f"no port set; Azure Postgres listens on {AZURE_PG_PORT}")
    query = parse_qs(parsed.query)
    if query.get("sslmode", [""])[0] != "require":
        problems.append(
            "sslmode is not 'require'; Azure Postgres rejects unencrypted connections"
        )
    return problems
# WHY return a list of strings, not raise: the goal is *diagnosis*, not *failure*.
# Returning all problems at once lets the student see every issue in one run
# rather than fixing them one error-message-at-a-time.


def fix(url: str) -> str:
    """Return a connection string with the three problems fixed."""
    # TODO 3: Rebuild the URL with urlunparse so the result has:
    #           - host  -> hyf-data-pg.postgres.database.azure.com
    #           - port  -> 5432
    #           - query -> sslmode=require (merged with any existing query params)
    #         Keep user, password, and the database path unchanged.
    parsed = urlparse(url)

    host = parsed.hostname or ""
    if not host.endswith(AZURE_PG_SUFFIX):
        host = host + AZURE_PG_SUFFIX

    userinfo = ""
    if parsed.username is not None:
        userinfo = parsed.username
        if parsed.password is not None:
            userinfo += f":{parsed.password}"
        userinfo += "@"

    netloc = f"{userinfo}{host}:{AZURE_PG_PORT}"

    query = parse_qs(parsed.query)
    query["sslmode"] = ["require"]
    query_str = urlencode({k: v[0] for k, v in query.items()})

    return urlunparse(
        (parsed.scheme, netloc, parsed.path, parsed.params, query_str, parsed.fragment)
    )
# WHY rebuild via urlunparse rather than f-string concatenation: f-strings work
# for THIS broken URL but silently break when the password contains '@', ':',
# or '?'. Rebuilding through the same module that parsed the URL keeps the
# escaping consistent. (A real-world password from Key Vault frequently has
# punctuation that needs URL-encoding.)


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
