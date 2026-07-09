function RestaurantCard({ restaurant }) {
  return (
    <div
      style={{
        width: "280px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        background: "#fff",
      }}
    >
      <img
        src={
          restaurant.logo_url ||
          "https://via.placeholder.com/280x180"
        }
        alt={restaurant.restaurant_name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{restaurant.restaurant_name}</h3>

      <p>{restaurant.address}</p>

      <p>
        {restaurant.city}, {restaurant.state}
      </p>

      <button>View Menu</button>
    </div>
  );
}

export default RestaurantCard;