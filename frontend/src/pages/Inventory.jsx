import { useEffect, useState } from "react";
import {
  getInventory,
  createInventory,
  deleteInventory,
} from "../api/inventoryApi";
import InventoryTable from "../components/InventoryTable";
import LowStockAlert from "../components/LowStockAlert";
import Layout from "../components/Layout";
function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
  restaurant_id: "",
    item_name: "",
    category: "",
    quantity: "",
    unit: "",
    minimum_stock: "",
    supplier_name: "",
  });

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getInventory();

      console.log("Inventory API Response:", data);

      const inventoryItems = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.inventory)
        ? data.inventory
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setItems(inventoryItems);
    } catch (err) {
      console.error("Inventory Error:", err);
      setItems([]);
      setError("Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleDeleteInventory = async (id) => {
  const ok = window.confirm(
    "Are you sure you want to delete this inventory item?"
  );

  if (!ok) return;

  try {
    await deleteInventory(id);

    alert("Inventory deleted successfully.");

    await loadInventory();
  } catch (error) {
    console.error(error);

    alert("Delete failed.");
  }
};
const handleAddInventory = async () => {
  try {
    const inventoryData = {
      ...newItem,
      restaurant_id: undefined,
      quantity: Number(newItem.quantity),
      minimum_stock: Number(newItem.minimum_stock),
    };

    await createInventory(inventoryData);

    await loadInventory();

    setNewItem({
      restaurant_id: "",
      item_name: "",
      category: "",
      quantity: "",
      unit: "",
      minimum_stock: "",
      supplier_name: "",
    });

    alert("Inventory Added Successfully!");
  } catch (error) {
    console.error("Add Inventory Error:", error);
    alert("Failed to Add Inventory");
  }
};
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (error) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>
        {error}
      </h2>
    );
  }

  const lowStock = items.find(
    (item) =>
      Number(item.quantity) <= Number(item.minimum_stock)
  );

 return (
  <Layout>
    <div
  style={{
    padding: "20px",
  }}
>
    <div
      style={{
        background: "rgba(18,18,24,.75)",
        borderRadius: "25px",
        padding: "35px",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h1
  style={{
    color: "white",
    fontSize: "42px",
    marginBottom: "10px",
  }}
>
  📦 Inventory Management
</h1>

<p
  style={{
    color: "#CFCFD5",
    marginBottom: "30px",
    fontSize: "18px",
  }}
>
  Manage stock, suppliers and inventory items.
</p>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  }}
>
  <div style={cardStyle}>
    <h3>Total Items</h3>
    <h1>{items.length}</h1>
  </div>

  <div style={cardStyle}>
    <h3>Low Stock</h3>
    <h1>
      {
        items.filter(
          (i) =>
            Number(i.quantity) <= Number(i.minimum_stock)
        ).length
      }
    </h1>
  </div>

  <div style={cardStyle}>
    <h3>Suppliers</h3>
    <h1>
      {
        new Set(
          items.map((i) => i.supplier_name)
        ).size
      }
    </h1>
  </div>

  <div style={cardStyle}>
    <h3>Categories</h3>
    <h1>
      {
        new Set(
          items.map((i) => i.category)
        ).size
      }
    </h1>
  </div>
</div>

      <div className="inventory-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.item_name}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              item_name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              quantity: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Unit"
          value={newItem.unit}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              unit: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Minimum Stock"
          value={newItem.minimum_stock}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              minimum_stock: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Supplier"
          value={newItem.supplier_name}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              supplier_name: e.target.value,
            })
          }
        />

        <button onClick={handleAddInventory}>
          Add Inventory
        </button>
      </div>

      <LowStockAlert
        item={lowStock ? lowStock.item_name : null}
      />

      <InventoryTable
  items={items}
  onDelete={handleDeleteInventory}
/>
    </div>
  </div>
  </Layout>
  );
}
const cardStyle = {
  background: "rgba(20,20,28,.92)",
  borderRadius: "18px",
  padding: "22px",
  border: "1px solid rgba(255,255,255,.08)",
  textAlign: "center",
  color: "white",
};
export default Inventory;