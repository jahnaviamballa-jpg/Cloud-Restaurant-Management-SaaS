import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../api/employeeApi";

function Employees() {
  const navigate = useNavigate();

  // ===========================
  // States
  // ===========================

  const [employees, setEmployees] =
    useState([]);

  const [filteredEmployees,
    setFilteredEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [roleFilter,
    setRoleFilter] =
    useState("All");

  const [newEmployee,
    setNewEmployee] =
    useState({
      restaurant_id: 1,
      employee_name: "",
      role: "",
      phone: "",
      email: "",
      salary: "",
      joining_date: "",
      status: "Active",
    });

  // ===========================
  // Load Employees
  // ===========================

  const loadEmployees =
    async () => {
      try {
        setLoading(true);

        const data =
          await getEmployees();

        setEmployees(data || []);
        setFilteredEmployees(
          data || []
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load employees."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadEmployees();
  }, []);
    // ===========================
  // Delete Employee
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      alert("Employee deleted successfully.");

      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  // ===========================
  // Add Employee
  // ===========================

  const handleAddEmployee = async () => {
    try {
      await createEmployee({
        ...newEmployee,
        salary: Number(newEmployee.salary),
      });

      alert("Employee added successfully.");

      setNewEmployee({
        restaurant_id: 1,
        employee_name: "",
        role: "",
        phone: "",
        email: "",
        salary: "",
        joining_date: "",
        status: "Active",
      });

      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed to add employee.");
    }
  };

  // ===========================
  // Employee Roles
  // ===========================

  const roles = useMemo(() => {
    const unique = [
      ...new Set(
        employees.map(
          (employee) => employee.role
        )
      ),
    ];

    return ["All", ...unique];
  }, [employees]);

  // ===========================
  // Search & Filter
  // ===========================

  useEffect(() => {
    let data = [...employees];

    if (roleFilter !== "All") {
      data = data.filter(
        (employee) =>
          employee.role === roleFilter
      );
    }

    if (search.trim() !== "") {
      data = data.filter((employee) =>
        employee.employee_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredEmployees(data);
  }, [
    employees,
    search,
    roleFilter,
  ]);

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111827",
        }}
      >
        <h2 style={{ color: "white" }}>
          Loading Employees...
        </h2>
      </div>
    );
  }
    return (
    <Layout>
      <div
  style={{
    padding: "20px",
  }}
>
        <div
          style={{
            background: "rgba(18,18,24,.80)",
            borderRadius: "25px",
            padding: "35px",
            backdropFilter: "blur(12px)",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          {/* ========================= */}
          {/* Header */}
          {/* ========================= */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "white",
                  fontSize: "42px",
                  marginBottom: "8px",
                }}
              >
                👨‍🍳 Employee Management
              </h1>

              <p
                style={{
                  color: "#D1D5DB",
                }}
              >
                Manage restaurant staff, roles,
                salaries and employee records.
              </p>
            </div>

            <button
              onClick={handleAddEmployee}
              style={{
                padding: "15px 28px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ➕ Add Employee
            </button>
          </div>

          {/* ========================= */}
          {/* Dashboard Cards */}
          {/* ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Employees</h3>
              <h1>{employees.length}</h1>
            </div>

            <div style={cardStyle}>
              <h3>Active Employees</h3>
              <h1>
                {
                  employees.filter(
                    (employee) =>
                      employee.status ===
                      "Active"
                  ).length
                }
              </h1>
            </div>

            <div style={cardStyle}>
              <h3>Managers</h3>
              <h1>
                {
                  employees.filter(
                    (employee) =>
                      employee.role ===
                      "Manager"
                  ).length
                }
              </h1>
            </div>

            <div style={cardStyle}>
              <h3>Monthly Payroll</h3>
              <h1>
                ₹
                {employees.reduce(
                  (total, employee) =>
                    total +
                    Number(
                      employee.salary || 0
                    ),
                  0
                )}
              </h1>
            </div>
          </div>

          {/* ========================= */}
          {/* Search & Filter */}
          {/* ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "2fr 1fr",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                background:
                  "rgba(255,255,255,.08)",
                color: "white",
                outline: "none",
                fontSize: "15px",
              }}
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              style={{
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid rgba(255,255,255,.08)",
                background:
                  "rgba(255,255,255,.08)",
                color: "white",
                outline: "none",
                fontSize: "15px",
              }}
            >
              {roles.map((role) => (
                <option
                  key={role}
                  value={role}
                  style={{
                    color: "black",
                  }}
                >
                  {role}
                </option>
              ))}
            </select>
          </div>
                    {/* ========================= */}
          {/* Employee Cards */}
          {/* ========================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(340px,1fr))",
              gap: "25px",
            }}
          >
            {filteredEmployees.map((employee) => (
              <div
                key={employee.employee_id}
                style={{
                  background: "rgba(20,20,28,.92)",
                  borderRadius: "20px",
                  padding: "22px",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,.25)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      margin: 0,
                    }}
                  >
                    👤 {employee.employee_name}
                  </h2>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background:
                        employee.status ===
                        "Active"
                          ? "#16A34A"
                          : "#DC2626",
                      color: "white",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    {employee.status}
                  </span>
                </div>

                <p style={{ color: "#D1D5DB" }}>
                  💼 <strong>Role:</strong>{" "}
                  {employee.role}
                </p>

                <p style={{ color: "#D1D5DB" }}>
                  📞 <strong>Phone:</strong>{" "}
                  {employee.phone}
                </p>

                <p style={{ color: "#D1D5DB" }}>
                  📧 <strong>Email:</strong>{" "}
                  {employee.email}
                </p>

                <p style={{ color: "#D1D5DB" }}>
                  💰 <strong>Salary:</strong> ₹
                  {employee.salary}
                </p>

                <p style={{ color: "#D1D5DB" }}>
                  📅 <strong>Joining Date:</strong>{" "}
                  {employee.joining_date}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "22px",
                  }}
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/edit-employee/${employee.employee_id}`
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563EB",
                      color: "white",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        employee.employee_id
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#DC2626",
                      color: "white",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
                      {/* ========================= */}
          {/* Empty State */}
          {/* ========================= */}

          {filteredEmployees.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                👨‍🍳 No Employees Found
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  marginBottom: "25px",
                }}
              >
                Try changing the search filter or add
                a new employee.
              </p>

              <button
                onClick={handleAddEmployee}
                style={{
                  padding: "14px 28px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,#7C3AED,#F97316)",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ➕ Add First Employee
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
}

const cardStyle = {
  background: "rgba(20,20,28,.92)",
  borderRadius: "18px",
  padding: "22px",
  textAlign: "center",
  color: "white",
  border: "1px solid rgba(255,255,255,.08)",
};

export default Employees;