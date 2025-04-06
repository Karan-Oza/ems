import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { GetAllEmployees } from "../api";
import "../App.css";

const EmployeeManagementApp = () => {
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeeData(data);
      console.log(data);
    } catch (err) {
      // alert("Error", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 employee-app-wrapper">
      <h1>Employee Management App</h1>

      <div className="w-100 d-flex justify-content-center">
        <div
          className="w-100 w-md-75 border bg-light p-3 rounded shadow-sm"
          style={{ maxWidth: "900px" }}
        >
          <div className="d-flex justify-content-between mb-3 employee-header-controls">
            <button className="btn btn-primary">Add Employee</button>
            <input
              type="text"
              placeholder="Search Employees..."
              className="form-control width-adjust mx-auto my-auto "
            />
          </div>

          {/* Wrap table inside responsive scrollable div */}
          <div className="table-responsive-wrapper">
            <EmployeeTable
            fetchEmployees={fetchEmployees}
            employees = {employeeData.employees}
            pagination = {employeeData.pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementApp;
