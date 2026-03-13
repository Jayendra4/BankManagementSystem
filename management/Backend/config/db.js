const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Atlas Connected Successfully!");
    console.log("🌍 Host:", conn.connection.host);
    console.log("📂 Database:", conn.connection.name);

  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Failed:", error.message);
    console.log("\n� MongoDB Atlas Troubleshooting:");
    console.log("1. Check your internet connection");
    console.log("2. Verify MongoDB Atlas cluster is running");
    console.log("3. Ensure IP address is whitelisted in Atlas");
    console.log("4. Check username and password in connection string");
    console.log("5. Verify connection string format");
    console.log("6. Make sure database user has proper permissions");
    console.log("\n📋 Next Steps:");
    console.log("- Go to MongoDB Atlas: https://cloud.mongodb.com/");
    console.log("- Reset your database user password");
    console.log("- Get fresh connection string from Atlas");
    console.log("- Update your .env file with new credentials");
    
    process.exit(1);
  }
};

module.exports = connectDB;