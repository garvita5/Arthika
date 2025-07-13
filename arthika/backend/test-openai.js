const axios = require('axios');

async function testOpenAI() {
  console.log('🧪 Testing OpenAI API with real responses...\n');

  const testQuestions = [
    'What if I take a ₹50,000 gold loan?',
    'How should I invest ₹10,000 monthly?',
    'Best savings account for high returns?',
    'What are the risks of taking a personal loan?',
    'How to plan for child education expenses?'
  ];

  for (let i = 0; i < testQuestions.length; i++) {
    const question = testQuestions[i];
    console.log(`📝 Test ${i + 1}: "${question}"`);
    
    try {
      const response = await axios.post('http://localhost:5000/api/query', {
        question: question,
        language: 'en',
        userId: 'test-user-123'
      });

      if (response.data.success) {
        const data = response.data.data;
        console.log('✅ Response received:');
        console.log(`   📖 Story: ${data.storyResponse.substring(0, 100)}...`);
        console.log(`   🏷️  Tags: ${data.tags.join(', ')}`);
        console.log(`   ⚠️  Risk Level: ${data.riskLevel}`);
        console.log(`   💰 Estimated Cost: ${data.estimatedCost}`);
        console.log(`   📋 Steps: ${data.recommendedSteps.length} steps provided`);
        console.log(`   🔄 Alternatives: ${data.saferAlternatives.length} alternatives`);
        if (data.timeframe) console.log(`   ⏰ Timeframe: ${data.timeframe}`);
        if (data.expectedReturns) console.log(`   📈 Expected Returns: ${data.expectedReturns}`);
        if (data.governmentSchemes && data.governmentSchemes.length > 0) {
          console.log(`   🏛️  Government Schemes: ${data.governmentSchemes.join(', ')}`);
        }
      } else {
        console.log('❌ Failed to get response');
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.error || error.message);
    }
    
    console.log(''); // Empty line for readability
  }

  console.log('🎉 OpenAI API test completed!');
}

testOpenAI().catch(console.error); 