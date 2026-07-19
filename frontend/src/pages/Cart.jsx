import CartItem from "../components/CartItem";

const cartItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 299,
    quantity: 2,
    image: "https://picsum.photos/200?random=31",
  },
  {
    id: 2,
    name: "Mango Juice",
    price: 99,
    quantity: 1,
    image: "https://picsum.photos/200?random=32",
  },
];

function Cart() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const delivery = 50;
  const total = subtotal + gst + delivery;

  
    return (
  <div
    style={{
      minHeight: "100vh",
      padding: "40px",
      background:
        "linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.22)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
      <div
  style={{
    background: "rgba(18,18,24,.75)",
    borderRadius: "25px",
    padding: "35px",
    border: "1px solid rgba(255,255,255,.08)",
  }}
>
  <h1
    style={{
      color: "white",
      fontSize: "42px",
      marginBottom: "10px",
    }}
  >
    🛒 Your Cart
  </h1>

  <p
    style={{
      color: "#CFCFD5",
      fontSize: "18px",
      marginBottom: "35px",
    }}
  >
    Review your delicious order before checkout.
  </p>

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
>
  {cartItems.map((item) => (
    <CartItem key={item.id} item={item} />
  ))}
</div>

      <div
  style={{
    marginTop: "40px",
    background: "rgba(20,20,28,.92)",
    borderRadius: "22px",
    padding: "30px",
    border: "1px solid rgba(255,255,255,.08)",
  }}
>
        <h2
  style={{
    color: "white",
    marginBottom: "25px",
  }}
>
  Order Summary
</h2>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    color: "#D4D4D8",
    marginBottom: "15px",
  }}
>
  <span>Subtotal</span>
  <span>₹{subtotal}</span>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    color: "#D4D4D8",
    marginBottom: "15px",
  }}
>
  <span>GST (5%)</span>
  <span>₹{gst.toFixed(2)}</span>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    color: "#D4D4D8",
    marginBottom: "20px",
  }}
>
  <span>Delivery Fee</span>
  <span>₹{delivery}</span>
</div>

<hr
  style={{
    border: "1px solid rgba(255,255,255,.08)",
    marginBottom: "20px",
  }}
/>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
  }}
>
  <span>Total</span>
  <span style={{ color: "#F97316" }}>
    ₹{total.toFixed(2)}
  </span>
</div>
<div
  style={{
    marginTop: "30px",
    marginBottom: "25px",
  }}
>
  <input
    placeholder="🎟 Enter Coupon Code"
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,.08)",
      background: "#181822",
      color: "white",
      fontSize: "16px",
      boxSizing: "border-box",
      outline: "none",
    }}
  />
</div>

        <button
          style={{
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#7C3AED,#F97316)",
  color: "white",
  fontWeight: "700",
  fontSize: "17px",
  cursor: "pointer",
}}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
     </div> 
  );
}

export default Cart;