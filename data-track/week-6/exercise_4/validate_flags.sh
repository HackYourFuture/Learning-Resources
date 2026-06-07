#!/usr/bin/env bash
# Validate that exercise.sh includes the flags from the Week 6 gotchas list
# before you spend Azure credits on `az containerapp job create`.
#
# Usage: bash validate_flags.sh [path-to-exercise.sh]

set -euo pipefail

TARGET="${1:-exercise.sh}"

if [[ ! -f "${TARGET}" ]]; then
  echo "Error: ${TARGET} not found."
  exit 1
fi

REQUIRED=(
  "--registry-server"
  "--replica-timeout"
  "--resource-group rg-hyf-data"
  "--environment env-hyf-data"
  "hyfregistry.azurecr.io"
  "--trigger-type Manual"
)

MISSING=0
for token in "${REQUIRED[@]}"; do
  if ! grep -qF -- "${token}" "${TARGET}"; then
    echo "Missing: ${token}"
    MISSING=1
  fi
done

if [[ "${MISSING}" -ne 0 ]]; then
  echo ""
  echo "Fix exercise.sh, then re-run: bash validate_flags.sh"
  echo "Cross-check: week_6__9_gotchas.md (missing --registry-server is the #1 failure mode)."
  exit 1
fi

echo "Flag check passed for ${TARGET}."
