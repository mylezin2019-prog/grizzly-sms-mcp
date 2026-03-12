# OpenClaw Configuration for Grizzly SMS MCP

Add the grizzly-sms MCP server to your OpenClaw config.

## Config Location

- **Windows**: `%APPDATA%\.openclaw\openclaw.json`
- **macOS**: `~/.openclaw/openclaw.json`
- **Linux**: `~/.openclaw/openclaw.json`

## Option A: Native (stdio) — MCP as subprocess

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "your_api_key_from_grizzlysms_com",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

## Option B: Docker — MCP as HTTP server

When MCP runs in Docker, use URL-based config:

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "url": "http://localhost:3000/mcp",
          "transport": "sse"
        }
      }
    }
  }
}
```

## Setup Steps

### Native (Option A)

1. Clone: `git clone https://github.com/GrizzlySMS-Git/grizzly-sms-mcp.git`
2. Install: `cd grizzly-sms-mcp && npm install && npm run build`
3. Replace `/absolute/path/to/grizzly-sms-mcp` with your actual path
4. Add your API key from [grizzlysms.com](https://grizzlysms.com/)
5. Restart: `openclaw gateway restart`

### Docker (Option B)

1. Clone: `git clone https://github.com/GrizzlySMS-Git/grizzly-sms-mcp.git`
2. Create `.env` with `GRIZZLY_SMS_API_KEY=your_key`
3. Run: `docker compose up -d --build`
4. MCP will be available at `http://localhost:3000/mcp`
5. Add the URL config above to `openclaw.json`
6. Restart: `openclaw gateway restart`

## Important

- **Native:** Use **absolute paths** (not `~` or relative)
- **Docker:** Ensure port 3000 is not in use
- Get API key at [grizzlysms.com](https://grizzlysms.com/) → Settings
