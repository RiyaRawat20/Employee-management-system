import React, { useEffect, useState } from "react";
import "./App.css";
import { getEmployees, addEmployee, deleteEmployee } from "./api";


function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(form);
    setForm({ name: "", email: "", department: "", salary: "" });
    loadEmployees();
  };

  return (
    <div className="container">
      <h1 className="title">Employee Management System</h1>

      {/* ADD EMPLOYEE */}
      <div className="card">
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            required
          />

          <button type="submit" className="add-btn">
            Add Employee
          </button>
        </form>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="card">
        <h2>Employee List</h2>

        <table className="emp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      deleteEmployee(emp.id);
                      loadEmployees();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
