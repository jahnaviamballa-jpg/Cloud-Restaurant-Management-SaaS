import { useState, useEffect } from "react";
import { getMenuByRestaurant } from "../api/menuApi";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { getSelectedRestaurant } from "../utils/restaurant";
function Menu() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const restaurant = getSelectedRestaurant();
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMenuByRestaurant();

        console.log("Menu API Response:", data);

        const menuItems = Array.isArray(data)
          ? data
          : Array.isArray(data?.menu)
          ? data.menu
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setFoods(menuItems);
      } catch (err) {
        console.error("Menu Error:", err);
        setFoods([]);
        setError("Unable to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const name = food?.name || "";
    const category = food?.category || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      category === selectedCategory;

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
  <div
    style={{
      minHeight: "100vh",
      padding: "40px",
      background:
        "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
      <div
  style={{
    background: "rgba(18,18,24,.70)",
    borderRadius: "25px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,.08)",
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

       <h1
  style={{
    color: "white",
    fontSize: "38px",
    marginTop: "25px",
    marginBottom: "8px",
  }}
>
  🍽️ {restaurant?.name || "Restaurant"} Menu
</h1>

<p
  style={{
    color: "#cfcfcf",
    fontSize: "17px",
  }}
>
  Freshly prepared delicious meals for you.
</p>
      </div>

      <div
  style={{
    background: "rgba(20,20,28,.75)",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,.08)",
  }}
>
  <SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
  />

  <div style={{ marginTop: "20px" }}>
    <CategoryFilter
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  </div>
</div>

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