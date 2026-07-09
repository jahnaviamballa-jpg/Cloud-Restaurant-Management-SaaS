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
    <div style={{ padding: "30px", background: "#f5f5f5" }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h3>Subtotal: ₹{subtotal}</h3>
        <h3>GST: ₹{gst.toFixed(2)}</h3>
        <h3>Delivery: ₹{delivery}</h3>
        <hr />
        <h2>Total: ₹{total.toFixed(2)}</h2>

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff6b00",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;