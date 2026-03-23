#!/usr/bin/env node
/**
 * Grizzly SMS CLI - for use with OpenClaw exec tool.
 * Requires: GRIZZLY_SMS_API_KEY in env (via skills.entries.grizzly_sms.env)
 * Usage: node grizzly-cli.js <command> [args...]
 * Commands: get_services | get_countries | get_balance | get_prices | get_wallet | request_number | get_status | set_status
 */

const API_KEY = process.env.GRIZZLY_SMS_API_KEY;
const BASE_URL = process.env.GRIZZLY_SMS_BASE_URL || 'https://api.grizzlysms.com';

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'GRIZZLY_SMS_API_KEY required' }));
  process.exit(1);
}

async function request(params) {
  const url = new URL('/stubs/handler_api.php', BASE_URL);
  url.searchParams.set('api_key', API_KEY);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  try {
    switch (cmd) {
      case 'get_services': {
        const data = await request({ action: 'getServicesList' });
        console.log(JSON.stringify(data, null, 2));
        break;
      }
      case 'get_countries': {
        const data = await request({ action: 'getCountries' });
        console.log(JSON.stringify(data, null, 2));
        break;
      }
      case 'get_balance': {
        const data = await request({ action: 'getBalance' });
        console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
        break;
      }
      case 'get_wallet': {
        const base = new URL(BASE_URL).origin;
        const url = new URL('/public/crypto/wallet', base + '/');
        url.searchParams.set('api_key', API_KEY);
        url.searchParams.set('coin', 'usdt');
        url.searchParams.set('network', 'tron');
        const res = await fetch(url.toString());
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          console.log(JSON.stringify(data, null, 2));
        } catch {
          console.log(JSON.stringify({ wallet_address: null, error: text }));
        }
        break;
      }
      case 'get_prices': {
        const [country, service] = args;
        const params = { action: 'getPrices' };
        if (country) params.country = country;
        if (service) params.service = service;
        const data = await request(params);
        console.log(JSON.stringify(data, null, 2));
        break;
      }
      case 'request_number': {
        const [service, country] = args;
        if (!service) {
          console.error(JSON.stringify({ error: 'service required (e.g. ub, tg, wa)' }));
          process.exit(1);
        }
        const params = { action: 'getNumber', service };
        if (country) params.country = country;
        const data = await request(params);
        console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
        break;
      }
      case 'get_status': {
        const [activationId] = args;
        if (!activationId) {
          console.error(JSON.stringify({ error: 'activationId required' }));
          process.exit(1);
        }
        const data = await request({ action: 'getStatus', id: activationId });
        console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
        break;
      }
      case 'set_status': {
        const [activationId, status] = args;
        if (!activationId || !status) {
          console.error(JSON.stringify({ error: 'activationId and status required (status: 6=complete, 8=cancel)' }));
          process.exit(1);
        }
        const data = await request({ action: 'setStatus', id: activationId, status });
        console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
        break;
      }
      default:
        console.error(JSON.stringify({
          error: 'Unknown command',
          usage: 'grizzly-cli.js <get_services|get_countries|get_balance|get_prices|get_wallet|request_number|get_status|set_status> [args...]',
          examples: [
            'node grizzly-cli.js get_services',
            'node grizzly-cli.js get_balance',
            'node grizzly-cli.js get_wallet',
            'node grizzly-cli.js request_number ub 73',
            'node grizzly-cli.js get_status ACTIVATION_ID',
            'node grizzly-cli.js set_status ACTIVATION_ID 6',
          ],
        }));
        process.exit(1);
    }
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
