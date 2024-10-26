const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const db = await getDB();
    const users = await db.collection('users').find().toArray();
    res.json({ status: 'success', users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('users').insertOne({
      ...req.body,
      createdAt: new Date()
    });
    res.json({ status: 'success', result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
