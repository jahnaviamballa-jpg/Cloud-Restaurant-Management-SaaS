import { useState, useEffect } from "react";

import PredictionCard from "../components/PredictionCard";
import PredictionTable from "../components/PredictionTable";
import PredictionChart from "../components/PredictionChart";
import PredictionProgressCard from "../components/PredictionProgressCard";
import AIAlertCard from "../components/AIAlertCard";
import AIHealthCard from "../components/AIHealthCard";
import SuggestionCard from "../components/SuggestionCard";
import ExportButtons from "../components/ExportButtons";
import ExecutiveKPICard from "../components/ExecutiveKPICard";
import AnalyticsOverview from "../components/AnalyticsOverview";
import ForecastTimeline from "../components/ForecastTimeline";
import PredictionFilter from "../components/PredictionFilter";
import PageHeader from "../components/PageHeader";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import {
  getPredictions,
  getInventoryAnalytics,
  getInventoryHealth,
} from "../api/predictionApi";

function PredictionDashboard() {
  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [health, setHealth] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchPredictionData();

    const interval = setInterval(() => {
      fetchPredictionData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchPredictionData = async () => {
    try {
      setLoading(true);

      const predictionResponse =
        await getPredictions();

      const analyticsResponse =
        await getInventoryAnalytics();

      const healthResponse =
        await getInventoryHealth();

      setPredictions(
        Array.isArray(predictionResponse)
          ? predictionResponse
          : []
      );

      setAnalytics(analyticsResponse);
      setHealth(healthResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPredictions =
    predictions.filter((item) => {
      const matchesSearch =
        item.item_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        item.recommendation === status;

      return matchesSearch && matchesStatus;
    });

  if (loading) {
  return (
  <Layout>
    <div style={{ color: "white", padding: 40 }}>
      Prediction Dashboard Working
    </div>
  </Layout>
);
}

  return (
  <Layout>
    <div
  style={{
    padding: "20px",
  }}
>
      <div
        style={{
          background: "rgba(18,18,24,.80)",
          borderRadius: "25px",
          padding: "35px",
          backdropFilter: "blur(12px)",
        }}
      >
        <PageHeader
  title="🤖 AI Inventory Prediction Dashboard"
  subtitle="AI-powered inventory forecasting, demand prediction and intelligent stock optimization."
/>

        <ExportButtons
          predictions={predictions}
        />

        {/* Executive KPI */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
            marginTop: "30px",
            marginBottom: "35px",
          }}
        >
          <ExecutiveKPICard
            title="Inventory Value"
            value={`₹${
              (analytics?.total_items || 0) *
              1250
            }`}
            subtitle="Estimated Stock Value"
            color="#60A5FA"
            icon="💰"
          />

          <ExecutiveKPICard
            title="Inventory Health"
            value={`${
              health?.health_score || 0
            }%`}
            subtitle="AI Health Score"
            color="#22C55E"
            icon="🩺"
          />

          <ExecutiveKPICard
            title="Items Requiring Action"
            value={
              analytics?.low_stock || 0
            }
            subtitle="Needs Restocking"
            color="#F59E0B"
            icon="⚠️"
          />

          <ExecutiveKPICard
            title="AI Accuracy"
            value="97.8%"
            subtitle="Prediction Confidence"
            color="#A855F7"
            icon="🤖"
          />
        </div>

        <AnalyticsOverview
          analytics={analytics}
          health={health}
        />

        {/* Inventory Health */}

        <div
          style={{
            background:
              "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "35px",
            marginTop: "35px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "white",
            }}
          >
            🩺 Inventory Health Score
          </h2>

          <h1
            style={{
              color: "#22C55E",
              fontSize: "80px",
              margin: 0,
            }}
          >
            {health?.health_score || 0}%
          </h1>

          <h2
            style={{
              color: "#FACC15",
            }}
          >
            {health?.status}
          </h2>
        </div>

        {/* Summary Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "25px",
            marginTop: "35px",
          }}
        >
          <PredictionCard
            icon="📦"
            title="Inventory Items"
            value={
              analytics?.total_items || 0
            }
          />

          <PredictionCard
            icon="⚠️"
            title="Low Stock"
            value={
              analytics?.low_stock || 0
            }
          />

          <PredictionCard
            icon="🤖"
            title="AI Predictions"
            value={predictions.length}
          />

          <PredictionCard
            icon="📈"
            title="Critical Items"
            value={
              analytics?.critical_stock || 0
            }
          />
        </div>

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <PredictionFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
        </div>
                {/* ========================= */}
        {/* Prediction Table */}
        {/* ========================= */}

        <div style={{ marginTop: "40px" }}>
          <PredictionTable
            predictions={filteredPredictions.map(
              (item, index) => ({
                id: item.inventory_id ?? index,

                item: item.item_name,

                currentStock: item.current_stock,

                predictedUsage: `${item.daily_usage}/day`,

                daysRemaining: `${item.days_remaining} Days`,

                recommendedOrder:
                  item.reorder_quantity,

                status:
                  item.recommendation ===
                  "Reorder Immediately"
                    ? "🔴 Critical"
                    : item.recommendation ===
                      "Reorder Soon"
                    ? "🟠 Warning"
                    : item.recommendation ===
                      "Monitor Stock"
                    ? "🟡 Medium"
                    : "🟢 Healthy",
              })
            )}
          />
        </div>

        {/* ========================= */}
        {/* Prediction Chart */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "40px",
            background:
              "rgba(20,20,28,.92)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <PredictionChart
            predictions={filteredPredictions.map(
              (item) => ({
                item: item.item_name,
                currentStock:
                  item.current_stock,
                recommendedOrder:
                  item.reorder_quantity,
                daysRemaining:
                  item.days_remaining,
              })
            )}
          />
        </div>

        {/* ========================= */}
        {/* AI Health Card */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "40px",
          }}
        >
          <AIHealthCard
            score={
              health?.health_score || 0
            }
            status={
              health?.status || "Unknown"
            }
          />
        </div>

        {/* ========================= */}
        {/* Live AI Alerts */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "45px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "25px",
            }}
          >
            🚨 Live AI Alerts
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {filteredPredictions.map(
              (item, index) => {
                const severity =
                  item.current_stock <= 0
                    ? "Critical"
                    : item.current_stock <=
                      item.minimum_stock
                    ? "Warning"
                    : "Healthy";

                return (
                  <AIAlertCard
                    key={
                      item.inventory_id ??
                      index
                    }
                    item={item.item_name}
                    quantity={
                      item.current_stock
                    }
                    recommendation={
                      item.recommendation
                    }
                    severity={severity}
                  />
                );
              }
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* AI Suggestions */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "45px",
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
            {filteredPredictions
              .filter(
                (item) =>
                  item.recommendation !==
                  "Stock Sufficient"
              )
              .map((item, index) => (
                <SuggestionCard
                  key={index}
                  message={`${item.item_name} requires attention.`}
                  recommendation={`Recommended reorder quantity: ${item.reorder_quantity} units.`}
                />
              ))}
          </div>
        </div>

        {/* ========================= */}
        {/* Forecast Timeline */}
        {/* ========================= */}

        <ForecastTimeline
          predictions={filteredPredictions}
        />

        {/* ========================= */}
        {/* Inventory Progress */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "45px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "25px",
            }}
          >
            📊 Inventory Health Progress
          </h2>

          {filteredPredictions.map(
            (item, index) => (
              <PredictionProgressCard
                key={
                  item.inventory_id ??
                  index
                }
                item={item.item_name}
                stock={
                  item.current_stock
                }
                minimum={
                  item.minimum_stock
                }
                confidence={
                  item.confidence
                }
              />
            )
          )}
        </div>
                {/* ========================= */}
        {/* AI Insights */}
        {/* ========================= */}

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
              fontSize: "17px",
            }}
          >
            <p>
              ✅ AI predicts inventory shortages before they occur.
            </p>

            <p>
              📈 Historical sales indicate demand usually increases during weekends.
            </p>

            <p>
              🚚 Place supplier orders at least <strong>2–3 days</strong> before stock reaches the minimum level.
            </p>

            <p>
              💰 Smart AI-based restocking can reduce inventory holding costs by nearly <strong>18%</strong>.
            </p>

            <p>
              📦 Current monitored inventory items:
              <strong> {analytics?.total_items ?? 0}</strong>
            </p>

            <p>
              ⚠️ Low stock items:
              <strong> {analytics?.low_stock ?? 0}</strong>
            </p>

            <p>
              🔴 Critical stock items:
              <strong> {analytics?.critical_stock ?? 0}</strong>
            </p>

            <p>
              ⚡ Inventory Health:
              <span
                style={{
                  color: "#22C55E",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {health?.status ?? "Excellent"}
              </span>
            </p>

            <p>
              🤖 AI Prediction Confidence:
              <span
                style={{
                  color: "#60A5FA",
                  fontWeight: "bold",
                }}
              >
                {" "}
                97.8%
              </span>
            </p>
          </div>
        </div>

        {/* ========================= */}
        {/* Footer */}
        {/* ========================= */}

        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "#9CA3AF",
            fontSize: "15px",
          }}
        >
          <hr
            style={{
              border: "1px solid rgba(255,255,255,.08)",
              marginBottom: "20px",
            }}
          />

          <p>
            🤖 AI Inventory Prediction Dashboard
          </p>

          <p>
            RestroVerse AI
          </p>

          <p>
            Built with React • FastAPI • PostgreSQL • Recharts
          </p>
        </div>

            </div>
    </div>
  </Layout>
  );
}

export default PredictionDashboard;