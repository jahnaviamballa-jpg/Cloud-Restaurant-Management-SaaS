import { Link } from "react-router-dom";

function CustomerDashboard() {
  const restaurant = JSON.parse(
    localStorage.getItem("restaurant")
  );

  const cards = [
    {
      title: "Restaurants",
      icon: "🍴",
      path: "/restaurants",
      color: "#7C3AED",
    },
    {
      title: "Menu",
      icon: "📋",
      path: "/menu",
      color: "#F97316",
    },
    {
      title: "Cart",
      icon: "🛒",
      path: "/cart",
      color: "#06B6D4",
    },
    {
      title: "Orders",
      icon: "📦",
      path: "/orders",
      color: "#22C55E",
    },
    {
      title: "Reservations",
      icon: "📅",
      path: "/reservations",
      color: "#EC4899",
    },
    {
      title: "Profile",
      icon: "👤",
      path: "/profile",
      color: "#FACC15",
    },
  ];

  const categories = [
    {
      name: "Biryani",
      icon: "🍛",
      color: "#F97316",
    },
    {
      name: "Pizza",
      icon: "🍕",
      color: "#EF4444",
    },
    {
      name: "Burger",
      icon: "🍔",
      color: "#FACC15",
    },
    {
      name: "Desserts",
      icon: "🍰",
      color: "#EC4899",
    },
    {
      name: "Drinks",
      icon: "🥤",
      color: "#06B6D4",
    },
    {
      name: "South Indian",
      icon: "🥘",
      color: "#22C55E",
    },
  ];

  const offers = [
    {
      title: "50% OFF",
      desc: "On all Biryani Orders",
      color: "#7C3AED",
    },
    {
      title: "Free Dessert",
      desc: "Orders above ₹999",
      color: "#F97316",
    },
    {
      title: "Buy 2 Get 1",
      desc: "Applicable on Pizzas",
      color: "#06B6D4",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.22)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "auto",
          background: "rgba(18,18,24,.78)",
          borderRadius: "28px",
          padding: "40px",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "46px",
            marginBottom: "10px",
          }}
        >
          🍽️ Customer Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Welcome to{" "}
          <span
            style={{
              color: "#F97316",
              fontWeight: "700",
            }}
          >
            {restaurant?.name || "Cloud Restaurant"}
          </span>
        </p>
                {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#1E1E2A",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3 style={{ color: "#999" }}>Active Restaurant</h3>
            <h2 style={{ color: "white" }}>
              {restaurant?.name || "--"}
            </h2>
          </div>

          <div
            style={{
              background: "#1E1E2A",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3 style={{ color: "#999" }}>Orders</h3>
            <h2 style={{ color: "#22C55E" }}>12</h2>
          </div>

          <div
            style={{
              background: "#1E1E2A",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3 style={{ color: "#999" }}>Reward Points</h3>
            <h2 style={{ color: "#F97316" }}>240 pts</h2>
          </div>

          <div
            style={{
              background: "#1E1E2A",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3 style={{ color: "#999" }}>Reservations</h3>
            <h2 style={{ color: "#06B6D4" }}>3</h2>
          </div>
        </div>

        {/* Quick Actions */}

        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          ⚡ Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#181822",
                  borderRadius: "20px",
                  padding: "30px",
                  border: "1px solid rgba(255,255,255,.08)",
                  transition: ".3s",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "18px",
                    background: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "18px",
                  }}
                >
                  {card.icon}
                </div>

                <h2
                  style={{
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  {card.title}
                </h2>

                <p style={{ color: "#BDBDBD" }}>
                  Open {card.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
                {/* Food Categories */}

        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          🍴 Popular Categories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              style={{
                background: "#181822",
                borderRadius: "18px",
                padding: "25px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,.08)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  margin: "auto",
                  background: category.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  marginBottom: "18px",
                }}
              >
                {category.icon}
              </div>

              <h3
                style={{
                  color: "white",
                }}
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Today's Offers */}

        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          🔥 Today's Offers
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {offers.map((offer) => (
            <div
              key={offer.title}
              style={{
                background: offer.color,
                borderRadius: "22px",
                padding: "30px",
                color: "white",
              }}
            >
              <h2
                style={{
                  marginBottom: "12px",
                }}
              >
                {offer.title}
              </h2>

              <p
                style={{
                  fontSize: "17px",
                }}
              >
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
                {/* Featured Restaurants */}

        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          ⭐ Featured Restaurants
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {[
            {
              name: "Paradise Biryani",
              rating: "4.8",
              image:
                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Domino's Pizza",
              rating: "4.7",
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Burger Hub",
              rating: "4.6",
              image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            },
          ].map((restaurant, index) => (
            <div
              key={index}
              style={{
                background: "#1B1B26",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "22px" }}>
                <h3
                  style={{
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  🍽️ {restaurant.name}
                </h3>

                <p
                  style={{
                    color: "#FACC15",
                    marginBottom: "18px",
                    fontSize: "16px",
                  }}
                >
                  ⭐ {restaurant.rating}
                </p>

                <button
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
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
                {/* Customer Reviews */}

        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          💬 Customer Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {[
            {
              name: "Rahul",
              review:
                "Amazing food quality and super fast delivery!",
            },
            {
              name: "Priya",
              review:
                "Loved the ambience and the customer service.",
            },
            {
              name: "Arjun",
              review:
                "One of the best restaurant apps I've ever used.",
            },
          ].map((review, index) => (
            <div
              key={index}
              style={{
                background: "#1B1B26",
                padding: "25px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h3
                style={{
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                ⭐⭐⭐⭐⭐
              </h3>

              <p
                style={{
                  color: "#CFCFD5",
                  lineHeight: "28px",
                  marginBottom: "18px",
                }}
              >
                "{review.review}"
              </p>

              <h4
                style={{
                  color: "#F97316",
                }}
              >
                — {review.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Contact Section */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "35px",
            marginTop: "60px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "40px",
          }}
        >
          <div>
            <h3
              style={{
                color: "white",
                marginBottom: "15px",
              }}
            >
              📞 Contact
            </h3>

            <p style={{ color: "#BDBDBD" }}>
              +91 98765 43210
            </p>

            <p style={{ color: "#BDBDBD" }}>
              support@cloudrestaurant.com
            </p>
          </div>

          <div>
            <h3
              style={{
                color: "white",
                marginBottom: "15px",
              }}
            >
              🕒 Opening Hours
            </h3>

            <p style={{ color: "#BDBDBD" }}>
              Mon - Sun
            </p>

            <p style={{ color: "#BDBDBD" }}>
              10:00 AM - 11:00 PM
            </p>
          </div>

          <div>
            <h3
              style={{
                color: "white",
                marginBottom: "15px",
              }}
            >
              🌐 Follow Us
            </h3>

            <p style={{ color: "#BDBDBD" }}>
              Instagram
            </p>

            <p style={{ color: "#BDBDBD" }}>
              Facebook
            </p>

            <p style={{ color: "#BDBDBD" }}>
              X (Twitter)
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "45px",
            textAlign: "center",
            color: "#888",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "25px",
          }}
        >
          © 2026 Cloud Restaurant Management SaaS Platform. All Rights Reserved.
        </div>

      </div>
    </div>
  );
}

export default CustomerDashboard;