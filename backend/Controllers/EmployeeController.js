const EmployeeModel = require("../Models/EmployeeModel");


const createEmployee = async (req, res) => {
  try {
    const body = req.body;


    console.log("Request body: ", req.body); // Log body to ensure data is received
    console.log("Uploaded file: ", req.file); // Log file data to ensure image upload

    
    const profileImage = req?.file ? req?.file?.path : null;
    body.profileImage = profileImage;
    const emp = new EmployeeModel(body);

    await emp.save();
    res.status(201).json({
      message: "Employee Created",
      success: true,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};


const getAllEmployees = async (req, res) => {
  try {
   
    const emps = await EmployeeModel.find({});

    res.status(201).json({
      message: "All Employees",
      success: true,
      data : emps
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};



const getAllEmployeeById = async (req, res) => {
  try {

    const {id} = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });  

    res.status(201).json({
      message: "Employee details",
      success: true,
      data : emp
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// delete emp by id
const deleteEmployeeById = async (req, res) => {
  try {

    const {id} = req.params;
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });  

    res.status(201).json({
      message: "Employee deleted",
      success: true,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// update emp by id
const createEmployee = async (req, res) => {
  try {
    const body = req.body;


    console.log("Request body: ", req.body); // Log body to ensure data is received
    console.log("Uploaded file: ", req.file); // Log file data to ensure image upload

    
    const profileImage = req?.file ? req?.file?.path : null;
    body.profileImage = profileImage;
    const emp = new EmployeeModel(body);

    await emp.save();
    res.status(201).json({
      message: "Employee Created",
      success: true,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};


module.exports = {createEmployee , getAllEmployees , getAllEmployeeById , deleteEmployeeById};
