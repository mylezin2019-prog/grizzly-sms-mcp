# OpenClaw Configuration for Grizzly SMS Skill

OpenClaw works with **skills only** (no mcpServers). This skill uses the **exec** tool to run scripts that call the Grizzly API.

## Config Location

- **macOS**: `~/.openclaw/openclaw.json`
- **Windows**: `%APPDATA%\.openclaw\openclaw.json`
- **Linux**: `~/.openclaw/openclaw.json`

## Required Configuration

### 1. Load the skill

```json5
{
  "skills": {
    "load": {
      "extraDirs": ["/path/to/grizzly-sms-mcp/grizzly-sms-skill"]
    }
  }
}
```

### 2. Add API key and enable skill

```json5
{
  "skills": {
    "entries": {
      "grizzly_sms": {
        "enabled": true,
        "env": {
          "GRIZZLY_SMS_API_KEY": "your_api_key_from_grizzlysms_com"
        }
      }
    }
  }
}
```

## Full Example (merge with your config)

```json5
{
  "skills": {
    "load": {
      "extraDirs": ["/Users/sitis/Desktop/Grizzly-MCP/grizzly-sms-mcp/grizzly-sms-skill"]
    },
    "entries": {
      "grizzly_sms": {
        "enabled": true,
        "env": {
          "GRIZZLY_SMS_API_KEY": "your_key"
        }
      }
    }
  }
}
```

## Setup Steps

1. Ensure the skill folder is at the path in `extraDirs`
2. Add your API key from [grizzlysms.com](https://grizzlysms.com/) → Settings
3. Restart: `npx openclaw gateway restart`

### 3. Ensure exec tool is available

The agent must use the **exec** tool to run the script. With `tools.profile: "coding"`, exec is usually included. If the agent says it cannot call methods, add:

```json5
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": {
          "alsoAllow": ["agents_list", "exec"]
        }
      }
    ]
  }
}
```

## Important

- **No mcpServers** — OpenClaw uses skills + exec only
- **Node.js** — The script requires Node.js on the gateway host
- **Grizzly MCP in Docker** — Not used; the skill calls Grizzly API directly via the script
- Get API key at [grizzlysms.com](https://grizzlysms.com/) → Settings
