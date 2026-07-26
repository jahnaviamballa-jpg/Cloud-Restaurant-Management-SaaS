import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import {
  Line,
  Bar,
  Doughnut,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

function PredictionChart({ predictions = [] }) {
  if (!predictions.length) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "60px",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        📊 No Prediction Data Available
      </div>
    );
  }

  const labels = predictions.map((item) => item.item);

  const stockData = predictions.map(
    (item) => Number(item.currentStock) || 0
  );

  const reorderData = predictions.map(
    (item) => Number(item.recommendedOrder) || 0
  );

  const daysData = predictions.map((item) =>
    Number(String(item.daysRemaining).replace(/\D/g, ""))
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#E5E7EB",
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },

      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#8B5CF6",
        borderWidth: 1,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#CBD5E1",
        },
        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },

      y: {
        ticks: {
          color: "#CBD5E1",
        },
        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },
    },
  };

  const cardStyle = {
    background:
      "linear-gradient(145deg,#1E293B,#111827)",

    border: "1px solid rgba(255,255,255,.08)",

    borderRadius: "22px",

    padding: "22px",

    height: "420px",

    boxShadow:
      "0 15px 35px rgba(0,0,0,.35)",

    transition: ".3s",
  };

  const titleStyle = {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(420px,1fr))",
        gap: "30px",
      }}
    >
      {/* Inventory */}

      <div
        style={cardStyle}
      >
        <h3 style={titleStyle}>
          📦 Inventory Levels
        </h3>

        <div style={{ height: "330px" }}>
          <Line
            options={chartOptions}
            data={{
              labels,

              datasets: [
                {
                  label: "Current Stock",

                  data: stockData,

                  borderColor: "#3B82F6",

                  backgroundColor:
                    "rgba(59,130,246,.25)",

                  fill: true,

                  tension: .45,

                  borderWidth: 4,

                  pointRadius: 6,

                  pointBackgroundColor:
                    "#60A5FA",

                  pointBorderColor: "#fff",
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Reorder */}

      <div style={cardStyle}>
        <h3 style={titleStyle}>
          🛒 Reorder Quantity
        </h3>

        <div style={{ height: "330px" }}>
          <Bar
            options={chartOptions}
            data={{
              labels,

              datasets: [
                {
                  label: "Reorder",

                  data: reorderData,

                  borderRadius: 10,

                  backgroundColor: [
                    "#8B5CF6",
                    "#EC4899",
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#06B6D4",
                    "#A855F7",
                    "#14B8A6",
                    "#F97316",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Doughnut */}

      <div style={cardStyle}>
        <h3 style={titleStyle}>
          🥧 Stock Distribution
        </h3>

        <div style={{ height: "330px" }}>
          <Doughnut
            data={{
              labels,

              datasets: [
                {
                  data: stockData,

                  backgroundColor: [
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EC4899",
                    "#8B5CF6",
                    "#06B6D4",
                    "#EF4444",
                    "#10B981",
                    "#F97316",
                    "#EAB308",
                  ],

                  borderColor: "#111827",

                  borderWidth: 3,
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Days */}

      <div style={cardStyle}>
        <h3 style={titleStyle}>
          ⏳ Days Remaining
        </h3>

        <div style={{ height: "330px" }}>
          <Bar
            options={chartOptions}
            data={{
              labels,

              datasets: [
                {
                  label: "Days",

                  data: daysData,

                  borderRadius: 10,

                  backgroundColor:
                    "#F59E0B",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PredictionChart;