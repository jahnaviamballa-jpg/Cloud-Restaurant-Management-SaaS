import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import RestaurantList from "./pages/RestaurantList";
import RestaurantDashboard from "./pages/RestaurantDashboard";

import ManagerDashboard from "./pages/ManagerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ChefDashboard from "./pages/ChefDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";


import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";

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
    "/manager-dashboard",
    "/owner-dashboard",
    "/chef-dashboard",
    "/menu",
    "/cart",
    "/orders",
    "/reservations",
    "/profile",
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
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Customer */}

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Customer"]}>
      <CustomerDashboard />
    </ProtectedRoute>
  }
/>

        {/* Manager */}

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner */}

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Chef */}

        <Route
          path="/chef-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Chef"]}>
              <ChefDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Protected Routes */}

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
              ]}
            >
              <RestaurantList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Chef",
              ]}
            >
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Chef",
              ]}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <Reservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Chef",
                "Owner",
              ]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-inventory"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <AddInventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predictions"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <PredictionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predictions/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <PredictionDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Owner"]}>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-report"
          element={
            <ProtectedRoute allowedRoles={["Owner"]}>
              <SalesReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/revenue-report"
          element={
            <ProtectedRoute allowedRoles={["Owner"]}>
              <RevenueReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/server-error"
          element={<ServerError />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

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