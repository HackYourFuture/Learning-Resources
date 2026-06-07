"""Check validator for Exercise 4.

Reads the contents of exercise.sh and asserts that the az containerapp job create
command is formed correctly with all required flags and values.
"""

import sys
from pathlib import Path

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

EXPECTED_VALUES = {
    "--name": "job-weather-ingest",
    "--resource-group": "rg-weather-dev",
    "--environment": "env-weather-dev",
    "--trigger-type": "Schedule",
    "--cron-expression": '"0 * * * *"',
    "--replica-timeout": "600",
    "--image": "acrweatherdev.azurecr.io/weather-ingest:1.0",
    "--registry-server": "acrweatherdev.azurecr.io",
    "--container-name": "weather-ingest",
}


def check_script(script_path: Path) -> None:
    if not script_path.exists():
        print(f"Error: {script_path.name} not found.")
        sys.exit(1)

    content = script_path.read_text()

    # Find the line starting with az containerapp job create (ignoring comments)
    lines = [line.strip() for line in content.splitlines() if line.strip() and not line.strip().startswith("#")]
    command = " ".join(lines)

    if "az containerapp job create" not in command:
        print("Self-check FAILED: The command must start with 'az containerapp job create'")
        sys.exit(1)

    missing_flags = []
    incorrect_values = []

    for flag in REQUIRED_FLAGS:
        if flag not in command:
            missing_flags.append(flag)
            continue

        # Simple verification that the expected value is in the command
        expected_val = EXPECTED_VALUES.get(flag)
        if expected_val and expected_val not in command:
            incorrect_values.append(f"{flag} (expected '{expected_val}')")

    # Special check for env vars structure
    if "--env-vars" in command:
        if "POSTGRES_URL=secretref:postgres-url" not in command or "AZURE_STORAGE_CONNECTION_STRING=secretref:storage-conn" not in command:
            incorrect_values.append("--env-vars (missing POSTGRES_URL or AZURE_STORAGE_CONNECTION_STRING secret refs)")

    if missing_flags or incorrect_values:
        print("Self-check FAILED.")
        if missing_flags:
            print(f"  Missing flags: {missing_flags}")
        if incorrect_values:
            print(f"  Incorrect/missing values: {incorrect_values}")
        sys.exit(1)

    print(f"Self-check OK. All required flags and values in {script_path.name} are present.")


if __name__ == "__main__":
    # If an argument is provided, check that file, otherwise default to exercise.sh in the same directory
    target = Path(__file__).parent / "exercise.sh"
    if len(sys.argv) > 1:
        target = Path(sys.argv[1])
    check_script(target)
