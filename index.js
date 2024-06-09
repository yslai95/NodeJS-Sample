// index.js
const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js SQL API');
});

// Example route to get data from the database
app.get('/api/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Example route to add data to the database
app.post('/api/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
