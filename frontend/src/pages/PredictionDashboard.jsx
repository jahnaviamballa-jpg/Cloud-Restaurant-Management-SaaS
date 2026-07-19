import { useState, useEffect } from "react";

import PredictionCard from "../components/PredictionCard";
import PredictionTable from "../components/PredictionTable";
import PredictionChart from "../components/PredictionChart";
import SuggestionCard from "../components/SuggestionCard";

import {
  getPredictions,
  getInventoryAnalytics,
} from "../api/predictionApi";

function PredictionDashboard() {
  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const predictionResponse = await getPredictions();
        const analyticsResponse = await getInventoryAnalytics();

        setPredictions(
          Array.isArray(predictionResponse)
            ? predictionResponse
            : []
        );

        setAnalytics(analyticsResponse);
      } catch (error) {
        console.error("Prediction Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "white",
        }}
      >
        Loading AI Predictions...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.75)",
          borderRadius: "25px",
          padding: "35px",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🤖 AI Inventory Prediction Dashboard
        </h1>

        <p
          style={{
            color: "#CFCFD5",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          AI-powered inventory forecasting and stock recommendations.
        </p>

        {/* Summary Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "25px",
          }}
        >
          <PredictionCard
            icon="📦"
            title="Inventory Items"
            value={analytics?.total_items || 0}
          />

          <PredictionCard
            icon="⚠️"
            title="Low Stock"
            value={analytics?.low_stock || 0}
          />

          <PredictionCard
            icon="🤖"
            title="AI Predictions"
            value={predictions.length}
          />

          <PredictionCard
            icon="📈"
            title="Critical Items"
            value={analytics?.critical_stock || 0}
          />
        </div>

        {/* Prediction Table */}

        <div style={{ marginTop: "40px" }}>
          <PredictionTable
            predictions={predictions.map((item) => ({
              id: item.inventory_id,
              item: item.item_name,
              currentStock: item.current_stock,
              predictedUsage: `${item.daily_usage}/day`,
              daysRemaining: `${item.days_remaining} Days`,
              recommendedOrder: item.recommendation,
              status:
                item.recommendation ===
                "Reorder Immediately"
                  ? "🔴 Critical"
                  : "🟡 Medium",
            }))}
          />
        </div>

        {/* AI Chart */}

        <div
          style={{
            marginTop: "40px",
            background: "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "25px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <PredictionChart />
        </div>

        {/* AI Suggestions */}

        <div
          style={{
            marginTop: "40px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "25px",
            }}
          >
            💡 AI Suggestions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {predictions
              .filter(
                (item) =>
                  item.recommendation !==
                  "Stock Sufficient"
              )
              .map((item, index) => (
                <SuggestionCard
                  key={index}
                  message={`${item.item_name} stock status: ${item.recommendation}`}
                  recommendation={`Recommended reorder quantity: ${item.reorder_quantity}`}
                />
              ))}
          </div>
        </div>

        {/* AI Insights */}

        <div
          style={{
            marginTop: "45px",
            background: "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            🧠 AI Insights
          </h2>

          <div
            style={{
              color: "#E5E7EB",
              lineHeight: "2",
            }}
          >
            <p>
              ✅ AI predicts stock shortages before they happen.
            </p>

            <p>
              📈 Demand is expected to increase during weekends.
            </p>

            <p>
              🚚 Place supplier orders 2-3 days in advance.
            </p>

            <p>
              💰 Smart restocking can reduce inventory cost by 18%.
            </p>

            <p>
              ⚡ Current inventory health score:{" "}
              <span
                style={{
                  color: "#22C55E",
                  fontWeight: "bold",
                }}
              >
                Excellent
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionDashboard;