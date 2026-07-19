export const getSelectedRestaurant = () => {
  const restaurant = localStorage.getItem("restaurant");

  if (!restaurant) return null;

  return JSON.parse(restaurant);
};

export const getRestaurantId = () => {
  const restaurant = getSelectedRestaurant();

  return restaurant?.id;
};