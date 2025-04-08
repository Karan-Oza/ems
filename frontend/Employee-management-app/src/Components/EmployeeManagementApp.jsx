import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { CreateEmployee, DeleteEmployee, GetAllEmployees } from "../api";
import "../App.css";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { notify } from "../utilis";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
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
    // console.log("fetchEmployees");

    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeeData(data);
      console.log(data);
    } catch (err) {
      // alert("Error", err);
    }
  };

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleupdateEmployee = (empObj) => {
    console.log("Click ", empObj);
    setShowModal(true);
    setUpdateEmpObj(empObj);
  };

  const handledeleteEmployee = async (id) => {
    try {
      const { success, message } = await DeleteEmployee(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchEmployees();
    } catch (err) {
      console.error(err);
      notify("Failed to delete Employee", "error");
    }
  };

  const handleSearch = (e)=>{
    const term = e.target.value;
    fetchEmployees(term)
  }

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
            <button className="btn btn-primary" onClick={handleAddEmployee}>
              Add Employee
            </button>
            <input
              type="text"
              placeholder="Search Employees..."
              className="form-control width-adjust mx-auto my-auto "
              onChange={handleSearch}
            />
          </div>

          {/* Wrap table inside responsive scrollable div */}
          <div className="table-responsive-wrapper">
            <EmployeeTable
              fetchEmployees={fetchEmployees}
              employees={employeeData.employees}
              pagination={employeeData.pagination}
              handleupdateEmployee={handleupdateEmployee}
              handledeleteEmployee={handledeleteEmployee}
            />
          </div>

          <AddEmployee
            updateEmpObj={updateEmpObj}
            fetchEmployees={fetchEmployees}
            showModal={showModal}
            setShowModal={setShowModal}
            setUpdateEmpObj={setUpdateEmpObj}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
