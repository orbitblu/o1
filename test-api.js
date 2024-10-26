const fetch = require('node-fetch');

async function testAPI() {
  const baseUrl = 'http://localhost:3001';
  
  try {
    console.log('\nTesting API endpoints...');

    // 1. Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('Health check response:', healthData);

    // 2. Test MongoDB connection
    console.log('\n2. Testing MongoDB connection...');
    const dbResponse = await fetch(`${baseUrl}/api/health/db`);
    const dbData = await dbResponse.json();
    console.log('MongoDB test response:', dbData);

    // 3. Test CRUD operations
    console.log('\n3. Testing CRUD operations...');
    const createResponse = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com'
      })
    });
    const createData = await createResponse.json();
    console.log('Create user response:', createData);

    const getResponse = await fetch(`${baseUrl}/api/users`);
    const getData = await getResponse.json();
    console.log('Get users response:', getData);

  } catch (error) {
    console.error('API Test failed:', error.message);
  }
}

testAPI();
