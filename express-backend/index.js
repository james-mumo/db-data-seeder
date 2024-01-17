import express from "express";
import getData from "./routes/getData.js";
import seedData from "./routes/seedData.js";
import cors from "cors"; // Import the cors middleware

const app = express();

app.use(express.json());
app.use(cors());

// Use the inventory router for the /api route
app.use("/api", getData);
app.use("/api", seedData);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
