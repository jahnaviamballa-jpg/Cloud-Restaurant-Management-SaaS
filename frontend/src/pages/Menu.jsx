import { useState, useEffect } from "react";
import { getMenuByRestaurant } from "../api/menuApi";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);

        // Restaurant ID = 1 (change later if needed)
        const data = await getMenuByRestaurant(1);

        setFoods(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Menu...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "80px",
          fontSize: "20px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", background: "#f5f5f5" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="https://picsum.photos/1000/250"
          alt="Restaurant"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <h1>🍽️ Restaurant Menu</h1>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))
        ) : (
          <h3>No food items found.</h3>
        )}
      </div>
    </div>
  );
}

export default Menu;