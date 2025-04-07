import React, { useEffect, useState } from "react";
import { CreateEmployee } from "../api";
import { notify } from "../utilis";

const AddEmployee = ({ showModal, setShowModal, fetchEmployees }) => {
  const handleModalClose = () => {
    setShowModal(false);
  };

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
  });

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
    });
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
    console.log(employee);

    try {
      const { success, message } = await CreateEmployee(employee);
      console.log(success, message);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
    } catch (error) {
      console.log(error);
      notify("Failed to create Employee", "error");
    }
  };

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
            <h5 className="modal-title">Add employee</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleModalClose()}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleAddEmployee(e)}>
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
