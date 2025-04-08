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
    // Get page and limit from query parameters
    let { page, limit, search } = req.query;

    // Set default values if they are not provided
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Build the search criteria
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // case insensitive
        },
      };
    }
    // Get the total number of employees for pagination info
    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    // Fetch the employees with pagination
    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1, _id: -1 }); // ✅ Fix overlap issue

    if (emps.length === 0) {
      return res.status(404).json({
        message: "No employees found",
        success: false,
      });
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
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

const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await EmployeeModel.findOne({ _id: id });
    res.status(200).json({
      message: "Employee Details",
      success: true,
      data: emp,
    });
  } catch (err) {
    console.log(err);
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
    const { id } = req.params;
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
const updateEmployeeId = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    const { id } = req.params;

    let updateData = {
      name,
      email,
      phone,
      department,
      salary,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImg = req.file.path;
    }

    let updateEmployee = await EmployeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateEmployee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }

    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: updateEmployee,
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

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeId,
};
