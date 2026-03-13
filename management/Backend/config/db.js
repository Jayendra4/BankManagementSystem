require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Failed:', error.message);
    
    console.log('\n🔧 MongoDB Atlas Troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Verify MongoDB Atlas cluster is running');
    console.log('3. Ensure IP address is whitelisted in Atlas (add 0.0.0.0/0 for any IP)');
    console.log('4. Check username and password in connection string');
    console.log('5. Verify connection string format');
    console.log('6. Make sure database user has proper permissions');
    console.log('7. Try updating connection string with retryWrites=true&w=majority');
    
    console.log('\n📋 Next Steps:');
    console.log('- Go to MongoDB Atlas: https://cloud.mongodb.com/');
    console.log('- Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)');
    console.log('- Database Access → Edit user → Reset password if needed');
    console.log('- Get fresh connection string from Atlas → Connect → Connect your application');
    console.log('- Update your .env file with new credentials');
    
    process.exit(1);
  }
};

module.exports = connectDB;
