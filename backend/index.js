require("dotenv").config(); // Load .env file
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("./Models/db");

const EmployeeRouter = require("./Routes/EmployeeRoutes");

// ✅ Apply CORS before other middleware or routes
app.use(cors({
  origin: 'https://darling-monstera-1a9b86.netlify.app',
  credentials: true,
}));

// ✅ Middleware setup
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/employee", EmployeeRouter);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
