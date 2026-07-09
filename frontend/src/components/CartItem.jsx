function CartItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />

        <div>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button>-</button>

        <span style={{ margin: "0 10px" }}>{item.quantity}</span>

        <button>+</button>

        <br /><br />

        <button
          style={{
            background: "red",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;