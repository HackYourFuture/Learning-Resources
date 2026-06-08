#!/usr/bin/env bash
# Teacher-only: run Ex2 CLI verify commands with student data-plane RBAC.
# Owner/Contributor on rg-hyf-data is not enough for --auth-mode login.
set -euo pipefail

ROLE="HYF Data Track Student"
ACCOUNT="hyfstoragedev"
CONTAINER="raw"
PREFIX="test/"
PROPAGATION_SECS="${PROPAGATION_SECS:-60}"

MY_OID="$(az ad signed-in-user show --query id -o tsv)"
SUB_ID="$(az account show --query id -o tsv)"
SCOPE="/subscriptions/${SUB_ID}/resourceGroups/rg-hyf-data/providers/Microsoft.Storage/storageAccounts/${ACCOUNT}"

cleanup() {
  az role assignment delete \
    --role "$ROLE" \
    --assignee "$MY_OID" \
    --scope "$SCOPE" \
    -o none 2>/dev/null || true
}
trap cleanup EXIT

echo "Assigning temporary ${ROLE} on ${ACCOUNT}..."
az role assignment create \
  --role "$ROLE" \
  --assignee-object-id "$MY_OID" \
  --assignee-principal-type User \
  --scope "$SCOPE" \
  -o none

echo "Waiting ${PROPAGATION_SECS}s for RBAC propagation..."
sleep "$PROPAGATION_SECS"
az account get-access-token --resource https://storage.azure.com/ -o none

unset AZURE_STORAGE_CONNECTION_STRING

echo ""
echo "=== az storage blob list (--auth-mode login) ==="
az storage blob list \
  --account-name "$ACCOUNT" \
  --container-name "$CONTAINER" \
  --prefix "$PREFIX" \
  --output table \
  --auth-mode login

BLOB_NAME="$(az storage blob list \
  --account-name "$ACCOUNT" \
  --container-name "$CONTAINER" \
  --prefix "$PREFIX" \
  --query "sort_by(@, &properties.lastModified)[-1].name" \
  --auth-mode login \
  -o tsv)"

if [[ -z "$BLOB_NAME" ]]; then
  echo "No blob under ${PREFIX} — run solutions/exercise.py first." >&2
  exit 1
fi

TMP="$(mktemp)"
echo ""
echo "=== az storage blob download (--auth-mode login) ==="
az storage blob download \
  --account-name "$ACCOUNT" \
  --container-name "$CONTAINER" \
  --name "$BLOB_NAME" \
  --file "$TMP" \
  --auth-mode login \
  -o none
/bin/cat "$TMP"
echo ""
rm -f "$TMP"

echo ""
echo "Student CLI simulation passed for ${BLOB_NAME}."
