import express from "express";
import mysql from "mysql2";
import { faker } from "@faker-js/faker";

const router = express.Router();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mumo98",
  database: "demo",
});

database.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

router.post("/seeddata/:tableName", (req, res) => {
  const { tableName } = req.params;
  const { columns, numRows } = req.body;

  if (!tableName || !columns || !numRows) {
    return res.status(400).json({
      error: "Table name, columns, and numRows are required in the request",
    });
  }

  createTable(tableName, columns)
    .then(() => {
      const fakeData = generateFakeData(columns, numRows);

      const columnNames = columns.map((column) => column.name).join(", ");
      const values = fakeData.map((row) => `(${row.join(", ")})`).join(", ");

      const sql = `INSERT INTO ${tableName} (${columnNames}) VALUES ${values}`;

      database.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log(result);
        res.json({
          message: `Fake data seeded successfully into ${tableName}`,
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/// ... (other imports)
function createTable(tableName, columns) {
  return new Promise((resolve, reject) => {
    const columnDefinitions = columns
      .map((column) => {
        if (column.name && column.type) {
          // Specify a default length of 255 for VARCHAR if not provided
          const length = column.length || 255;
          return `${column.name} ${column.type}(${length})`;
        } else {
          throw new Error("Column name and type are required");
        }
      })
      .join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;

    database.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(result);
        resolve();
      }
    });
  });
}
// ... (other imports)

function generateFakeData(columns, numRows) {
  const fakeData = [];
  for (let i = 0; i < numRows; i++) {
    const row = columns.map((column) => {
      // Use faker functions to generate fake data based on the provided type
      return typeof faker[column.type] === "function"
        ? faker[column.type]()
        : null;
    });
    fakeData.push(row);
  }
  return fakeData;
}

// ... (other code)

export default router;
