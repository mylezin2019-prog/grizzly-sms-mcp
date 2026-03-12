# OpenClaw Configuration for Grizzly SMS MCP

Add the grizzly-sms MCP server to your OpenClaw config.

## Config Location

- **Windows**: `%APPDATA%\.openclaw\openclaw.json`
- **macOS**: `~/.openclaw/openclaw.json`
- **Linux**: `~/.openclaw/openclaw.json`

## Configuration Block

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

## Setup Steps

1. Clone: `git clone https://github.com/GrizzlySMS-Git/grizzly-sms-mcp.git`
2. Install: `cd grizzly-sms-mcp && npm install && npm run build`
3. Replace `/absolute/path/to/grizzly-sms-mcp` with your actual path
4. Add your API key from [grizzlysms.com](https://grizzlysms.com/)
5. Restart: `openclaw gateway restart`

## Important

- Use **absolute paths** (not `~` or relative)
- Get API key at [grizzlysms.com](https://grizzlysms.com/) → Settings
