const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/database');
const authRouter = require('./src/routes/auth');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const client = await connectDB();
    const result = await client.db().command({ ping: 1 });
    res.json({ status: 'success', result });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// API Routes
app.use('/api/auth', authRouter);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`API Server running on port ${port}`);
});
