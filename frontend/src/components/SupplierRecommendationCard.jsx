function SupplierRecommendationCard({
  item,
  quantity,
  urgency,
}) {
  const getColor = () => {
    switch (urgency) {
      case "Critical":
        return "#DC2626";

      case "High":
        return "#F59E0B";

      default:
        return "#22C55E";
    }
  };

  const getDelivery = () => {
    switch (urgency) {
      case "Critical":
        return "24 Hours";

      case "High":
        return "2 Days";

      default:
        return "4 Days";
    }
  };

  const getSupplier = () => {
    switch (urgency) {
      case "Critical":
        return "Express Supplier";

      case "High":
        return "Premium Supplier";

      default:
        return "Regular Supplier";
    }
  };

  return (
    <div
      style={{
        background: "rgba(20,20,28,.92)",
        borderRadius: "20px",
        padding: "25px",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 10px 20px rgba(0,0,0,.3)",
      }}
    >
      <h3
        style={{
          color: "#60A5FA",
          marginBottom: "20px",
        }}
      >
        🚚 Supplier Recommendation
      </h3>

      <p>
        <strong>Item :</strong> {item}
      </p>

      <p>
        <strong>Recommended Qty :</strong> {quantity}
      </p>

      <p>
        <strong>Supplier :</strong> {getSupplier()}
      </p>

      <p>
        <strong>Delivery :</strong> {getDelivery()}
      </p>

      <div
        style={{
          marginTop: "18px",
          background: getColor(),
          padding: "10px",
          borderRadius: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {urgency} Priority
      </div>
    </div>
  );
}

export default SupplierRecommendationCard;