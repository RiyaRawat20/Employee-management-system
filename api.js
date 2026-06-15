const API_URL = "http://localhost:5000/employees";

export const getEmployees = () =>
  fetch(API_URL).then(res => res.json());

export const addEmployee = (employee) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  });

export const deleteEmployee = (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });
