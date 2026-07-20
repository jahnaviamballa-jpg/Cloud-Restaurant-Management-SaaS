import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenuItem } from "../api/menuApi";

function AddMenuItem() {
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    image_url: "",
    is_available: true,
    is_veg: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMenuItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createMenuItem({
        ...menuItem,
        price: Number(menuItem.price),
      });

      alert("Menu Item Added Successfully");

      navigate("/menu");
    } catch (error) {
      console.error(error);
      alert("Failed to add menu item.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          ➕ Add Menu Item
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Add a new food item to your restaurant menu.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            <input
              name="category"
              placeholder="Category"
              value={menuItem.category}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              name="name"
              placeholder="Food Name"
              value={menuItem.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={menuItem.price}
              onChange={handleChange}
              style={inputStyle}
              required
            />
                        <input
              name="image_url"
              placeholder="Image URL"
              value={menuItem.image_url}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={menuItem.description}
              onChange={handleChange}
              rows={5}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                resize: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "white",
              }}
            >
              <input
                type="checkbox"
                name="is_available"
                checked={menuItem.is_available}
                onChange={handleChange}
              />

              <label>Available</label>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "white",
              }}
            >
              <input
                type="checkbox"
                name="is_veg"
                checked={menuItem.is_veg}
                onChange={handleChange}
              />

              <label>Vegetarian</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "35px",
              padding: "16px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Saving..."
              : "Save Menu Item"}
          </button>
                  </form>
      </div>
    </div>
  );
}

export default AddMenuItem;