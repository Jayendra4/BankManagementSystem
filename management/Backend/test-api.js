const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // Test health check
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check:', health.data);
    
    // Test get accounts
    const accounts = await axios.get('http://localhost:5000/api/accounts');
    console.log('✅ Get accounts:', accounts.data.length, 'accounts found');
    
    // Test signup (create account)
    const newAccount = await axios.post('http://localhost:5000/api/accounts', {
      accountNumber: 'ACC999',
      accountHolder: 'Test User',
      balance: 0,
      email: 'test@example.com',
      phone: '123456'
    });
    console.log('✅ Create account:', newAccount.data);
    
    // Test login simulation
    const allAccounts = await axios.get('http://localhost:5000/api/accounts');
    const user = allAccounts.data.find(acc => acc.email === 'john@example.com');
    if (user && user.phone === '123456') {
      console.log('✅ Login simulation successful for:', user.email);
    }
    
    console.log('🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testAPI();
