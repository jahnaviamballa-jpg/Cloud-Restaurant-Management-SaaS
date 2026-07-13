import { toast } from "react-toastify";

function SalesReport() {
  const salesData = [
    {
      date: "2026-07-01",
      orders: 120,
      sales: 25000,
    },
    {
      date: "2026-07-02",
      orders: 145,
      sales: 32000,
    },
    {
      date: "2026-07-03",
      orders: 180,
      sales: 40000,
    },
    {
      date: "2026-07-04",
      orders: 160,
      sales: 35000,
    },
  ];

  const exportCSV = () => {
    const headers = ["Date", "Orders", "Sales"];

    const rows = salesData.map((item) => [
      item.date,
      item.orders,
      item.sales,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "sales-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("✅ Sales Report CSV Exported");
  };

  const exportPDF = () => {
    toast.info("📄 PDF Export will be available soon");
  };

  return (
    <div className="sales-report-page">
      <h1>📈 Sales Report</h1>

      <p>
        View restaurant sales trends and order analytics.
      </p>

      <div className="export-buttons">
        <button onClick={exportCSV}>
          📥 Export CSV
        </button>

        <button onClick={exportPDF}>
          📄 Export PDF
        </button>
      </div>

      <div className="sales-table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Orders</th>
              <th>Sales</th>
            </tr>
          </thead>

          <tbody>
            {salesData.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.orders}</td>
                <td>₹{item.sales.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .sales-report-page {
          min-height: 100vh;
          padding: 30px;
          background: #f5f6fa;
          color: #213547;
        }

        .export-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin: 25px 0;
        }

        .export-buttons button {
          padding: 12px 18px;
          background: #ff6b00;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .sales-table-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          overflow-x: auto;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .sales-table-container table {
          width: 100%;
          border-collapse: collapse;
        }

        .sales-table-container th,
        .sales-table-container td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        body[data-theme="dark"] .sales-report-page {
          background: #121212;
          color: white;
        }

        body[data-theme="dark"] .sales-table-container {
          background: #1e1e1e;
          color: white;
        }

        @media (max-width: 768px) {
          .sales-report-page {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default SalesReport;