import React, { useState } from "react";
import axios from "axios";

function SeedData() {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([]);
  const [columnInput, setColumnInput] = useState({ name: "", type: "" });
  const [numRows, setNumRows] = useState("6"); // Set default number of rows to 6
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getdata/${tableName}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/seeddata/${tableName}`,
        {
          columns: columns.map((column) => ({
            name: column.name,
            type: column.type,
          })),
          numRows: parseInt(numRows, 10),
        }
      );
      fetchData(); // Refresh data after seeding
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  const addColumn = () => {
    if (columnInput.name && columnInput.type) {
      setColumns([
        ...columns,
        { name: columnInput.name, type: columnInput.type },
      ]);
      setColumnInput({ name: "", type: "" });
    }
  };

  const dataTypes = [
    "INT",
    "VARCHAR",
    "TEXT",
    "DATE",
    // Add more data types as needed
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded">
      <h1 className="text-3xl font-bold mb-4">React Frontend</h1>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Table Name:</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Columns:</label>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2"
            value={columnInput.name}
            onChange={(e) =>
              setColumnInput({ ...columnInput, name: e.target.value })
            }
          />
          <select
            className="border p-2 mr-2"
            value={columnInput.type}
            onChange={(e) =>
              setColumnInput({ ...columnInput, type: e.target.value })
            }
          >
            {dataTypes.map((dataType) => (
              <option key={dataType} value={dataType}>
                {dataType}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={addColumn}
          >
            Add Column
          </button>
        </div>
        <ul className="list-disc pl-6 mt-2">
          {columns.map((column, index) => (
            <li key={index} className="text-sm">
              {column.name} ({column.type})
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Number of Rows:
        </label>
        <input
          type="text"
          className="border p-2 w-full"
          value={numRows}
          onChange={(e) => setNumRows(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={seedData}
        >
          Seed Data
        </button>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={fetchData}
        >
          Fetch Data
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Data</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default SeedData;
