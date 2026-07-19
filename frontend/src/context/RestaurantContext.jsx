import { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const savedRestaurant = localStorage.getItem("restaurant");

    if (savedRestaurant) {
      setRestaurant(JSON.parse(savedRestaurant));
    }
  }, []);

  const selectRestaurant = (restaurantData) => {
    localStorage.setItem(
      "restaurant",
      JSON.stringify(restaurantData)
    );

    setRestaurant(restaurantData);
  };

  const clearRestaurant = () => {
    localStorage.removeItem("restaurant");
    setRestaurant(null);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        selectRestaurant,
        clearRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}