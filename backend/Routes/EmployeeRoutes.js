const {createEmployee , getAllEmployees, getAllEmployeeById, deleteEmployeeById} = require("../Controllers/EmployeeController");
const { cloudinaryFileUploader } = require("../Middlewares/FileUploader");

const routes = require("express").Router();

// get all emp
routes.get("/" , getAllEmployees)

// create emp in db post req
routes.post("/", cloudinaryFileUploader.single('profileImage'), createEmployee);

// update emp by id
routes.post("/", cloudinaryFileUploader.single('profileImage'), );

// get emp by id (update)
routes.post("/:id" , getAllEmployeeById )

// delete emp by id
routes.delete("/:id" , deleteEmployeeById )


module.exports = routes;