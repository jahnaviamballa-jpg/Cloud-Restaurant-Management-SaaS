import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { RestaurantProvider } from "./context/RestaurantContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </AuthProvider>
  </StrictMode>
);