const express = require("express");
const mysql = require("mysql");
const faker = require("faker");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure MySQL connection
const connection = mysql.createConnection({
  host: "your-mysql-host",
  user: "your-mysql-username",
  password: "your-mysql-password",
  database: "your-database-name",
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
