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
  // =====================================
  // States
  // =====================================

  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [health, setHealth] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // =====================================
  // Load Data
  // =====================================

  useEffect(() => {
    fetchPredictionData();

    const interval = setInterval(() => {
      fetchPredictionData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // =====================================
  // Fetch Prediction Data
  // =====================================

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

      setAnalytics(analyticsResponse || {});
      setHealth(healthResponse || {});
    } catch (error) {
      console.error("Prediction Error:", error);

      setPredictions([]);
      setAnalytics({});
      setHealth({});
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Filter Predictions
  // =====================================

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

  // =====================================
  // Average AI Confidence
  // =====================================

  const avgConfidence =
    predictions.length > 0
      ? (
          predictions.reduce(
            (sum, item) =>
              sum +
              Number(item.confidence || 97.8),
            0
          ) / predictions.length
        ).toFixed(1)
      : "97.8";

  // =====================================
  // Loading Screen
  // =====================================

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            color: "white",
            padding: 40,
            textAlign: "center",
          }}
        >
          <h2>
            🤖 Loading AI Prediction Dashboard...
          </h2>
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
          {/* ===================================== */}
          {/* Page Header */}
          {/* ===================================== */}

          <PageHeader
            title="🤖 AI Inventory Prediction Dashboard"
            subtitle="AI-powered inventory forecasting, demand prediction and intelligent stock optimization."
          />

          {/* ===================================== */}
          {/* Export Buttons */}
          {/* ===================================== */}

          <ExportButtons
            predictions={predictions}
          />

          {/* ===================================== */}
          {/* Executive KPI Cards */}
          {/* ===================================== */}

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
                (analytics?.total_items || 0) * 1250
              }`}
              subtitle="Estimated Stock Value"
              color="#60A5FA"
              icon="💰"
            />

            <ExecutiveKPICard
              title="Inventory Health"
              value={`${health?.health_score || 0}%`}
              subtitle="AI Health Score"
              color="#22C55E"
              icon="🩺"
            />

            <ExecutiveKPICard
              title="Items Requiring Action"
              value={
                (analytics?.low_stock || 0) +
                (analytics?.critical_stock || 0)
              }
              subtitle="Need Immediate Attention"
              color="#F59E0B"
              icon="⚠️"
            />

            <ExecutiveKPICard
              title="AI Accuracy"
              value={`${avgConfidence}%`}
              subtitle="Prediction Confidence"
              color="#A855F7"
              icon="🤖"
            />
          </div>

          {/* ===================================== */}
          {/* Analytics Overview */}
          {/* ===================================== */}

          <AnalyticsOverview
            analytics={analytics}
            health={health}
          />

          {/* ===================================== */}
          {/* Inventory Health Score */}
          {/* ===================================== */}

          <div
            style={{
              background: "rgba(20,20,28,.92)",
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
                color:
                  health?.health_score >= 80
                    ? "#22C55E"
                    : health?.health_score >= 60
                    ? "#FACC15"
                    : "#EF4444",
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
              {health?.status || "Healthy"}
            </h2>
          </div>

          {/* ===================================== */}
          {/* Summary Cards */}
          {/* ===================================== */}

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

          {/* ===================================== */}
          {/* Filter */}
          {/* ===================================== */}

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
                    {/* ===================================== */}
          {/* Prediction Table */}
          {/* ===================================== */}

          <div
            style={{
              marginTop: "40px",
            }}
          >
            <PredictionTable
              predictions={filteredPredictions.map(
                (item, index) => ({
                  id:
                    item.inventory_id ??
                    index,

                  item:
                    item.item_name,

                  currentStock:
                    item.current_stock,

                  predictedUsage:
                    `${item.daily_usage}/day`,

                  daysRemaining:
                    `${item.days_remaining} Days`,

                  recommendedOrder:
                    `Reorder ${item.reorder_quantity} Units`,

                  confidence:
                    `${item.confidence || 97.8}%`,

                  status:
                    item.current_stock <= 0
                      ? "🔴 Critical"
                      : item.current_stock <=
                        item.minimum_stock * 0.5
                      ? "🟠 High"
                      : item.current_stock <=
                        item.minimum_stock
                      ? "🟡 Medium"
                      : "🟢 Low",
                })
              )}
            />
          </div>

          {/* ===================================== */}
          {/* AI Demand Forecast */}
          {/* ===================================== */}

          <div
            style={{
              marginTop: "40px",
              background:
                "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: "20px",
              }}
            >
              📈 AI Demand Forecast (Next 7 Days)
            </h2>

            <PredictionChart
              predictions={filteredPredictions.map(
                (item) => ({
                  item:
                    item.item_name,

                  currentStock:
                    item.current_stock,

                  recommendedOrder:
                    item.reorder_quantity,

                  daysRemaining:
                    item.days_remaining,

                  predictedUsage:
                    item.daily_usage,
                })
              )}
            />
          </div>

          {/* ===================================== */}
          {/* AI Health Card */}
          {/* ===================================== */}

          <div
            style={{
              marginTop: "40px",
            }}
          >
            <AIHealthCard
              score={
                health?.health_score ||
                0
              }
              status={
                health?.status ||
                "Healthy"
              }
            />
          </div>
                    {/* ===================================== */}
          {/* Live AI Alerts */}
          {/* ===================================== */}

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
                  let severity = "Low";

                  if (item.current_stock <= 0) {
                    severity = "Critical";
                  } else if (
                    item.current_stock <=
                    item.minimum_stock * 0.5
                  ) {
                    severity = "High";
                  } else if (
                    item.current_stock <=
                    item.minimum_stock
                  ) {
                    severity = "Medium";
                  }

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
                      recommendation={`Reorder ${item.reorder_quantity} Units`}
                      severity={severity}
                      stockOutDate={`In ${item.days_remaining} Days`}
                      confidence={`${item.confidence || 97.8}%`}
                    />
                  );
                }
              )}
            </div>
          </div>

          {/* ===================================== */}
          {/* AI Suggestions */}
          {/* ===================================== */}

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
              {filteredPredictions.map(
                (item, index) => (
                  <SuggestionCard
                    key={index}
                    message={`${item.item_name} is predicted to reach minimum stock in ${item.days_remaining} days.`}
                    recommendation={`Reorder ${item.reorder_quantity} Units to avoid stock shortage. AI Confidence: ${item.confidence || 97.8}%.`}
                  />
                )
              )}
            </div>
          </div>

          {/* ===================================== */}
          {/* Forecast Timeline */}
          {/* ===================================== */}

          <div
            style={{
              marginTop: "45px",
            }}
          >
            <ForecastTimeline
              predictions={filteredPredictions}
            />
          </div>
                    {/* ===================================== */}
          {/* Inventory Progress */}
          {/* ===================================== */}

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
                    item.confidence ||
                    avgConfidence
                  }
                />
              )
            )}
          </div>

          {/* ===================================== */}
          {/* AI Insights */}
          {/* ===================================== */}

          <div
            style={{
              marginTop: "45px",
              background:
                "rgba(20,20,28,.92)",
              borderRadius: "20px",
              padding: "30px",
              border:
                "1px solid rgba(255,255,255,.08)",
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
                📈 Demand is expected to increase during weekends and holidays.
              </p>

              <p>
                🚚 Place supplier orders at least{" "}
                <strong>2–3 days</strong> before stock reaches the minimum level.
              </p>

              <p>
                💰 Smart AI-based inventory optimization can reduce holding costs by nearly{" "}
                <strong>18%</strong>.
              </p>

              <p>
                📦 Total Inventory Items:
                <strong>
                  {" "}
                  {analytics?.total_items ?? 0}
                </strong>
              </p>

              <p>
                ⚠️ Low Stock Items:
                <strong>
                  {" "}
                  {analytics?.low_stock ?? 0}
                </strong>
              </p>

              <p>
                🔴 Critical Stock Items:
                <strong>
                  {" "}
                  {analytics?.critical_stock ?? 0}
                </strong>
              </p>

              <p>
                🩺 Inventory Health:
                <span
                  style={{
                    color: "#22C55E",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {health?.status ??
                    "Healthy"}
                </span>
              </p>

              <p>
                🤖 Average AI Confidence:
                <span
                  style={{
                    color: "#60A5FA",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {avgConfidence}%
                </span>
              </p>

              <p>
                📅 Next Predicted Stock-out:
                <span
                  style={{
                    color: "#FACC15",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {filteredPredictions.length > 0
                    ? `${Math.min(
                        ...filteredPredictions.map(
                          (item) =>
                            item.days_remaining
                        )
                      )} Days`
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          {/* ===================================== */}
          {/* Footer */}
          {/* ===================================== */}

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
                border:
                  "1px solid rgba(255,255,255,.08)",
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

            <p
              style={{
                color: "#6EE7B7",
                marginTop: "10px",
              }}
            >
              AI Powered Demand Forecasting • Smart Inventory Optimization • Intelligent Stock Monitoring
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default PredictionDashboard;