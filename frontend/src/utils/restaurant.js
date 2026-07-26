// ==========================================
// Get Logged In User
// ==========================================
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

// ==========================================
// Get Restaurant ID
// ==========================================
export const getRestaurantId = () => {
  const user = getLoggedInUser();

  return user?.restaurant_id ?? null;
};

// ==========================================
// Get Restaurant Name
// ==========================================
export const getRestaurantName = () => {
  const user = getLoggedInUser();

  return user?.restaurant_name ?? "";
};

// ==========================================
// Get User
// ==========================================
export const getUser = () => {
  return getLoggedInUser();
};

// ==========================================
// Logout
// ==========================================
export const clearRestaurant = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};