require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Atlas Connection...');
console.log('📋 Connection String:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');

const testConnection = async () => {
  try {
    console.log('🔄 Attempting to connect...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Test a simple operation
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('🔍 Error name:', error.name);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('🔧 Possible issues:');
      console.log('   1. Cluster is paused/suspended in Atlas');
      console.log('   2. Network connectivity issues');
      console.log('   3. Firewall blocking connection');
      console.log('   4. DNS resolution problems');
    } else if (error.name === 'MongoParseError') {
      console.log('🔧 Connection string format issue');
      console.log('🔍 Check your connection string in .env file');
    } else if (error.message.includes('Authentication')) {
      console.log('🔧 Username/password incorrect');
    }
    
    process.exit(1);
  }
};

testConnection();
