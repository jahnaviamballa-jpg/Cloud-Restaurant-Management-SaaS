import { useEffect, useState } from "react";
import { getInventory, createInventory } from "../api/inventoryApi";
import InventoryTable from "../components/InventoryTable";
import LowStockAlert from "../components/LowStockAlert";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    restaurant_id: 1,
    item_name: "",
    category: "",
    quantity: "",
    unit: "",
    minimum_stock: "",
    supplier_name: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleAddInventory = async () => {
    try {
      await createInventory(newItem);

      const data = await getInventory();
      setItems(data);

      setNewItem({
        restaurant_id: 1,
        item_name: "",
        category: "",
        quantity: "",
        unit: "",
        minimum_stock: "",
        supplier_name: "",
      });

      alert("Inventory Added Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Inventory");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  const lowStock = items.find(
    (item) => item.quantity <= item.minimum_stock
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Inventory</h1>

      <div className="inventory-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.item_name}
          onChange={(e) =>
            setNewItem({ ...newItem, item_name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) =>
            setNewItem({ ...newItem, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Unit"
          value={newItem.unit}
          onChange={(e) =>
            setNewItem({ ...newItem, unit: e.target.value })
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

      <InventoryTable items={items} />
    </div>
  );
}

export default Inventory;