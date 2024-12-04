const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const setupDatabase = async () => {
  try {
    // Connect to MySQL server (without specifying a database initially)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("Connected to MySQL server.");

    // Check and create database if it doesn't exist
    const dbName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database "${dbName}" is ready.`);

    // Connect to the newly created database
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
    });

    console.log(`Connected to database "${dbName}".`);

    // Check and create `schools` table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT(10, 8) NOT NULL,
        longitude FLOAT(11, 8) NOT NULL
      );
    `;
    await db.execute(createTableQuery);
    console.log("Table 'schools' is ready.");

    // Close connections
    await connection.end();
    await db.end();
    console.log("Database setup completed.");
  } catch (error) {
    console.error("Error setting up database:", error.message);
    process.exit(1); // Exit process on failure
  }
};

module.exports = setupDatabase;
