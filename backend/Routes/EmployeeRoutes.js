const createEmployee = require("../Controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../Middlewares/FileUploader");

const routes = require("express").Router();

routes.get("/" , (req , res)=>{
   res.send("get all emp");
})


routes.post("/" , cloudinaryFileUploader.single('profileImage') ,  createEmployee )

module.exports = routes;