require("dotenv").config(); // Load .env file
const express = require("express");
const app = express();
require('./Models/db')

const EmployeeRouter = require("./Routes/EmployeeRoutes");
const bodyParser = require("body-parser");


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(bodyParser.json());

app.use("/api/employee" , EmployeeRouter )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
