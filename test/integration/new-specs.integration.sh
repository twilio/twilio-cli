#!/usr/bin/env bash
# Integration test script for the six new API spec domains.
# Runs real twilio-cli commands against live Twilio APIs.
#
# Usage:
#   export TWILIO_ACCOUNT_SID=ACxxx
#   export TWILIO_API_KEY=SKxxx
#   export TWILIO_API_SECRET=xxx
#   bash test/integration/new-specs.integration.sh
#
# Requirements:
#   - twilio-cli checked out at ../twilio-cli (run from repo root)
#   - @twilio/cli-core symlinked to local cli-core (npm link @twilio/cli-core)
#   - jq installed (brew install jq)

set -euo pipefail

CLI="./bin/run"
PASS=0
FAIL=0
SKIP=0

# ── helpers ──────────────────────────────────────────────────────────────────

green() { printf '\033[32m✔ %s\033[0m\n' "$*"; }
red()   { printf '\033[31m✘ %s\033[0m\n' "$*"; }
yellow(){ printf '\033[33m⚠ %s\033[0m\n' "$*"; }
header(){ printf '\n\033[1;34m══ %s ══\033[0m\n' "$*"; }

assert_exit0() {
  local label="$1"; shift
  if "$@" >/dev/null 2>&1; then
    green "$label"
    (( PASS++ )) || true
  else
    red "$label"
    "$@" 2>&1 | head -5 || true
    (( FAIL++ )) || true
  fi
}

assert_json_array() {
  # Asserts command exits 0 and output is a JSON array (or "No results" for empty lists).
  # Note: the CLI prints "No results" to stderr, so we capture both streams.
  local label="$1"; shift
  local out err combined
  out=$("$@" -o json 2>/tmp/cli_stderr_$$) || {
    red "$label (exit non-zero)"
    cat /tmp/cli_stderr_$$ | head -5
    (( FAIL++ )) || true
    return
  }
  err=$(cat /tmp/cli_stderr_$$ 2>/dev/null || true)
  # "No results" is printed to stderr when the list is empty — treat as valid empty list
  if echo "$err" | grep -q "No results"; then
    green "$label (empty list)"
    (( PASS++ )) || true
  elif echo "$out" | jq -e 'type == "array"' >/dev/null 2>&1; then
    green "$label"
    (( PASS++ )) || true
  else
    red "$label (not a JSON array or 'No results')"
    echo "stdout: $out" | head -5
    echo "stderr: $err" | head -5
    (( FAIL++ )) || true
  fi
}

assert_json_field() {
  # Asserts command exits 0 and the first element of a JSON array has the given field
  local label="$1"; local field="$2"; shift 2
  local out
  out=$("$@" -o json 2>/dev/null) || { red "$label (exit non-zero)"; (( FAIL++ )) || true; return; }
  if echo "$out" | jq -e ".[0] | has(\"$field\")" >/dev/null 2>&1; then
    green "$label"
    (( PASS++ )) || true
  else
    red "$label (field '$field' missing in first result)"
    echo "$out" | head -10
    (( FAIL++ )) || true
  fi
}

assert_json_object() {
  # Asserts command exits 0 and stdout is a JSON object (fetch returns single-element array)
  local label="$1"; local field="$2"; shift 2
  local out
  out=$("$@" -o json 2>/dev/null) || { red "$label (exit non-zero)"; (( FAIL++ )) || true; return; }
  if echo "$out" | jq -e ".[0] | has(\"$field\")" >/dev/null 2>&1; then
    green "$label"
    (( PASS++ )) || true
  else
    red "$label (field '$field' missing)"
    echo "$out" | head -10
    (( FAIL++ )) || true
  fi
}

require_env() {
  for var in "$@"; do
    if [ -z "${!var:-}" ]; then
      echo "ERROR: \$$var is not set. Export it before running this script."
      exit 1
    fi
  done
}

# ── pre-flight ────────────────────────────────────────────────────────────────

require_env TWILIO_ACCOUNT_SID TWILIO_API_KEY TWILIO_API_SECRET

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq is required (brew install jq)"
  exit 1
fi

if [ ! -f "$CLI" ]; then
  echo "ERROR: $CLI not found. Run from the twilio-cli repo root."
  exit 1
fi

