const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/database');
const usersRouter = require('./src/routes/users');
const errorHandler = require('./src/middleware/error');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  try {
    const client = await connectDB();
    const result = await client.db().command({ ping: 1 });
    res.json({ status: 'success', result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Routes
app.use('/api/users', usersRouter);

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`API Server running on port ${port}`);
});
