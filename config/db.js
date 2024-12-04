const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;


// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// const fs = require('fs');

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST, // Remote database host
//   user: process.env.DB_USER, // Remote database username
//   password: process.env.DB_PASSWORD, // Remote database password
//   database: process.env.DB_NAME, // Remote database name
//   port: process.env.DB_PORT || 3306, // MySQL port
//   ssl: process.env.DB_SSL === 'true' ? {
//     rejectUnauthorized: true,
//     ca: fs.readFileSync('./ca.pem'), // Optional, if CA certificate is required
//   } : false,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = pool;

