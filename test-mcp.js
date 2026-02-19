import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GRIZZLY_SMS_API_KEY || process.env.SMS_ACTIVATE_API_KEY;

if (!API_KEY) {
  console.error('❌ GRIZZLY_SMS_API_KEY or SMS_ACTIVATE_API_KEY environment variable is required');
  console.log('💡 Create a .env file with: GRIZZLY_SMS_API_KEY=your_api_key');
  process.exit(1);
}

console.log('🚀 Starting MCP server test...');
console.log(`📝 Using API key: ${API_KEY.substring(0, 10)}...`);

// Test the MCP server by spawning it and sending a list tools request
const child = spawn('node', [join(__dirname, 'dist/index.js')], {
  stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      GRIZZLY_SMS_API_KEY: API_KEY,
      SMS_ACTIVATE_API_KEY: API_KEY
    }
});

// Send a JSON-RPC request to list tools
const request = {
  jsonrpc: '2.0',
  method: 'tools/list',
  id: 1,
  params: {}
};

console.log('📤 Sending tools/list request...');
child.stdin.write(JSON.stringify(request) + '\n');

let output = '';
let hasResponse = false;

child.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  
  // Try to parse JSON responses
  const lines = text.split('\n').filter(line => line.trim());
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      if (response.result) {
        hasResponse = true;
        console.log('✅ Server responded successfully!');
        console.log(`📋 Found ${response.result.tools?.length || 0} tools`);
        if (response.result.tools && response.result.tools.length > 0) {
          console.log('\n📝 Available tools:');
          response.result.tools.slice(0, 5).forEach((tool) => {
            console.log(`   - ${tool.name}: ${tool.description}`);
          });
          if (response.result.tools.length > 5) {
            console.log(`   ... and ${response.result.tools.length - 5} more`);
          }
        }
      }
    } catch (e) {
      // Not JSON, just log it
      if (text.trim()) {
        console.log('📥 Server output:', text.trim());
      }
    }
  }
});

child.stderr.on('data', (data) => {
  const text = data.toString();
  // Filter out the startup message
  if (!text.includes('Grizzly SMS MCP server running')) {
    console.error('⚠️  Server error output:', text.trim());
  }
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Test completed successfully!');
  } else {
    console.log(`\n❌ Server exited with code ${code}`);
  }
  process.exit(code);
});

// Give the server a moment to respond, then close
setTimeout(() => {
  if (!hasResponse) {
    console.log('⚠️  No response received from server');
    console.log('📄 Raw output:', output);
  }
  child.stdin.end();
}, 3000);

