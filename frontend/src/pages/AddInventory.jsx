import { useState } from "react";
import { createInventory } from "../api/inventoryApi";

function AddInventory() {
  const [form, setForm] = useState({
    item_name: "",
    category: "",
    quantity: "",
    unit: "",
    minimum_stock: "",
    supplier_name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createInventory(form);
      alert("Inventory Added Successfully");

      setForm({
        item_name: "",
        category: "",
        quantity: "",
        unit: "",
        minimum_stock: "",
        supplier_name: "",
      });
    } catch (err) {
      alert("Failed to Add Inventory");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Inventory</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "400px",
        }}
      >
        <input
          name="item_name"
          placeholder="Item Name"
          value={form.item_name}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <input
          name="unit"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
        />

        <input
          name="minimum_stock"
          type="number"
          placeholder="Minimum Stock"
          value={form.minimum_stock}
          onChange={handleChange}
        />

        <input
          name="supplier_name"
          placeholder="Supplier Name"
          value={form.supplier_name}
          onChange={handleChange}
        />

        <button type="submit">
          Save Inventory
        </button>
      </form>
    </div>
  );
}

export default AddInventory;