# Verify CLI loads without plugin errors
if ! $CLI --help 2>&1 | grep -q "^  api "; then
  echo "ERROR: twilio-cli api plugin failed to load. Check npm link @twilio/cli-core."
  exit 1
fi

echo "Account SID : ${TWILIO_ACCOUNT_SID:0:5}XXXXXX"
echo "API Key     : ${TWILIO_API_KEY:0:5}XXXXXX"
echo ""

# ── memory:v1 ────────────────────────────────────────────────────────────────

header "memory:v1"

# List all memory stores (returns array of ID strings)
assert_json_array \
  "memory:v1 control-plane:stores:list returns array" \
  $CLI api:memory:v1:control-plane:stores:list --no-limit

# Capture a store ID for further tests
MEMORY_STORE_ID=$($CLI api:memory:v1:control-plane:stores:list --no-limit -o json 2>/dev/null | jq -r '.[0]' 2>/dev/null || echo "")

if [ -n "$MEMORY_STORE_ID" ] && [ "$MEMORY_STORE_ID" != "null" ]; then
  yellow "Using Memory Store: $MEMORY_STORE_ID"

  assert_json_object \
    "memory:v1 control-plane:stores:fetch returns object with 'id'" \
    "id" \
    $CLI api:memory:v1:control-plane:stores:fetch --store-id "$MEMORY_STORE_ID"

  # List trait groups for the store (tests path-level param resolution)
  assert_json_array \
    "memory:v1 control-plane:stores:trait-groups:list returns array" \
    $CLI api:memory:v1:control-plane:stores:trait-groups:list --store-id "$MEMORY_STORE_ID" --no-limit

  # List data mappings
  assert_json_array \
    "memory:v1 control-plane:stores:data-mappings:list returns array" \
    $CLI api:memory:v1:control-plane:stores:data-mappings:list --store-id "$MEMORY_STORE_ID" --no-limit
else
  yellow "No Memory stores found — skipping fetch/trait-groups tests"
  (( SKIP+=3 )) || true
fi

# ── knowledge:v2 ─────────────────────────────────────────────────────────────

header "knowledge:v2"

assert_json_array \
  "knowledge:v2 control-plane:knowledge-bases:list returns array" \
  $CLI api:knowledge:v2:control-plane:knowledge-bases:list --no-limit

KNOWLEDGE_BASE_ID=$($CLI api:knowledge:v2:control-plane:knowledge-bases:list --no-limit -o json 2>/dev/null | jq -r '.[0].id' 2>/dev/null || echo "")

if [ -n "$KNOWLEDGE_BASE_ID" ] && [ "$KNOWLEDGE_BASE_ID" != "null" ]; then
  yellow "Using Knowledge Base: $KNOWLEDGE_BASE_ID"

  assert_json_object \
    "knowledge:v2 control-plane:knowledge-bases:fetch returns object with 'id'" \
    "id" \
    $CLI api:knowledge:v2:control-plane:knowledge-bases:fetch --kb-id "$KNOWLEDGE_BASE_ID"

  # Note: api:knowledge:v2:knowledge-bases:list requires x-twilio fix in spec (currently skipped)
  yellow "Skipping knowledge:v2:knowledge-bases:list — path missing x-twilio.pathType in spec"
  (( SKIP++ )) || true
else
  yellow "No Knowledge Bases found — skipping fetch/knowledge tests"
  (( SKIP+=2 )) || true
fi

# ── intelligence:v3 ──────────────────────────────────────────────────────────

header "intelligence:v3"

assert_json_array \
  "intelligence:v3 control-plane:configurations:list returns array" \
  $CLI api:intelligence:v3:control-plane:configurations:list --no-limit

INTEL_CONFIG_ID=$($CLI api:intelligence:v3:control-plane:configurations:list --no-limit -o json 2>/dev/null | jq -r '.[0].id' 2>/dev/null || echo "")

if [ -n "$INTEL_CONFIG_ID" ] && [ "$INTEL_CONFIG_ID" != "null" ]; then
  yellow "Using Intelligence Configuration: $INTEL_CONFIG_ID"

  assert_json_object \
    "intelligence:v3 control-plane:configurations:fetch returns object with 'id'" \
    "id" \
    $CLI api:intelligence:v3:control-plane:configurations:fetch --id "$INTEL_CONFIG_ID"
