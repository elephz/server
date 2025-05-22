const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  
  res.send('Hello World!');
});

router.post('/users', (req, res) => {
  
  res.send('Hello World!');
});

router.put('/users/:id', (req, res) => {
  
  res.send('Hello World!');
});

router.delete('/users/:id', (req, res) => {
  
  res.send('Hello World!');
});


module.exports = router;