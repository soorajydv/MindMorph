const express = require('express');
const router = express.Router();


//DB Connection
const pool = require('../db/connection');

router.get("/", (req, res) => {
    res.send("Hello world!");
  });

router.get('/users', async (req, res) => {
    try {
      console.log("before routes");
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 module.exports = router;