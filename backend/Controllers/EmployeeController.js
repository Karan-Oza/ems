const EmployeeModel = require("../Models/EmployeeModel");
const createEmployee = async (req, res) => {
  try {
    const body = req.body;
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

module.exports = createEmployee;
