import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Layout from "../components/Layout";

import { getRestaurantId } from "../utils/restaurant";

import {
  getMenuByRestaurant,
  deleteMenuItem,
} from "../api/menuApi";

function Menu() {
  const navigate = useNavigate();

  // =====================================
  // Current User
  // =====================================

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = (user.role || "").toLowerCase();

  const isCustomer = role === "customer";

  const canManageMenu =
    role === "manager" || role === "owner";

  // =====================================
  // States
  // =====================================

  const [menuItems, setMenuItems] = useState([]);

  const [filteredItems, setFilteredItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [category, setCategory] =
    useState("All");

  // =====================================
  // Statistics
  // =====================================

  const totalItems = menuItems.length;

  const availableItems =
    menuItems.filter(
      (item) => item.is_available
    ).length;

  const vegItems =
    menuItems.filter(
      (item) => item.is_veg
    ).length;

  const nonVegItems =
    menuItems.filter(
      (item) => !item.is_veg
    ).length;

  const averagePrice =
    totalItems > 0
      ? (
          menuItems.reduce(
            (sum, item) =>
              sum + Number(item.price),
            0
          ) / totalItems
        ).toFixed(0)
      : 0;

  // =====================================
  // Load Menu
  // =====================================

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

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    const restaurantId =
      getRestaurantId();

    if (!restaurantId) {
      alert(
        "Please select a restaurant first."
      );
      navigate("/restaurants");
      return;
    }

    loadMenu();
  }, []);

  // =====================================
  // Delete Menu Item
  // =====================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this menu item?"
      )
    )
      return;

    try {
      await deleteMenuItem(id);

      alert("Menu Item Deleted");

      loadMenu();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  // =====================================
  // Add To Cart
  // =====================================

  const handleAddToCart = (item) => {
    let cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existing = cart.find(
      (food) => food.id === item.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(`${item.name} added to cart.`);
  };

  // =====================================
  // Categories
  // =====================================

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

  // =====================================
  // Topbar Global Search
  // =====================================

  useEffect(() => {
    const handleSearch = (e) => {
      const keyword = (
        e.detail || ""
      )
        .trim()
        .toLowerCase();

      let data = [...menuItems];

      if (category !== "All") {
        data = data.filter(
          (item) =>
            item.category === category
        );
      }

      if (keyword !== "") {
        data = data.filter((item) => {
          return (
            (item.name || "")
              .toLowerCase()
              .includes(keyword) ||
            (item.category || "")
              .toLowerCase()
              .includes(keyword) ||
            (item.description || "")
              .toLowerCase()
              .includes(keyword)
          );
        });
      }

      setFilteredItems(data);
    };

    window.addEventListener(
      "globalSearch",
      handleSearch
    );

    return () =>
      window.removeEventListener(
        "globalSearch",
        handleSearch
      );
  }, [menuItems, category]);

  // =====================================
  // Category Filter
  // =====================================

  useEffect(() => {
    let data = [...menuItems];

    if (category !== "All") {
      data = data.filter(
        (item) =>
          item.category === category
      );
    }

    setFilteredItems(data);
  }, [category, menuItems]);

  // =====================================
  // Loading
  // =====================================

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
    <Layout>
      <div style={{ padding: "20px" }}>
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
          {/* HEADER */}

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
                {isCustomer
                  ? "Browse delicious food and add items to your cart."
                  : "Manage all menu items from one place."}
              </p>
            </div>

            {canManageMenu && (
              <button
                onClick={() =>
                  navigate(
                    "/add-menu-item"
                  )
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
                }}
              >
                ➕ Add Menu Item
              </button>
            )}
          </div>
                    {/* ===================================== */}
          {/* Dashboard Cards */}
          {/* ===================================== */}

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
              <h3>🍽 Total Items</h3>
              <h1>{totalItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>✅ Available</h3>
              <h1>{availableItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>🥗 Veg Items</h3>
              <h1>{vegItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>🍗 Non-Veg Items</h3>
              <h1>{nonVegItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>💰 Average Price</h3>
              <h1>₹{averagePrice}</h1>
            </div>
          </div>

          {/* ===================================== */}
          {/* Category Filter */}
          {/* ===================================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 220px",
              gap: "20px",
              marginBottom: "35px",
            }}
          >
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

          {/* ===================================== */}
          {/* Menu Grid */}
          {/* ===================================== */}

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
                  transition: "0.3s",
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
                      minHeight: "45px",
                    }}
                  >
                    {item.description ||
                      "Delicious food prepared with fresh ingredients."}
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
    flexWrap: "wrap",
    marginTop: "15px",
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
    {item.is_veg ? "🥗 Veg" : "🍗 Non-Veg"}
  </span>

  <span
    style={{
      padding: "8px 14px",
      borderRadius: "20px",
      background: item.is_available
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
                    {isCustomer ? (
                      <button
                        onClick={() =>
                          handleAddToCart(item)
                        }
                        style={{
                          width: "100%",
                          padding: "13px",
                          border: "none",
                          borderRadius: "12px",
                          background:
                            "linear-gradient(90deg,#7C3AED,#F97316)",
                          color: "white",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "15px",
                        }}
                      >
                        🛒 Add to Cart
                      </button>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* ===================================== */}
            {/* Empty State */}
            {/* ===================================== */}

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
                  {isCustomer
                    ? "No menu items match your search."
                    : "No menu items found. Try another search or add a new menu item."}
                </p>

                {canManageMenu && (
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
                )}
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
  boxShadow: "0 8px 20px rgba(0,0,0,.25)",
};

export default Menu;