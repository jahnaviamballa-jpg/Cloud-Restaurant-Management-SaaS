import { toast } from "react-toastify";

function RevenueReport() {
  const revenueData = [
    {
      period: "January",
      revenue: 25000,
    },
    {
      period: "February",
      revenue: 30000,
    },
    {
      period: "March",
      revenue: 40000,
    },
    {
      period: "April",
      revenue: 55000,
    },
  ];

  const exportCSV = () => {
    const headers = ["Month", "Revenue"];

    const rows = revenueData.map((item) => [
      item.period,
      item.revenue,
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
    link.download = "revenue-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("✅ Revenue Report CSV Exported");
  };


  const exportPDF = () => {
    toast.info("📄 PDF Export will be available soon");
  };


  return (
    <div className="revenue-report-page">

      <h1>💰 Revenue Report</h1>

      <p>
        View daily, weekly and monthly revenue analytics.
      </p>


      <div className="summary-cards">

        <div className="revenue-card">
          <h3>Total Revenue</h3>
          <h2>₹1,50,000</h2>
        </div>


        <div className="revenue-card">
          <h3>Monthly Growth</h3>
          <h2>+18%</h2>
        </div>


        <div className="revenue-card">
          <h3>Average Daily Revenue</h3>
          <h2>₹5,000</h2>
        </div>

      </div>


      <div className="buttons">

        <button onClick={exportCSV}>
          📥 Export CSV
        </button>


        <button onClick={exportPDF}>
          📄 Export PDF
        </button>

      </div>



      <div className="revenue-table">

        <table>

          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
            </tr>
          </thead>


          <tbody>

            {revenueData.map((item) => (
              <tr key={item.period}>
                <td>{item.period}</td>

                <td>
                  ₹{item.revenue.toLocaleString("en-IN")}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>



      <style>{`

        .revenue-report-page {
          min-height:100vh;
          padding:30px;
          background:#f5f6fa;
          color:#213547;
        }


        .summary-cards {
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(200px,1fr));

          gap:20px;
          margin:25px 0;
        }


        .revenue-card {
          background:white;
          padding:20px;
          border-radius:12px;
          box-shadow:
          0 4px 15px rgba(0,0,0,0.1);
        }


        .buttons {
          display:flex;
          gap:15px;
          flex-wrap:wrap;
          margin-bottom:25px;
        }


        .buttons button {

          background:#ff6b00;
          color:white;
          border:none;
          padding:12px 18px;
          border-radius:8px;
          cursor:pointer;
          font-weight:bold;

        }



        .revenue-table {

          background:white;
          padding:20px;
          border-radius:12px;
          overflow-x:auto;

        }


        table {

          width:100%;
          border-collapse:collapse;

        }


        th,td {

          padding:15px;
          border-bottom:1px solid #ddd;
          text-align:left;

        }



        body[data-theme="dark"] .revenue-report-page {

          background:#121212;
          color:white;

        }



        body[data-theme="dark"] .revenue-card,
        body[data-theme="dark"] .revenue-table {

          background:#1e1e1e;
          color:white;

        }



        @media(max-width:768px){

          .revenue-report-page{

            padding:20px 15px;

          }

        }

      `}</style>


    </div>
  );
}

export default RevenueReport;