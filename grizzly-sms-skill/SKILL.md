---
name: grizzly_sms
description: SMS verification and virtual phone numbers via Grizzly SMS MCP
---

# Grizzly SMS MCP Skill

Use this skill when the user needs:
- SMS verification codes
- Virtual phone numbers for Telegram, WhatsApp, Instagram, etc.
- Balance check or top-up instructions
- Service prices, countries, or available services

## Prerequisites

The **grizzly-sms** MCP server must be configured in OpenClaw. User needs an API key from [grizzlysms.com](https://grizzlysms.com/).

## MCP Tools Available

When grizzly-sms is connected, use these tools:

| Tool | Purpose |
|------|---------|
| `get_balance` | Check account balance |
| `request_number` | Request virtual number (service required: tg, wa, ig, etc.) |
| `get_status` | Get activation status and SMS code |
| `set_status` | Change status: 1=ready, 3=new code, 6=complete, 8=cancel |
| `get_crypto_wallet` | Get USDT TRC-20 address for balance top-up |
| `get_prices` | Get service prices by country |
| `get_countries` | List available countries |
| `get_services` | List available services |

## Common Service Codes

- `tg` - Telegram
- `wa` - WhatsApp
- `ig` - Instagram
- `fb` - Facebook
- `go` - Google, Gmail, Youtube

## Workflow

1. **Request number**: Use `request_number` with service (e.g. "tg") and optional country
2. **Wait for SMS**: Use `get_status` with activationId to poll for code
3. **Complete**: Use `set_status` with status 6 when code received
4. **Top-up**: Use `get_crypto_wallet` if user needs to replenish balance

## Setup

User must add grizzly-sms MCP server to `openclaw.json` with API key. See CONFIG.md in this skill.
