const { MongoClient } = require('mongodb');

let client = null;

async function connectDB() {
  if (client) return client;
  
  try {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    await client.connect();
    console.log('✓ Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

async function getDB() {
  if (!client) {
    await connectDB();
  }
  return client.db('orbitblu');
}

module.exports = { connectDB, getDB };
