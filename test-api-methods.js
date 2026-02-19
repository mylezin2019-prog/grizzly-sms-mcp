import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GRIZZLY_SMS_API_KEY || process.env.SMS_ACTIVATE_API_KEY;

if (!API_KEY) {
  console.error('❌ GRIZZLY_SMS_API_KEY or SMS_ACTIVATE_API_KEY environment variable is required');
  console.log('💡 Create a .env file with: GRIZZLY_SMS_API_KEY=your_api_key');
  process.exit(1);
}

console.log('🧪 Testing Grizzly SMS MCP Server API Methods\n');
console.log(`📝 Using API key: ${API_KEY.substring(0, 10)}...\n`);

// Helper function to send JSON-RPC request
function sendRequest(child, method, params = {}) {
  return new Promise((resolve, reject) => {
    const request = {
      jsonrpc: '2.0',
      method,
      id: Date.now(),
      params
    };

    let responseData = '';
    let errorData = '';

    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, 10000);

    const onData = (data) => {
      const text = data.toString();
      responseData += text;
      
      const lines = text.split('\n').filter(line => line.trim());
      for (const line of lines) {
        try {
          const response = JSON.parse(line);
          if (response.id === request.id) {
            clearTimeout(timeout);
            child.stdout.removeListener('data', onData);
            child.stderr.removeListener('data', onError);
            if (response.error) {
              reject(new Error(response.error.message || JSON.stringify(response.error)));
            } else {
              resolve(response.result);
            }
          }
        } catch (e) {
          // Not JSON, continue
        }
      }
    };

    const onError = (data) => {
      errorData += data.toString();
    };

    child.stdout.on('data', onData);
    child.stderr.on('data', onError);

    child.stdin.write(JSON.stringify(request) + '\n');
  });
}

// Test function
async function testMethod(name, method, params, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 Test: ${name}`);
  console.log(`📝 Description: ${description}`);
  console.log(`${'='.repeat(60)}`);

  const child = spawn('node', [join(__dirname, 'dist/index.js')], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      GRIZZLY_SMS_API_KEY: API_KEY,
      SMS_ACTIVATE_API_KEY: API_KEY
    }
  });

  try {
    const result = await sendRequest(child, method, params);
    console.log('✅ Success!');
    console.log('📦 Response:', JSON.stringify(result, null, 2));
    child.kill();
    return { success: true, result };
  } catch (error) {
    console.log('❌ Error:', error.message);
    child.kill();
    return { success: false, error: error.message };
  }
}

// Run tests
async function runTests() {
  const results = [];

  // Test 1: Get Balance
  console.log('\n🔍 TEST 1: Checking account balance');
  results.push(await testMethod(
    'get_balance',
    'tools/call',
    {
      name: 'get_balance',
      arguments: {}
    },
    'Get account balance from Grizzly SMS API'
  ));

  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 2: Get Services List
  console.log('\n🔍 TEST 2: Getting services list');
  results.push(await testMethod(
    'get_services',
    'tools/call',
    {
      name: 'get_services',
      arguments: {}
    },
    'Get list of available services from Grizzly SMS API'
  ));

  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 3: Get Countries List
  console.log('\n🔍 TEST 3: Getting countries list');
  results.push(await testMethod(
    'get_countries',
    'tools/call',
    {
      name: 'get_countries',
      arguments: {}
    },
    'Get list of available countries from Grizzly SMS API'
  ));

  // Summary
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`✅ Passed: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${results.length}`);
  
  if (failCount === 0) {
    console.log('\n🎉 All tests passed! MCP server is working correctly with Grizzly SMS API.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
  
  process.exit(failCount > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

