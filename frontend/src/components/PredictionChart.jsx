import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PredictionChart() {
  const data = [
    { day: "Mon", currentStock: 120, consumption: 15, predictedStock: 105 },
    { day: "Tue", currentStock: 105, consumption: 18, predictedStock: 87 },
    { day: "Wed", currentStock: 87, consumption: 12, predictedStock: 75 },
    { day: "Thu", currentStock: 75, consumption: 20, predictedStock: 55 },
    { day: "Fri", currentStock: 55, consumption: 15, predictedStock: 40 },
    { day: "Sat", currentStock: 40, consumption: 22, predictedStock: 18 },
    { day: "Sun", currentStock: 18, consumption: 10, predictedStock: 8 },
  ];

  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>📈 Inventory Prediction Chart</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="currentStock"
            name="Current Stock"
          />

          <Line
            type="monotone"
            dataKey="consumption"
            name="Weekly Consumption"
          />

          <Line
            type="monotone"
            dataKey="predictedStock"
            name="Predicted Remaining Stock"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionChart;