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

function RevenueChart() {
  const data = [
    { month: "Jan", revenue: 25000 },
    { month: "Feb", revenue: 30000 },
    { month: "Mar", revenue: 40000 },
    { month: "Apr", revenue: 35000 },
    { month: "May", revenue: 50000 },
    { month: "Jun", revenue: 60000 },
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
      <h2>💰 Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Monthly Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;