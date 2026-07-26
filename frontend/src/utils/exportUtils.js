import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportCSV(predictions) {
  const rows = predictions.map((item) => ({
    Item: item.item_name,
    Stock: item.current_stock,
    Minimum: item.minimum_stock,
    Recommendation: item.recommendation,
    Confidence: item.confidence,
  }));

  const header = Object.keys(rows[0] || {});
  const csv = [
    header.join(","),
    ...rows.map((r) =>
      header.map((h) => r[h]).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "AI_Predictions.csv";
  link.click();
}

export function exportPDF(predictions) {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "AI Inventory Prediction Report",
    14,
    18
  );

  autoTable(doc, {
    head: [
      [
        "Item",
        "Stock",
        "Minimum",
        "Recommendation",
        "Confidence",
      ],
    ],

    body: predictions.map((item) => [
      item.item_name,
      item.current_stock,
      item.minimum_stock,
      item.recommendation,
      item.confidence + "%",
    ]),
  });

  doc.save("AI_Report.pdf");
}

export function printDashboard() {
  window.print();
}