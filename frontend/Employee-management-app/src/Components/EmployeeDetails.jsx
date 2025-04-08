import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { notify } from "../utilis";
import { GetAllEmployeesById } from "../api";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const fetchEmployees = async (id) => {
    try {
      const { data } = await GetAllEmployeesById(id);
      setEmployee(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      notify("Failed to fetch Employee", "error");
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    fetchEmployees(id);
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`container py-5 ${darkMode ? "bg-dark text-white" : ""}`}>
      <div className="d-flex justify-content-end mb-3">
        <button
          className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className={`card shadow-lg border-0 rounded-4 ${darkMode ? "bg-secondary text-white" : ""}`}>
            <div className="card-header bg-transparent border-bottom-0 rounded-top-4 px-4 py-3">
              <h3 className="fw-semibold mb-0 text-white text-center">Employee Details</h3>
            </div>
            <div className="card-body p-4">
              <div className="row g-4 align-items-center">
                <div className="col-md-4 text-center">
                  <img
                    src={employee.profileImage}
                    alt={employee.name}
                    className="img-fluid rounded-circle border border-2"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      borderColor: "#0d6efd",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4 className="fw-bold">{employee.name}</h4>
                  <p className="mb-2"><strong>Email:</strong> {employee.email}</p>
                  <p className="mb-2"><strong>Phone:</strong> {employee.phone}</p>
                  <p className="mb-2"><strong>Department:</strong> {employee.department}</p>
                  <p className="mb-0"><strong>Salary:</strong> ₹{employee.salary}</p>
                </div>
              </div>

              <div className="mt-4 text-end">
                <button
                  className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-primary"}`}
                  onClick={() => navigate("/employee")}
                >
                  ← Back to Employees
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
