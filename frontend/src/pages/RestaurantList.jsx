import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
  {
    id: 1,
    name: "Paradise Restaurant",
    location: "Hyderabad",
    rating: 4.7,
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Meghana Foods",
    location: "Bengaluru",
    rating: 4.8,
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Bawarchi",
    location: "Hyderabad",
    rating: 4.6,
    image: "https://picsum.photos/300/200?random=3",
  },
];

function RestaurantList() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Restaurants
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;