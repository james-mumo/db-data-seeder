import express from "express";
import mysql from "mysql2";

const router = express.Router();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mumo98",
  database: "mysql",
});

database.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

router.get("/getdata/:tableName", (req, res) => {
  const { tableName } = req.params;

  if (!tableName) {
    return res
      .status(400)
      .json({ error: "Table name is required in the URL parameters" });
  }

  const sql = `SELECT * FROM ${tableName}`;

  database.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(result);
    res.json(result); // Sending the result as JSON
  });
});

export default router;
