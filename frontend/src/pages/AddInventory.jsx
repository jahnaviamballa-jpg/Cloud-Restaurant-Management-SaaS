import { useState } from "react";
import { createInventory } from "../api/inventoryApi";
import Layout from "../components/Layout";

function AddInventory() {
  const [form, setForm] = useState({
    item_name: "",
    category: "",
    quantity: "",
    unit: "",
    minimum_stock: "",
    supplier_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createInventory(form);

      alert("✅ Inventory Added Successfully");

      setForm({
        item_name: "",
        category: "",
        quantity: "",
        unit: "",
        minimum_stock: "",
        supplier_name: "",
      });
    } catch (err) {
      alert("❌ Failed to Add Inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            background: "rgba(18,18,24,.82)",
            backdropFilter: "blur(14px)",
            borderRadius: "24px",
            padding: "35px",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 12px 35px rgba(0,0,0,.35)",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            📦 Add Inventory
          </h1>

          <p
            style={{
              color: "#CFCFD5",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Add a new inventory item to your restaurant.
          </p>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              <input
                name="item_name"
                placeholder="Item Name"
                value={form.item_name}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                name="unit"
                placeholder="Unit (Kg, Litre, Pieces...)"
                value={form.unit}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                type="number"
                name="minimum_stock"
                placeholder="Minimum Stock"
                value={form.minimum_stock}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                name="supplier_name"
                placeholder="Supplier Name"
                value={form.supplier_name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "30px",
              }}
            >
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "16px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg,#2563EB,#1D4ED8)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "0.3s",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                {loading
                  ? "Saving..."
                  : "💾 Save Inventory"}
              </button>

              <button
                type="reset"
                onClick={() =>
                  setForm({
                    item_name: "",
                    category: "",
                    quantity: "",
                    unit: "",
                    minimum_stock: "",
                    supplier_name: "",
                  })
                }
                style={{
                  flex: 1,
                  padding: "16px",
                  border: "none",
                  borderRadius: "14px",
                  background: "#374151",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ❌ Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddInventory;