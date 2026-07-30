import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { createEmployee } from "../api/employeeApi";
import { getRestaurantId } from "../utils/restaurant";

function AddEmployee() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [employee, setEmployee] = useState({
    restaurant_id: getRestaurantId(),
    employee_name: "",
    role: "",
    phone: "",
    email: "",
    salary: "",
    joining_date: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await createEmployee({
        ...employee,
        salary: Number(employee.salary),
      });

      alert("Employee added successfully!");

      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
          "Failed to add employee."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    outline: "none",
    fontSize: "15px",
  };

  return (
    <Layout>
      <div style={{ padding: "30px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "auto",
            background: "rgba(18,18,24,.80)",
            padding: "35px",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            👨‍🍳 Add Employee
          </h1>

          <p
            style={{
              color: "#D1D5DB",
              marginBottom: "30px",
            }}
          >
            Enter employee details.
          </p>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              <input
                type="text"
                name="employee_name"
                placeholder="Employee Name"
                value={employee.employee_name}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Role"
                value={employee.role}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={employee.phone}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={employee.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={employee.salary}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="date"
                name="joining_date"
                value={employee.joining_date}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option
                  value="Active"
                  style={{ color: "black" }}
                >
                  Active
                </option>

                <option
                  value="Inactive"
                  style={{ color: "black" }}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "35px",
              }}
            >
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  padding: "15px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7C3AED,#F97316)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {saving
                  ? "Saving..."
                  : "➕ Add Employee"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/employees")
                }
                style={{
                  flex: 1,
                  padding: "15px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#374151",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddEmployee;