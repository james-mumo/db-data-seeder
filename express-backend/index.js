import express from "express";
import mysql from "mysql";
import faker from "faker";
import dotenv from "dotenv"; // Import dotenv for loading environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

// Express route to seed fake data
app.get("/seed-data", (req, res) => {
  const fakeData = generateFakeData(10); // Adjust the number of fake records as needed

  const sql = "INSERT INTO your_table_name (column1, column2, ...) VALUES ?";
  const values = fakeData.map((record) => Object.values(record));

  connection.query(sql, [values], (error, results) => {
    if (error) throw error;
    res.json({ message: "Fake data seeded successfully" });
  });
});

// Helper function to generate fake data
function generateFakeData(count) {
  const fakeData = [];
  for (let i = 0; i < count; i++) {
    fakeData.push({
      column1: faker.name.firstName(),
      column2: faker.name.lastName(),
      // Add more columns and faker methods as needed
    });
  }
  return fakeData;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
