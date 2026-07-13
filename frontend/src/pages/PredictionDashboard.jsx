import PredictionCard from "../components/PredictionCard";
import PredictionTable from "../components/PredictionTable";
import PredictionChart from "../components/PredictionChart";
import SuggestionCard from "../components/SuggestionCard";

function PredictionDashboard() {
  const predictions = [
    {
      id: 1,
      item: "Rice",
      currentStock: "120 Kg",
      predictedUsage: "15 Kg/day",
      daysRemaining: "8 Days",
      recommendedOrder: "Order 80 Kg",
      status: "🟡 Medium",
    },
    {
      id: 2,
      item: "Chicken",
      currentStock: "12 Kg",
      predictedUsage: "10 Kg/day",
      daysRemaining: "1 Day",
      recommendedOrder: "Order 40 Kg",
      status: "🔴 Critical",
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>🤖 AI Inventory Prediction Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <PredictionCard
          icon="📦"
          title="Total Inventory Items"
          value="25"
        />

        <PredictionCard
          icon="⚠️"
          title="Low Stock Items"
          value="5"
        />

        <PredictionCard
          icon="🤖"
          title="AI Predictions"
          value="12"
        />

        <PredictionCard
          icon="📈"
          title="Weekly Consumption"
          value="320 Kg"
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <PredictionTable predictions={predictions} />
      </div>

      <PredictionChart />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <SuggestionCard
          message="Chicken stock will run out in 2 days."
          recommendation="Recommended reorder: 50 Kg"
        />

        <SuggestionCard
          message="Rice demand expected to increase this weekend."
          recommendation="Increase stock by 20%."
        />
      </div>
    </div>
  );
}

export default PredictionDashboard;