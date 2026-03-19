---
name: grizzly_sms
description: SMS verification and virtual phone numbers via Grizzly SMS API
metadata: {"openclaw":{"primaryEnv":"GRIZZLY_SMS_API_KEY","askForEnvInDialog":true}}
---

# Grizzly SMS Skill

Use this skill when the user needs: SMS verification, virtual numbers (Uber, Telegram, WhatsApp, Instagram, etc.), balance, prices, countries, services.

## API Key — Ask in Dialog

**Before running any Grizzly command**, you MUST ask the user for the API key (unless they already gave it in this conversation):

> Please provide your Grizzly SMS API key. Register on grizzlysms.com, then go to the API section (grizzlysms.com/docs) and copy the key.

**When the user provides the key in chat** — use it immediately. Pass it via exec env on every Grizzly call. Do NOT tell the user to set environment variables or edit config. The exec tool accepts env overrides; use them.

```
exec(command="node {baseDir}/scripts/grizzly-cli.js get_services", env={"GRIZZLY_SMS_API_KEY": "<exact_key_user_sent>"})
```

Example: user sends `e069d36075b9b230fe1eb159b86526d1` → use `env={"GRIZZLY_SMS_API_KEY": "e069d36075b9b230fe1eb159b86526d1"}` in exec. Then proceed with get_services, request_number, etc.

If the key is already in config (skills.entries.grizzly_sms.env), omit env. Otherwise always ask and pass via env.

**DO NOT** ask the user to set GRIZZLY_SMS_API_KEY in environment variables or config files when they already provided the key in chat. Use it directly.

## How to Call

There is NO tool named grizzly_sms.get_services(). You MUST use the **exec** tool. Example:

```
exec(command="node {baseDir}/scripts/grizzly-cli.js get_services", env={"GRIZZLY_SMS_API_KEY": "<user_key>"})
```

Use host=gateway only if tools.exec.host is configured for gateway. OpenClaw replaces {baseDir} with the skill folder path.

## Commands (run via exec)

| What to do | Exec command |
|------------|--------------|
| List services (find Uber) | `node {baseDir}/scripts/grizzly-cli.js get_services` |
| List countries (Brazil=73) | `node {baseDir}/scripts/grizzly-cli.js get_countries` |
| Check balance | `node {baseDir}/scripts/grizzly-cli.js get_balance` |
| Request number | `node {baseDir}/scripts/grizzly-cli.js request_number ub 73` |
| Get SMS code | `node {baseDir}/scripts/grizzly-cli.js get_status <activationId>` |
| Complete activation | `node {baseDir}/scripts/grizzly-cli.js set_status <activationId> 6` |

## Workflow Example: Uber in Brazil

1. Ask user for API key (if not in config)
2. When user provides key → exec get_services with env (find ub)
3. exec get_countries with env (find Brazil=73)
4. exec request_number ub 73 with env → get phone number
5. exec get_status <activationId> with env → poll for SMS code
6. exec set_status <activationId> 6 with env → complete

## Service codes: tg, wa, ig, ub, fb, go
