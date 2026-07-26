import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function PredictionChart({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return (
      <h3
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        No Prediction Data
      </h3>
    );
  }

  const labels = predictions.map((item) => item.item);

  const stock = predictions.map(
    (item) => item.currentStock
  );

  const reorder = predictions.map((item) =>
    Number(
      String(item.recommendedOrder).replace(
        /\D/g,
        ""
      )
    )
  );

  const days = predictions.map((item) =>
    Number(
      String(item.daysRemaining).replace(
        /\D/g,
        ""
      )
    )
  );

  const barData = {
    labels,
    datasets: [
      {
        label: "Current Stock",
        data: stock,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Days Remaining",
        data: days,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Recommended Order",
        data: reorder,
      },
    ],
  };

  return (
    <>
      {/* Bar Chart */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3>📦 Current Inventory</h3>

        <Bar data={barData} />
      </div>

      {/* Line Chart */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3>📈 Remaining Days Prediction</h3>

        <Line data={lineData} />
      </div>

      {/* Pie Chart */}

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <h3>🥧 Reorder Quantity Distribution</h3>

        <Pie data={pieData} />
      </div>
    </>
  );
}

export default PredictionChart;