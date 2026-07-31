import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import "../styles/dashboard.css";

import {
  getRestaurant,
  getRestaurantId,
} from "../utils/restaurant";

import {
  getMenuByRestaurant,
  deleteMenuItem,
} from "../api/menuApi";

import {
  getRecommendations,
} from "../api/orderApi";

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
    role === "owner" || role === "manager";

  // =====================================
  // Current Restaurant
  // =====================================

  const restaurant = getRestaurant();

  const restaurantId = getRestaurantId();

  // =====================================
  // States
  // =====================================

  const [menuItems, setMenuItems] =
    useState([]);

  const [filteredItems, setFilteredItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [category, setCategory] =
    useState("All");
  const [
  recommendations,
  setRecommendations,
] = useState([]);
useEffect(() => {
    console.log("Recommendations State:", recommendations);
}, [recommendations]);
  const [cart, setCart] = useState(() => {
    if (!restaurantId) return [];

    return (
      JSON.parse(
        localStorage.getItem(
          `cart_${restaurantId}`
        )
      ) || []
    );
  });

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
    totalItems === 0
      ? 0
      : (
          menuItems.reduce(
            (sum, item) =>
              sum + Number(item.price),
            0
          ) / totalItems
        ).toFixed(0);

  // =====================================
  // Load Menu
  // =====================================

  const loadMenu = async () => {
    try {
      setLoading(true);

      const data =
        await getMenuByRestaurant();

      const menu = Array.isArray(data)
        ? data
        : [];

      setMenuItems(menu);
      setFilteredItems(menu);
    } catch (error) {
      console.error(error);
      alert("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Delete Menu
  // =====================================

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this menu item?"
    );

    if (!ok) return;

    try {
      await deleteMenuItem(id);

      alert(
        "Menu item deleted successfully."
      );

      loadMenu();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Delete failed."
      );
    }
  };

  // =====================================
  // Add To Cart
  // =====================================

  const handleAddToCart = (item) => {
    const key = `cart_${restaurantId}`;

    let currentCart =
      JSON.parse(
        localStorage.getItem(key)
      ) || [];

    const existing =
      currentCart.find(
        (food) => food.id === item.id
      );

    if (existing) {
      existing.quantity += 1;
    } else {
      currentCart.push({
        ...item,
        quantity: 1,
        restaurant_id: restaurantId,
      });
    }

    localStorage.setItem(
      key,
      JSON.stringify(currentCart)
    );

    setCart([...currentCart]);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =====================================
  // Cart Helper
  // =====================================

  const getCartItem = (id) => {
    return cart.find(
      (item) => item.id === id
    );
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
  // Initial Load
  // =====================================

  useEffect(() => {
  if (!restaurantId) {
    alert("Please select a restaurant.");

    navigate(
      "/restaurant-selection"
    );

    return;
  }

  loadMenu();

  if (isCustomer) {
    loadRecommendations();
    console.log(
  "Recommendations Loaded"
);
  }
}, []);

   // =====================================
// Load AI Recommendations
// =====================================

const loadRecommendations = async () => {
  try {
    if (!user.id) return;

    const data = await getRecommendations(user.id);

    console.log("Recommendation Response");
    console.log(data);

    if (Array.isArray(data)) {
      console.table(data);
    }

    setRecommendations(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    setRecommendations([]);
  }
};
  // =====================================
  // Global Search (TopBar)
  // =====================================

  useEffect(() => {
    const handleSearch = (event) => {
      const keyword = (
        event.detail || ""
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
  // Refresh Cart
  // =====================================

  useEffect(() => {
    const refreshCart = () => {
      if (!restaurantId) return;

      const latestCart =
        JSON.parse(
          localStorage.getItem(
            `cart_${restaurantId}`
          )
        ) || [];

      setCart(latestCart);
    };

    refreshCart();

    window.addEventListener(
      "cartUpdated",
      refreshCart
    );

    window.addEventListener(
      "storage",
      refreshCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        refreshCart
      );

      window.removeEventListener(
        "storage",
        refreshCart
      );
    };
  }, [restaurantId]);

  // =====================================
  // Loading Screen
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
        <h2
          style={{
            color: "white",
          }}
        >
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
            background: "rgba(18,18,24,.80)",
            borderRadius: "24px",
            padding: "35px",
            border: "1px solid rgba(255,255,255,.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* ===================================== */}
          {/* Header */}
          {/* ===================================== */}

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
                  marginBottom: "8px",
                  fontSize: "38px",
                }}
              >
                🍽 Restaurant Menu
              </h1>

              <p
                style={{
                  color: "#D1D5DB",
                  fontSize: "16px",
                }}
              >
                {restaurant?.restaurant_name ||
                  "Selected Restaurant"}
              </p>
            </div>

            {canManageMenu && (
              <button
                onClick={() =>
                  navigate("/add-menu")
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
                  fontSize: "15px",
                }}
              >
                ➕ Add Menu Item
              </button>
            )}
          </div>

          {/* ===================================== */}
          {/* Statistics */}
          {/* ===================================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "18px",
              marginBottom: "30px",
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
              <h3>🥗 Veg</h3>
              <h1>{vegItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>🍗 Non-Veg</h3>
              <h1>{nonVegItems}</h1>
            </div>

            <div style={cardStyle}>
              <h3>💰 Avg Price</h3>
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
                background:
                  "rgba(255,255,255,.08)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,.08)",
                outline: "none",
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
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "700",
              }}
            >
              {filteredItems.length} Items
            </div>
          </div>
          {/* ===================================== */}
{/* AI Recommendations */}
{/* ===================================== */}

{isCustomer &&
Array.isArray(recommendations) &&
recommendations.length > 0 && (
  <div
  style={{
    background: "rgba(20,20,28,.92)",
    borderRadius: "22px",
    padding: "28px",
    marginBottom: "35px",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  }}
>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  }}
>
  <div>
    <h2
      style={{
        color: "white",
        margin: 0,
        fontSize: "28px",
      }}
    >
      🤖 AI Recommended For You
    </h2>

    <p
      style={{
        color: "#BDBDBD",
        marginTop: "8px",
      }}
    >
      Personalized dishes based on your previous orders
    </p>
  </div>

  <div
    style={{
      background:
        "linear-gradient(90deg,#7C3AED,#F97316)",
      color: "white",
      padding: "10px 18px",
      borderRadius: "25px",
      fontWeight: "700",
    }}
  >
    {recommendations.length} Items
  </div>
</div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
  "repeat(auto-fit,minmax(320px,1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      {recommendations.map((item) => (
        <div
          key={item.id}
          style={{
  background: "rgba(20,20,28,.92)",
  borderRadius: "20px",
  overflow: "hidden",
  border: "2px solid rgba(124,58,237,.45)",
  boxShadow:
    "0 10px 25px rgba(0,0,0,.25)",
}}
        >
          <h2
  style={{
    color: "white",
    marginTop: "18px",
    marginBottom: "10px",
    fontSize: "22px",
  }}
>
  {item.name || item.menu_name || item.item_name}
</h2>

<p
  style={{
    color: "#CFCFCF",
    minHeight: "48px",
    lineHeight: "24px",
    marginBottom: "15px",
  }}
>
  {item.description ||
    "Freshly prepared delicious food recommended for you."}
</p>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      color: "#FACC15",
      margin: 0,
    }}
  >
    ₹{item.price}
  </h2>

  <span
    style={{
      background: "#2563EB",
      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "13px",
    }}
  >
    ⭐ AI Pick
  </span>
</div>

<button
  onClick={() => handleAddToCart(item)}
  style={{
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg,#7C3AED,#F97316)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  }}
>
  🛒 Add to Cart
</button>

      
        </div>
      ))}
    </div>
  </div>
)}
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
                        {filteredItems.map((item) => {
              const cartItem = getCartItem(item.id);

              return (
                <div
                  key={item.id || item.menu_id}
                  style={{
                    background: "rgba(20,20,28,.92)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,.25)",
                    transition: ".3s",
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
                          fontSize: "22px",
                        }}
                      >
                        {item.name}
                      </h2>

                      <h2
                        style={{
                          color: "#FACC15",
                          margin: 0,
                        }}
                      >
                        ₹{item.price}
                      </h2>
                    </div>

                    <p
                      style={{
                        color: "#D1D5DB",
                        marginTop: "12px",
                        minHeight: "55px",
                      }}
                    >
                      {item.description ||
                        "Freshly prepared delicious food."}
                    </p>

                    <p
                      style={{
                        color: "#9CA3AF",
                        marginBottom: "18px",
                      }}
                    >
                      📂 {item.category}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "20px",
                      }}
                    >
                      <span
                        style={{
                          background: item.is_veg
                            ? "#16A34A"
                            : "#DC2626",
                          color: "white",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.is_veg
                          ? "🥗 Veg"
                          : "🍗 Non-Veg"}
                      </span>

                      <span
                        style={{
                          background:
                            item.is_available
                              ? "#2563EB"
                              : "#6B7280",
                          color: "white",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.is_available
                          ? "✅ Available"
                          : "❌ Unavailable"}
                      </span>
                    </div>

                    {isCustomer ? (
                      <>
                        {!cartItem ? (
                          <button
                            onClick={() =>
                              handleAddToCart({
    ...item,
    id: item.id || item.menu_id,
    name: item.name || item.menu_name || item.item_name,
})
                            }
                            style={{
                              width: "100%",
                              padding: "14px",
                              border: "none",
                              borderRadius: "12px",
                              background:
                                "linear-gradient(90deg,#7C3AED,#F97316)",
                              color: "white",
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >
                            🛒 Add to Cart
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              navigate("/cart")
                            }
                            style={{
                              width: "100%",
                              padding: "14px",
                              border: "none",
                              borderRadius: "12px",
                              background: "#16A34A",
                              color: "white",
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >
                            ✅ View Cart ({cartItem.quantity})
                          </button>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
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
                    )}
                  </div>
                </div>
              );
            })}
                      {filteredItems.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "70px 20px",
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
                🍽 No Menu Items Found
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  marginBottom: "30px",
                }}
              >
                {isCustomer
                  ? "No menu items available for this restaurant."
                  : "No menu items have been added yet."}
              </p>

              {canManageMenu && (
                <button
                  onClick={() =>
                    navigate("/add-menu")
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
                    fontSize: "15px",
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