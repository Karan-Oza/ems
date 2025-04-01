import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
  // header of table (heading render)
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];

  // body of table (row render)
  const TableRow = (employee) => {
    return (
      <tr>
        <td>
          <Link
            to={`/employee/${employee.id}`}
            className="text-decoration-none"
          >
            {"karan"}
          </Link>
        </td>
        <td>{"karan@gmail.com"}</td>
        <td>{"9851593699"}</td>
        <td>{"IT"}</td>
        <td>
          <i
            className="bi bi-pencil-fill text-warning me-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
          ></i>
          <i
            className="bi bi-trash-fill text-danger"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete"
          ></i>
        </td>
      </tr>
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <TableRow />
      </tbody>
    </table>
  );
};

export default EmployeeTable;
