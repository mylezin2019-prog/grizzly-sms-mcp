---
name: grizzly_sms
description: SMS verification and virtual phone numbers via Grizzly SMS API
metadata: {"openclaw":{"primaryEnv":"GRIZZLY_SMS_API_KEY","askForEnvInDialog":true}}
---

# Grizzly SMS Skill

Use this skill when the user needs: SMS verification, virtual numbers (Uber, Telegram, WhatsApp, Instagram, etc.), balance, prices, countries, services.

## API Key — Ask in Dialog

**Before running any Grizzly command**, you MUST ask the user for the API key (unless they already gave it in this conversation):

> Please provide your Grizzly SMS API key (get it at grizzlysms.com → Settings)

Wait for the user to provide the key. Then pass it via exec env on every call:

```
exec(command="node {baseDir}/scripts/grizzly-cli.js get_services", env={"GRIZZLY_SMS_API_KEY": "<key_from_user>"})
```

If the key is already in config (skills.entries.grizzly_sms.env), omit env. Otherwise always ask and pass via env.

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

## Workflow Example: Instagram in Jamaica

1. Ask user for API key (if not in config)
2. exec get_services → find code for Instagram (ig)
3. exec get_countries → find Jamaica (country ID)
4. exec request_number ig <countryId> → get phone
5. exec get_status <id> → poll for SMS code
6. exec set_status <id> 6 → complete

## Service codes: tg, wa, ig, ub, fb, go
