function CartItem({ item }) {
  return (
    <div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(20,20,28,.92)",
    padding: "22px",
    marginBottom: "20px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,.08)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 30px rgba(0,0,0,.30)",
    transition: ".3s",
  }}
>
    
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "15px",
            objectFit: "cover",
          }}
        />

        <div>
  <h2
    style={{
      color: "white",
      marginBottom: "10px",
    }}
  >
    {item.name}
  </h2>

  <h3
    style={{
      color: "#F97316",
      margin: 0,
    }}
  >
    ₹{item.price}
  </h3>

  <p
    style={{
      color: "#BDBDBD",
      marginTop: "10px",
      fontSize: "15px",
    }}
  >
    Freshly prepared with premium ingredients.
  </p>
</div>
      </div>

      <div style={{ textAlign: "center" }}>
       <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  }}
>

  <button
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      border: "none",
      background: "#7C3AED",
      color: "white",
      fontSize: "22px",
fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    −
  </button>

  <span
    style={{
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      minWidth: "30px",
    }}
  >
    {item.quantity}
  </span>

  <button
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      border: "none",
      background: "#F97316",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
    }}
  >
    +
  </button>
</div>

        <br /><br />

        <button
          style={{
  marginTop: "18px",
  padding: "10px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#DC2626",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
}}
        >
          🗑 Remove Item
        </button>
      </div>
    </div>
  );
}

export default CartItem;