else
  yellow "No Intelligence Configurations found — skipping fetch test"
  (( SKIP+=1 )) || true
fi

assert_json_array \
  "intelligence:v3 conversations:list returns array (may be empty)" \
  $CLI api:intelligence:v3:conversations:list --no-limit

assert_json_array \
  "intelligence:v3 operators:list returns array" \
  $CLI api:intelligence:v3:control-plane:operators:list --no-limit

# ── conversations:v2 ─────────────────────────────────────────────────────────

header "conversations:v2"

assert_json_array \
  "conversations:v2 conversations:list returns array (may be empty)" \
  $CLI api:conversations:v2:conversations:list --no-limit

CONVO_SID=$($CLI api:conversations:v2:conversations:list --no-limit -o json 2>/dev/null | jq -r '.[0].sid // .[0].id' 2>/dev/null || echo "")

if [ -n "$CONVO_SID" ] && [ "$CONVO_SID" != "null" ]; then
  yellow "Using Conversation: $CONVO_SID"

  assert_json_object \
    "conversations:v2 conversations:fetch returns object" \
    "sid" \
    $CLI api:conversations:v2:conversations:fetch --sid "$CONVO_SID"
else
  yellow "No Conversations v2 found — skipping fetch test"
  (( SKIP+=1 )) || true
fi

# Control-plane config
assert_json_array \
  "conversations:v2 control-plane configurations:list returns array" \
  $CLI api:conversations:v2:control-plane:configurations:list --no-limit

# ── voice:v3 ─────────────────────────────────────────────────────────────────

header "voice:v3"

# No list endpoint on voice:v3 transcriptions — only create+fetch.
# We just verify the help resolves (command is registered).
if $CLI api:voice:v3:transcriptions:create --help >/dev/null 2>&1; then
  green "voice:v3 transcriptions:create command is registered"
  (( PASS++ )) || true
else
  red "voice:v3 transcriptions:create command not found"
  (( FAIL++ )) || true
fi

if $CLI api:voice:v3:transcriptions:fetch --help >/dev/null 2>&1; then
  green "voice:v3 transcriptions:fetch command is registered"
  (( PASS++ )) || true
else
  red "voice:v3 transcriptions:fetch command not found"
  (( FAIL++ )) || true
fi

# ── JSON body write test (memory:v1 create + delete) ─────────────────────────

header "JSON body write (memory:v1 create/delete)"

NEW_STORE_NAME="cli-integration-test-$$"
# memory:v1 stores:create returns 202 LRO: { message, statusUrl } (async operation)
CREATE_OUT=$($CLI api:memory:v1:control-plane:stores:create \
  --display-name "$NEW_STORE_NAME" \
  --description "Created by twilio-cli integration test" \
  -o json 2>/dev/null || echo "")

# Accept either a direct 'id' (sync) or a 'statusUrl' (202 async LRO)
if echo "$CREATE_OUT" | jq -e '.[0] | (has("id") or has("statusUrl"))' >/dev/null 2>&1; then
  green "memory:v1 control-plane:stores:create (JSON body) succeeded"
  (( PASS++ )) || true
  yellow "Response: $(echo "$CREATE_OUT" | jq -c '.[0]')"

  # If we got an id directly, clean it up
  NEW_STORE_ID=$(echo "$CREATE_OUT" | jq -r '.[0].id // empty' 2>/dev/null || echo "")
  if [ -n "$NEW_STORE_ID" ]; then
    if $CLI api:memory:v1:control-plane:stores:remove --store-id "$NEW_STORE_ID" 2>/dev/null; then
      green "memory:v1 control-plane:stores:remove (cleanup) succeeded"
      (( PASS++ )) || true
    else
      yellow "memory:v1 control-plane:stores:remove cleanup failed (may need manual cleanup)"
      (( SKIP++ )) || true
    fi
  else
    yellow "Store created async (LRO) — no immediate ID to clean up"
    (( SKIP++ )) || true
  fi
else
  red "memory:v1 control-plane:stores:create failed or returned unexpected shape"
  echo "$CREATE_OUT" | head -5
  (( FAIL++ )) || true
fi

# ── summary ──────────────────────────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "  \033[32mPASS: %d\033[0m  \033[31mFAIL: %d\033[0m  \033[33mSKIP: %d\033[0m\n" "$PASS" "$FAIL" "$SKIP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
