import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMenuItem,
  updateMenuItem,
} from "../api/menuApi";

function EditMenuItem() {
  const navigate = useNavigate();
  const { menuId } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [menuItem, setMenuItem] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    image_url: "",
    is_available: true,
    is_veg: false,
  });

  useEffect(() => {
    loadMenuItem();
  }, []);

  const loadMenuItem = async () => {
    try {
      const data = await getMenuItem(menuId);

      setMenuItem({
        category: data.category || "",
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        image_url: data.image_url || "",
        is_available: data.is_available,
        is_veg: data.is_veg,
      });
    } catch (error) {
      console.error(error);

      alert("Unable to load menu item.");

      navigate("/menu");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setMenuItem({
      ...menuItem,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateMenuItem(menuId, {
        ...menuItem,
        price: Number(menuItem.price),
      });

      alert(
        "Menu Item Updated Successfully!"
      );

      navigate("/menu");
    } catch (error) {
      console.error(error);

      alert("Failed to update menu item.");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,.08)",
    background:
      "rgba(255,255,255,.08)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

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
          Loading Menu Item...
        </h2>
      </div>
    );
  }

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
          padding: "35px",
          borderRadius: "25px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          ✏️ Edit Menu Item
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            marginBottom: "35px",
          }}
        >
          Update menu item details.
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
                minHeight: "120px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
              }}
            >
              <input
                type="checkbox"
                name="is_veg"
                checked={menuItem.is_veg}
                onChange={handleChange}
              />

              <label>
                Vegetarian Item
              </label>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
              }}
            >
              <input
                type="checkbox"
                name="is_available"
                checked={menuItem.is_available}
                onChange={handleChange}
              />

              <label>
                Available
              </label>
            </div>
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
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(90deg,#7C3AED,#F97316)",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "Saving..."
                : "💾 Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#374151",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuItem;