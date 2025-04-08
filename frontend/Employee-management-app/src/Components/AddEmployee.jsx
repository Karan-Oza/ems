import React, { useEffect, useState } from "react";
import { CreateEmployee, updateEmployee } from "../api";
import { notify } from "../utilis";

const AddEmployee = ({
  showModal,
  setShowModal,
  fetchEmployees,
  updateEmpObj,
  setUpdateEmpObj,
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
  });

  const [updateMode, setupdateMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setupdateMode(false);
    setUpdateEmpObj(null);
    resetEmployeeStates();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({
      ...employee,
      profileImage: e.target.files[0],
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { success, message } = updateMode
        ? await updateEmployee(employee, employee._id)
        : await CreateEmployee(employee);

      setTimeout(() => {
        setLoading(false);
        notify(message, success ? "success" : "error");
        if (success) {
          setShowModal(false);
          resetEmployeeStates();
          fetchEmployees();
        }
      }, 500);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(false);
        notify("Failed to create Employee", "error");
      }, 500);
    }
  };

  useEffect(() => {
    if (updateEmpObj) {
      setupdateMode(true);
      setEmployee(updateEmpObj);
    }
  }, [updateEmpObj]);

  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {updateMode ? "Update Employee" : "Add Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddEmployee}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {updateMode ? "Updating..." : "Saving..."}
                  </>
                ) : updateMode ? (
                  "Update Employee"
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
