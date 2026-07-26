import {
  exportCSV,
  exportPDF,
  printDashboard,
} from "../utils/exportUtils";

function ExportButtons({
  predictions,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => exportCSV(predictions)}
        style={styles.green}
      >
        📊 Export CSV
      </button>

      <button
        onClick={() => exportPDF(predictions)}
        style={styles.red}
      >
        📄 Export PDF
      </button>

      <button
        onClick={printDashboard}
        style={styles.blue}
      >
        🖨 Print
      </button>
    </div>
  );
}

const styles = {
  green: {
    background: "#22C55E",
    color: "white",
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  red: {
    background: "#EF4444",
    color: "white",
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  blue: {
    background: "#2563EB",
    color: "white",
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ExportButtons;