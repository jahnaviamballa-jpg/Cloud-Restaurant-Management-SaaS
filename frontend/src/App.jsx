import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import EditRestaurant from "./pages/EditRestaurant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantSelection from "./pages/RestaurantSelection";

import RestaurantList from "./pages/RestaurantList";

import CustomerDashboard from "./pages/CustomerDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ChefDashboard from "./pages/ChefDashboard";

import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";

import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
import AddRestaurant from "./pages/AddRestaurant";

import PredictionDashboard from "./pages/PredictionDashboard";
import PredictionDetails from "./pages/PredictionDetails";

import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SalesReport from "./pages/SalesReport";
import RevenueReport from "./pages/RevenueReport";

import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";

function AppContent() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const restaurant = localStorage.getItem("restaurant");

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/server-error";

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

        {/* Default Route */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}

        <Route
          path="/login"
          element={
            token ? (
              (() => {
                const user = JSON.parse(
                  localStorage.getItem("user")
                );

                if (!user) {
                  return <Login />;
                }

                const role =
                  (user.role || "").toLowerCase();

                if (role === "customer") {
                  return restaurant ? (
                    <Navigate
                      to="/dashboard"
                      replace
                    />
                  ) : (
                    <Navigate
                      to="/select-restaurant"
                      replace
                    />
                  );
                }

                if (role === "manager") {
                  return (
                    <Navigate
                      to="/manager-dashboard"
                      replace
                    />
                  );
                }

                if (role === "owner") {
                  return (
                    <Navigate
                      to="/owner-dashboard"
                      replace
                    />
                  );
                }

                if (role === "chef") {
                  return (
                    <Navigate
                      to="/chef-dashboard"
                      replace
                    />
                  );
                }

                return <Login />;
              })()
            ) : (
              <Login />
            )
          }
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Restaurant Selection */}

        <Route
          path="/select-restaurant"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
                "Chef",
              ]}
            >
              <RestaurantSelection />
            </ProtectedRoute>
          }
        />
        <Route
  path="/edit-restaurant/:restaurantId"
  element={
    <ProtectedRoute
      allowedRoles={["Owner"]}
    >
      <EditRestaurant />
    </ProtectedRoute>
  }
/>
        {/* Customer */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Customer"]}
            >
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manager */}

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Manager"]}
            >
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner */}

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Owner"]}
            >
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Chef */}

        <Route
          path="/chef-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Chef"]}
            >
              <ChefDashboard />
            </ProtectedRoute>
          }
        />

        {/* Restaurant List */}

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
                {/* Menu */}

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
  path="/edit-menu/:menuId"
  element={
    <ProtectedRoute
      allowedRoles={["Owner", "Manager"]}
    >
      <EditMenuItem />
    </ProtectedRoute>
  }
/>
        {/* Cart */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute
              allowedRoles={["Customer"]}
            >
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Orders */}

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

        {/* Reservations */}

        <Route
          path="/reservations"
          element={
            <ProtectedRoute
              allowedRoles={["Customer"]}
            >
              <Reservations />
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
                "Chef",
              ]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Inventory */}

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
  path="/add-restaurant"
  element={
    <ProtectedRoute
      allowedRoles={["Owner"]}
    >
      <AddRestaurant />
    </ProtectedRoute>
  }
/>

        {/* Predictions */}

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

        {/* Analytics */}

        <Route
          path="/analytics-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Owner"]}
            >
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-report"
          element={
            <ProtectedRoute
              allowedRoles={["Owner"]}
            >
              <SalesReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/revenue-report"
          element={
            <ProtectedRoute
              allowedRoles={["Owner"]}
            >
              <RevenueReport />
            </ProtectedRoute>
          }
        />

        {/* Error Pages */}

        <Route
          path="/server-error"
          element={<ServerError />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
  path="/add-menu-item"
  element={
    <ProtectedRoute
      allowedRoles={["Owner", "Manager"]}
    >
      <AddMenuItem />
    </ProtectedRoute>
  }
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