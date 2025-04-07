const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // MySQL Host (e.g., localhost)
  user: process.env.DB_USER,      // MySQL User
  password: process.env.DB_PASS,  // MySQL Password
  database: process.env.DB_NAME,  // MySQL Database Name
  port: process.env.DB_PORT || 3306 // Default MySQL Port
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');

  // SQL Query to Create Table
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

  // Execute Table Creation Query
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Error creating table:', err);
    } else {
      console.log('✅ Table "users" is ready');
    }
  });
});

// Export Database Connection
module.exports = db;
