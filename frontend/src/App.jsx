import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";

import ManagerDashboard from "./pages/ManagerDashboard";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";

import PredictionDashboard from "./pages/PredictionDashboard";
import PredictionDetails from "./pages/PredictionDetails";

import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SalesReport from "./pages/SalesReport";
import RevenueReport from "./pages/RevenueReport";

import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

function AppContent() {
  const location = useLocation();

  const validPaths = [
    "/",
    "/login",
    "/register",
    "/restaurants",
    "/dashboard",
    "/menu",
    "/cart",
    "/orders",
    "/reservations",
    "/profile",
    "/manager-dashboard",
    "/inventory",
    "/add-inventory",
    "/predictions",
    "/analytics-dashboard",
    "/sales-report",
    "/revenue-report",
    "/server-error",
  ];

  const isPredictionDetails =
    location.pathname.startsWith("/predictions/");

  const isValidPath =
    validPaths.includes(location.pathname) || isPredictionDetails;

  const hideNavbar =
    !isValidPath || location.pathname === "/server-error";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/dashboard" element={<RestaurantDashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/manager-dashboard"
          element={<ManagerDashboard />}
        />

        <Route path="/inventory" element={<Inventory />} />

        <Route
          path="/add-inventory"
          element={<AddInventory />}
        />

        <Route
          path="/predictions"
          element={<PredictionDashboard />}
        />

        <Route
          path="/predictions/:id"
          element={<PredictionDetails />}
        />

        <Route
          path="/analytics-dashboard"
          element={<AnalyticsDashboard />}
        />

        <Route path="/sales-report" element={<SalesReport />} />

        <Route
          path="/revenue-report"
          element={<RevenueReport />}
        />

        <Route
          path="/server-error"
          element={<ServerError />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;