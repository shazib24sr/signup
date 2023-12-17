const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net', // Update the host
  user: 'sql12670999', // Update the username
  password: 'rEYDlwaeNa', // Update the password
  database: 'sql12670999', // Update the database name
  port: 3306, // Update the port if necessary (default MySQL port is 3306)
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        // Registration successful
        res.status(200).json({ success: true, message: 'User registered successfully' });
      }
    });
  });
  

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, error: 'User not found' });
        } else {
          const user = results[0];
          if (user.password === password) {
            res.status(200).json({ success: true, message: 'Login successful', userData: user });
          } else {
            res.status(401).json({ success: false, error: 'Incorrect password' });
          }
        }
      }
    });
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
