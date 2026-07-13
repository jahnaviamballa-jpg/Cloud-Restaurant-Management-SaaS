import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SalesChart() {
  const data = [
    { day: "Mon", orders: 80 },
    { day: "Tue", orders: 120 },
    { day: "Wed", orders: 95 },
    { day: "Thu", orders: 150 },
    { day: "Fri", orders: 180 },
    { day: "Sat", orders: 220 },
    { day: "Sun", orders: 190 },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>📈 Sales Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="orders"
            name="Orders Per Day"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;