"""Exercise 4: Dry-run a container job.

Write the exact `az containerapp job create` command you would run for the
weather-ingest job, then run a self-check against the Week 6 gotchas list:

  - Did you include --registry-server?
  - Is the --container name set?
  - Did you specify --replica-timeout?
  - Did you pass --env-vars (with secret references, not plain values)?

The self-check imports your build_create_command() result and looks for the
flags it expects. If anything is missing, it prints which flag is missing and
exits non-zero so you can see the gap before spending Azure credits.

This is the "dry run" muscle: writing the command before running it, and
reviewing it against a checklist. The most common Container Apps Job failures
in week 6 trace back to a missing flag, not a runtime bug.
"""

# Job-specific values for the shared weather-ingest job. Use these literals
# (do not invent new ones) so the self-check passes deterministically.
JOB_NAME = "job-weather-ingest"
RESOURCE_GROUP = "rg-weather-dev"
ENVIRONMENT = "env-weather-dev"
REGISTRY_SERVER = "acrweatherdev.azurecr.io"
IMAGE = "acrweatherdev.azurecr.io/weather-ingest:1.0"
CONTAINER_NAME = "weather-ingest"
REPLICA_TIMEOUT_SECONDS = 600
CRON_EXPRESSION = "0 * * * *"  # hourly
# In real life these point at Key Vault secret references; for a dry-run we keep
# them as @Microsoft.KeyVault(...) placeholders so the shape is right.
ENV_VARS = [
    "POSTGRES_URL=secretref:postgres-url",
    "AZURE_STORAGE_CONNECTION_STRING=secretref:storage-conn",
]

REQUIRED_FLAGS = [
    "--name",
    "--resource-group",
    "--environment",
    "--trigger-type",
    "--cron-expression",
    "--replica-timeout",
    "--image",
    "--registry-server",
    "--container-name",
    "--env-vars",
]


def build_create_command() -> str:
    """Return the full `az containerapp job create` command as a single string.

    Use the constants above. Format the command across multiple lines using
    backslash continuations so it stays readable when printed.
    """
    # TODO 1: Return a single string that starts with `az containerapp job create`
    #         and includes every flag in REQUIRED_FLAGS, in any order. Use the
    #         constants above (JOB_NAME, RESOURCE_GROUP, etc.) so the self-check
    #         can verify the literal values.
    #
    # Hint: a single triple-quoted string with `\` line continuations reads well:
    #     return """az containerapp job create \\
    #     --name {JOB_NAME} \\
    #     --resource-group {RESOURCE_GROUP} ...""".format(...)
    raise NotImplementedError


def check_command(command: str) -> list[str]:
    """Return a list of missing flag names. Empty list means the command is complete."""
    return [flag for flag in REQUIRED_FLAGS if flag not in command]


if __name__ == "__main__":
    cmd = build_create_command()
    print("Your command:\n")
    print(cmd)
    print()
    missing = check_command(cmd)
    if missing:
        print(f"Self-check FAILED. Missing flags: {missing}")
        raise SystemExit(1)
    print("Self-check OK. All required flags are present.")

# Expected output (after you fill in TODO 1):
#
# Your command:
#
# az containerapp job create \
#   --name job-weather-ingest \
#   --resource-group rg-weather-dev \
#   --environment env-weather-dev \
#   --trigger-type Schedule \
#   --cron-expression "0 * * * *" \
#   --replica-timeout 600 \
#   --image acrweatherdev.azurecr.io/weather-ingest:1.0 \
#   --registry-server acrweatherdev.azurecr.io \
#   --container-name weather-ingest \
#   --env-vars POSTGRES_URL=secretref:postgres-url AZURE_STORAGE_CONNECTION_STRING=secretref:storage-conn
#
# Self-check OK. All required flags are present.
