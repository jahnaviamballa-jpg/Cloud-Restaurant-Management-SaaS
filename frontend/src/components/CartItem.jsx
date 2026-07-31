function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  console.log("Cart Item:", item);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(20,20,28,.92)",
        padding: "22px",
        marginBottom: "20px",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 12px 30px rgba(0,0,0,.30)",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src={
            item.image_url && item.image_url !== ""
              ? item.image_url
              : "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
          }
          alt={item.name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        <div>
          <h2
            style={{
              color: "white",
              marginBottom: "8px",
            }}
          >
            {item.name}
          </h2>

          <p
            style={{
              color: "#CFCFCF",
              marginBottom: "8px",
            }}
          >
            {item.description}
          </p>

          <h3
            style={{
              color: "#FACC15",
            }}
          >
            ₹{item.price}
          </h3>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => decreaseQuantity(item.id)}
          >
            -
          </button>

          <span
            style={{
              color: "white",
              fontSize: "20px",
            }}
          >
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          style={{
            marginTop: "15px",
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
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