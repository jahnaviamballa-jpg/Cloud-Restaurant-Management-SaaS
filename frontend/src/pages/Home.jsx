import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.60)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "rgba(18,18,24,.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "30px",
          padding: "60px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,.40)",
        }}
      >
        <h1
          style={{
            fontSize: "58px",
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
        >
          🍽️ RestroVerse AI
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#D1D5DB",
            maxWidth: "900px",
            margin: "0 auto 45px",
            lineHeight: "1.8",
          }}
        >
          Manage restaurants, online orders, reservations, inventory,
          billing, analytics and AI predictions through one powerful
          cloud-based platform.
        </p>

        {/* Features */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          {[
            {
              icon: "☁️",
              title: "Cloud Based",
              desc: "Access your restaurant from anywhere.",
            },
            {
              icon: "📊",
              title: "Analytics",
              desc: "Real-time reports & dashboards.",
            },
            {
              icon: "🤖",
              title: "AI Prediction",
              desc: "Predict inventory before shortages.",
            },
            {
              icon: "🛒",
              title: "Online Orders",
              desc: "Fast order management system.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "rgba(20,20,28,.92)",
                padding: "30px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,.08)",
                transition: ".3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0)")
              }
            >
              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "15px",
                }}
              >
                {feature.icon}
              </div>

              <h2
                style={{
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h2>

              <p
                style={{
                  color: "#BDBDBD",
                  lineHeight: "1.7",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "16px 40px",
              border: "none",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              color: "white",
              background:
                "linear-gradient(90deg,#7C3AED,#F97316)",
              transition: ".3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "translateY(0)")
            }
          >
            🔐 Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "16px 40px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,.20)",
              background: "rgba(255,255,255,.08)",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: ".3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "rgba(255,255,255,.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "rgba(255,255,255,.08)")
            }
          >
            ✨ Register
          </button>
        </div>

        {/* Footer */}

        <div
          style={{
            marginTop: "60px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "25px",
            color: "#9CA3AF",
          }}
        >
          © 2026 RestroVerse AI Platform
        </div>
      </div>
    </div>
  );
}

export default Home;