# Grizzly SMS MCP Server

[English](#english) | [Русский](#russian)

---

<a name="english"></a>
## English

MCP (Model Context Protocol) server for integrating with [Grizzly SMS](https://grizzlysms.com/) service - a platform for receiving SMS verification codes and virtual phone numbers.

### Features

- 📱 **Phone Number Operations**: Request virtual numbers, check SMS codes, manage activations
- 💰 **Account Management**: Check balance, view service information
- 🌍 **Service Information**: Get available countries, services, and prices
- 🔄 **Real-time Status**: Track activation status and retrieve verification codes

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Grizzly SMS API key (get it from [grizzlysms.com](https://grizzlysms.com/))

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd mcp-grizzly-sms
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure environment

Create a `.env` file in the project root:

```env
GRIZZLY_SMS_API_KEY=your_api_key_here
GRIZZLY_SMS_BASE_URL=https://api.grizzlysms.com
```

#### 4. Build the project

```bash
npm run build
```

#### 5. Test the server

```bash
npm test
```

### Configuration for Cursor

Add this configuration to your Cursor settings:

#### Windows
Location: `%APPDATA%\Cursor\User\globalStorage\mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["C:/path/to/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "your_api_key_here",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```

#### macOS
Location: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["/Users/username/path/to/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "your_api_key_here",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```

#### Linux
Location: `~/.config/Cursor/User/globalStorage/mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["/home/username/path/to/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "your_api_key_here",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```
### Configuration for OpenClaw 🚀

Add this configuration to your OpenClaw settings:

#### Windows
Location: `%APPDATA%\.openclaw\openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["C:/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "your_api_key_here",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

#### macOS
Location: `~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["/Users/username/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "your_api_key_here",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

#### Linux
Location: `~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["/home/username/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "your_api_key_here",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

> ⚠️ **Important notes for OpenClaw:**
> - Always use **absolute paths** (not `~` or relative paths)
> - Replace the path in `args` with your actual path to `dist/index.js`
> - Restart OpenClaw Gateway after config changes: `openclaw gateway restart`
> - Environment variables are scoped to the MCP server only

#### Quick Setup for OpenClaw:

1. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

2. **Add configuration** to your `openclaw.json` (use absolute paths!)

3. **Restart Gateway:**
   ```bash
   openclaw gateway restart
   ```

4. **Check logs:**
   ```bash
   openclaw logs --tail 20
   ```

You should see: `MCP server "grizzly-sms" connected`
```
### Available Tools

#### Phone Number Operations

- **`request_number`** - Request a virtual phone number for SMS verification
  - `service` (required): Service code or name (e.g., "tg" or "Telegram", "wa" or "WhatsApp")
  - `country` (optional): Country ID or "*" or "any" for any country
  - `maxPrice` (optional): Maximum price you're willing to pay
  - `providerIds` (optional): Comma-separated list of provider IDs to include
  - `exceptProviderIds` (optional): Comma-separated list of provider IDs to exclude
  - `version` (optional): API version - "v1" (plain text) or "v2" (JSON with details)

- **`get_status`** - Check activation status and retrieve SMS code
  - `activationId` (required): The activation ID from request_number

- **`set_status`** - Change activation status
  - `activationId` (required): The activation ID
  - `status` (required): Status code (1=ready, 3=request new code, 6=complete, 8 or -1=cancel)

#### Information Tools

- **`get_balance`** - Check account balance
- **`get_countries`** - Get list of all available countries
- **`get_services`** - Get list of all available services
- **`get_prices`** - Get service prices by country
  - `service` (optional): Service code
  - `country` (optional): Country ID or "*" for any country
  - `version` (optional): API version - "v1", "v2", or "v3"

### Common Service Codes

| Code | Service |
|------|---------|
| `tg` | Telegram |
| `wa` | WhatsApp |
| `ig` | Instagram |
| `fb` | Facebook |
| `go` | Google, Gmail, Youtube |
| `tw` | Twitter |
| `vi` | Viber |
| `ot` | Any other |

### Common Country IDs

| ID | Country |
|----|---------|
| 1 | Ukraine |
| 2 | Kazakhstan |
| 3 | China |
| 4 | Philippines |
| 6 | Indonesia |
| 10 | Vietnam |
| 12 | USA (Virtual) |
| 16 | England |
| 22 | India |
| 73 | Brazil |
| 187 | USA |

### Development

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Start the server
npm start

# Run tests
npm test

# Test API methods
npm run test:api
```

### Troubleshooting

- **"GRIZZLY_SMS_API_KEY environment variable is required"** - Create `.env` file with your API key
- **"BAD_KEY"** - Verify API key is correct
- **"NO_BALANCE"** - Check account balance on [grizzlysms.com](https://grizzlysms.com/)
- **Connection errors** - Check internet connection and API availability

---

<a name="russian"></a>
## Русский

MCP (Model Context Protocol) сервер для интеграции с сервисом [Grizzly SMS](https://grizzlysms.com/) - платформой для получения SMS кодов верификации и виртуальных номеров телефонов.

### Возможности

- 📱 **Операции с номерами**: Запрос виртуальных номеров, проверка SMS кодов, управление активациями
- 💰 **Управление аккаунтом**: Проверка баланса, просмотр информации о сервисах
- 🌍 **Информация о сервисах**: Получение доступных стран, сервисов и цен
- 🔄 **Статус в реальном времени**: Отслеживание статуса активации и получение кодов верификации

### Требования

- Node.js 18 или выше
- npm или yarn
- API ключ Grizzly SMS (получите на [grizzlysms.com](https://grizzlysms.com/))

### Установка

#### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd mcp-grizzly-sms
```

#### 2. Установка зависимостей

```bash
npm install
```

#### 3. Настройка окружения

Создайте файл `.env` в корне проекта:

```env
GRIZZLY_SMS_API_KEY=ваш_api_ключ
GRIZZLY_SMS_BASE_URL=https://api.grizzlysms.com
```

#### 4. Сборка проекта

```bash
npm run build
```

#### 5. Тестирование сервера

```bash
npm test
```

### Конфигурация для Cursor

Добавьте эту конфигурацию в настройки Cursor:

#### Windows
Расположение: `%APPDATA%\Cursor\User\globalStorage\mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["C:/путь/к/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```

#### macOS
Расположение: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["/Users/username/путь/к/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```

#### Linux
Расположение: `~/.config/Cursor/User/globalStorage/mcp.json`

```json
{
  "mcpServers": {
    "grizzly-sms": {
      "command": "node",
      "args": ["/home/username/путь/к/mcp-grizzly-sms/dist/index.js"],
      "env": {
        "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
        "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
      }
    }
  }
}
```
### Конфигурация для OpenClaw 🚀

Добавьте эту конфигурацию в настройки OpenClaw:

#### Windows
Расположение: `%APPDATA%\.openclaw\openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["C:/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

#### macOS
Расположение: `~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["/Users/username/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

#### Linux
Расположение: `~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "main": {
      "model": "anthropic:claude-sonnet-4-20250514",
      "mcpServers": {
        "grizzly-sms": {
          "command": "node",
          "args": ["/home/username/absolute/path/to/grizzly-sms-mcp/dist/index.js"],
          "env": {
            "GRIZZLY_SMS_API_KEY": "ваш_api_ключ",
            "GRIZZLY_SMS_BASE_URL": "https://api.grizzlysms.com"
          }
        }
      }
    }
  }
}
```

> ⚠️ **Важные замечания для OpenClaw:**
> - Всегда используйте **абсолютные пути** (не `~` или относительные пути)
> - Замените путь в `args` на ваш реальный путь к `dist/index.js`
> - Перезапустите Gateway после изменений: `openclaw gateway restart`
> - Переменные окружения применяются только к MCP серверу

### Быстрая настройка для OpenClaw:

1. **Установите зависимости и соберите проект:**
   ```bash
   npm install
   npm run build
   ```

2. **Добавьте конфигурацию** в ваш `openclaw.json` (используйте абсолютные пути!)

3. **Перезапустите Gateway:**
   ```bash
   openclaw gateway restart
   ```

4. **Проверьте логи:**
   ```bash
   openclaw logs --tail 20
   ```

Должно появиться: `MCP server "grizzly-sms" connected`
```
### Доступные инструменты

#### Операции с телефонными номерами

- **`request_number`** - Запрос виртуального номера телефона для SMS верификации
  - `service` (обязательный): Код или название сервиса (например, "tg" или "Telegram", "wa" или "WhatsApp")
  - `country` (опциональный): ID страны или "*" или "any" для любой страны
  - `maxPrice` (опциональный): Максимальная цена, которую вы готовы заплатить
  - `providerIds` (опциональный): Список ID провайдеров через запятую для включения
  - `exceptProviderIds` (опциональный): Список ID провайдеров через запятую для исключения
  - `version` (опциональный): Версия API - "v1" (обычный текст) или "v2" (JSON с деталями)

- **`get_status`** - Проверка статуса активации и получение SMS кода
  - `activationId` (обязательный): ID активации из request_number

- **`set_status`** - Изменение статуса активации
  - `activationId` (обязательный): ID активации
  - `status` (обязательный): Код статуса (1=готов, 3=новый код, 6=завершить, 8 или -1=отменить)

#### Информационные инструменты

- **`get_balance`** - Проверка баланса аккаунта
- **`get_countries`** - Получить список всех доступных стран
- **`get_services`** - Получить список всех доступных сервисов
- **`get_prices`** - Получить цены на сервисы по странам
  - `service` (опциональный): Код сервиса
  - `country` (опциональный): ID страны или "*" для любой страны
  - `version` (опциональный): Версия API - "v1", "v2", или "v3"

### Основные коды сервисов

| Код | Сервис |
|------|---------|
| `tg` | Telegram |
| `wa` | WhatsApp |
| `ig` | Instagram |
| `fb` | Facebook |
| `go` | Google, Gmail, Youtube |
| `tw` | Twitter |
| `vi` | Viber |
| `ot` | Любой другой |

### Основные ID стран

| ID | Страна |
|----|---------|
| 1 | Украина |
| 2 | Казахстан |
| 3 | Китай |
| 4 | Филиппины |
| 6 | Индонезия |
| 10 | Вьетнам |
| 12 | США (Виртуальный) |
| 16 | Англия |
| 22 | Индия |
| 73 | Бразилия |
| 187 | США |

### Разработка

```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск сервера
npm start

# Запуск тестов
npm test

# Тестирование методов API
npm run test:api
```

### Решение проблем

- **"GRIZZLY_SMS_API_KEY environment variable is required"** - Создайте файл `.env` с вашим API ключом
- **"BAD_KEY"** - Проверьте правильность API ключа
- **"NO_BALANCE"** - Проверьте баланс аккаунта на [grizzlysms.com](https://grizzlysms.com/)
- **Ошибки подключения** - Проверьте интернет-соединение и доступность API

---

## Структура проекта

```
mcp-grizzly-sms/
├── src/
│   ├── index.ts              # Main MCP server / Основной MCP сервер
│   └── grizzly-sms-client.ts # Grizzly SMS API client / Клиент API
├── dist/                     # Compiled JavaScript / Скомпилированный код
├── docs/                     # API documentation / Документация API
│   ├── GRIZZLY-SMS.postman_collection.json
│   ├── api-protocol-for-working-with-grizzly-sms.json
│   └── services.json
├── test-mcp.js              # Basic test script / Базовый тестовый скрипт
├── test-api-methods.js      # API methods test script / Скрипт тестирования методов API
├── package.json
├── tsconfig.json
├── claude-desktop-config.json
└── README.md
```

## Поддержка / Support

- **API Documentation**: [grizzlysms.com/ru/docs](https://grizzlysms.com/ru/docs)
- **Grizzly SMS Website**: [grizzlysms.com](https://grizzlysms.com/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## Лицензия / License

MIT License - see [LICENSE](LICENSE) file for details.

## Автор / Author

Created for Grizzly SMS integration

## Благодарности / Acknowledgments

- [Grizzly SMS](https://grizzlysms.com/) for providing the SMS verification service
- [Anthropic](https://anthropic.com/) for the MCP protocol specification
