const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let numbers = [];

// Create a number
app.post('/numbers', (req, res) => {
  const { number } = req.body;
  if (!number || typeof number !== 'number') {
    return res.status(400).json({ error: 'Invalid number format' });
  }

  numbers.push(number);
  res.status(201).json({ message: 'Number added successfully' });
});

// Get all numbers
app.get('/numbers', (req, res) => {
  res.json(numbers);
});

// Update a number
app.put('/numbers/:id', (req, res) => {
  const { id } = req.params;
  const { number } = req.body;
  if (!number || typeof number !== 'number') {
    return res.status(400).json({ error: 'Invalid number format' });
  }

  if (numbers[id]) {
    numbers[id] = number;
    res.json({ message: 'Number updated successfully' });
  } else {
    res.status(404).json({ error: 'Number not found' });
  }
});

// Delete a number
app.delete('/numbers/:id', (req, res) => {
  const { id } = req.params;

  if (numbers[id]) {
    numbers = numbers.filter((_, index) => index !== parseInt(id));
    res.json({ message: 'Number deleted successfully' });
  } else {
    res.status(404).json({ error: 'Number not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
