import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMenuByRestaurant,
  deleteMenuItem,
} from "../api/menuApi";

function Menu() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const loadMenu = async () => {
    try {
      setLoading(true);

      const data =
        await getMenuByRestaurant();

      setMenuItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error(error);

      alert("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenuItem(id);

      alert("Menu Item Deleted");

      loadMenu();
    } catch (error) {
      console.error(error);

      alert("Delete failed.");
    }
  };

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        menuItems.map(
          (item) => item.category
        )
      ),
    ];

    return ["All", ...unique];
  }, [menuItems]);

  useEffect(() => {
    let data = [...menuItems];

    if (category !== "All") {
      data = data.filter(
        (item) =>
          item.category === category
      );
    }

    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }

    setFilteredItems(data);
  }, [menuItems, search, category]);

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
          Loading Menu...
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
          background:
            "rgba(18,18,24,.78)",
          borderRadius: "25px",
          padding: "35px",
          border:
            "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
                <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
                fontSize: "40px",
                marginBottom: "8px",
              }}
            >
              🍽️ Restaurant Menu
            </h1>

            <p
              style={{
                color: "#CFCFD5",
              }}
            >
              Manage all menu items from one place.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/add-menu-item")
            }
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
            ➕ Add Menu Item
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 220px",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search menu item..."
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
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
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
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                style={{
                  color: "black",
                }}
              >
                {cat}
              </option>
            ))}
          </select>

          <div
            style={{
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            {filteredItems.length} Items
          </div>
        </div>

       <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  }}
>
  {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(20,20,28,.92)",
                borderRadius: "20px",
                overflow: "hidden",
                border:
                  "1px solid rgba(255,255,255,.08)",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
            >
              <img
                src={
                  item.image_url ||
                  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                }
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h2>

                  <span
                    style={{
                      color: "#FACC15",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    ₹{item.price}
                  </span>
                </div>

                <p
                  style={{
                    color: "#BDBDBD",
                    marginTop: "10px",
                  }}
                >
                  {item.description}
                </p>

                <p
                  style={{
                    color: "#9CA3AF",
                    marginTop: "10px",
                  }}
                >
                  📂 {item.category}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      background: item.is_veg
                        ? "#16A34A"
                        : "#DC2626",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {item.is_veg
                      ? "🥗 Veg"
                      : "🍗 Non-Veg"}
                  </span>

                  <span
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      background:
                        item.is_available
                          ? "#2563EB"
                          : "#6B7280",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {item.is_available
                      ? "✅ Available"
                      : "❌ Unavailable"}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() =>
                      navigate(
                        `/edit-menu/${item.id}`
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
                      handleDelete(item.id)
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
            </div>
          ))}
                    {filteredItems.length === 0 && (
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
                🍽️ No Menu Items Found
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  marginBottom: "25px",
                }}
              >
                Try changing the search/filter or add a new menu item.
              </p>

              <button
                onClick={() =>
                  navigate("/add-menu-item")
                }
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
                ➕ Add First Menu Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;