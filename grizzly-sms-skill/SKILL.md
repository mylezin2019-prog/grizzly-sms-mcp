---
name: grizzly_sms
description: SMS verification and virtual phone numbers via Grizzly SMS API
metadata: {"openclaw":{"primaryEnv":"GRIZZLY_SMS_API_KEY"}}
---

# Grizzly SMS Skill

Use this skill when the user needs: SMS verification, virtual numbers (Uber, Telegram, WhatsApp, etc.), balance, prices, countries, services.

## IMPORTANT: How to Call

There is NO tool named grizzly_sms.get_services(). You MUST use the **exec** tool to run the script. Example:

```
exec(command="node {baseDir}/scripts/grizzly-cli.js get_services")
```
Use host=gateway only if tools.exec.host is configured for gateway. Otherwise omit host (default sandbox).

OpenClaw replaces {baseDir} with the skill folder path. If not resolved, use the path from skills.load.extraDirs

## Commands (run via exec)

| What to do | Exec command |
|------------|--------------|
| List services (find Uber) | `node {baseDir}/scripts/grizzly-cli.js get_services` |
| List countries (Brazil=73) | `node {baseDir}/scripts/grizzly-cli.js get_countries` |
| Check balance | `node {baseDir}/scripts/grizzly-cli.js get_balance` |
| Request number | `node {baseDir}/scripts/grizzly-cli.js request_number ub 73` |
| Get SMS code | `node {baseDir}/scripts/grizzly-cli.js get_status <activationId>` |
| Complete activation | `node {baseDir}/scripts/grizzly-cli.js set_status <activationId> 6` |

## Workflow: Uber in Brazil

1. exec get_services → find code for Uber (ub)
2. exec get_countries → find Brazil (73)
3. exec request_number ub 73 → get phone
4. exec get_status <id> → poll for SMS code
5. exec set_status <id> 6 → complete

## Service codes: tg, wa, ig, ub, fb, go
