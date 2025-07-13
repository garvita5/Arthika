const axios = require('axios');

async function testBackendConnection() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test API info endpoint
    const apiResponse = await axios.get('http://localhost:5000/api/');
    console.log('✅ API info endpoint working:', apiResponse.data.message);
    
    // Test query endpoint
    const queryResponse = await axios.post('http://localhost:5000/api/query', {
      question: 'What if I take a gold loan?',
      language: 'en',
      userId: 'test-user-123'
    });
    console.log('✅ Query endpoint working:', queryResponse.data.success);
    
    // Test roadmap endpoint (should work with mock data now)
    const roadmapResponse = await axios.get('http://localhost:5000/api/user/test-user-123/roadmap');
    console.log('✅ Roadmap endpoint working:', roadmapResponse.data.success);
    
    console.log('🎉 All backend endpoints are working!');
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testBackendConnection(); 