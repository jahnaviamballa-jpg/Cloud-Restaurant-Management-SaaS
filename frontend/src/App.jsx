import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

// ==========================
// Pages
// ==========================

import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantSelection from "./pages/RestaurantSelection";

import CustomerDashboard from "./pages/CustomerDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ChefDashboard from "./pages/ChefDashboard";

import RestaurantList from "./pages/RestaurantList";

import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";

import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";

import PredictionDashboard from "./pages/PredictionDashboard";
import PredictionDetails from "./pages/PredictionDetails";

import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SalesReport from "./pages/SalesReport";
import RevenueReport from "./pages/RevenueReport";

import AddRestaurant from "./pages/AddRestaurant";
import EditRestaurant from "./pages/EditRestaurant";

import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";

import AddOrder from "./pages/AddOrder";
import EditOrder from "./pages/EditOrder";
import OrderDetails from "./pages/OrderDetails";

import AddReservation from "./pages/AddReservation";
import EditReservation from "./pages/EditReservation";
import ReservationDetails from "./pages/ReservationDetails";

import ChangePassword from "./pages/ChangePassword";

import ServerError from "./pages/ServerError";
import NotFound from "./pages/NotFound";

function AppContent() {

  const token = localStorage.getItem("token");
  const restaurant = localStorage.getItem("restaurant");

  return (
    <>
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

        {/* ==========================
            Default
        ========================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* ==========================
            Login
        ========================== */}

        <Route
          path="/login"
          element={
            token ? (
              (() => {

                const user = JSON.parse(
                  localStorage.getItem("user")
                );

                if (!user) return <Login />;

                const role =
                  (user.role || "").toLowerCase();

                if (role === "customer") {
                  return restaurant
                    ? <Navigate to="/dashboard" replace />
                    : <Navigate to="/select-restaurant" replace />;
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

        {/* ==========================
            Register
        ========================== */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==========================
            Restaurant Selection
        ========================== */}

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

        {/* ==========================
            Employees
        ========================== */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Owner",
                "Manager",
              ]}
            >
              <Employees />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            Change Password
        ========================== */}

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        {/* ==========================
            Customer Dashboard
        ========================== */}

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

        {/* ==========================
            Manager Dashboard
        ========================== */}

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

        {/* ==========================
            Owner Dashboard
        ========================== */}

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

        {/* ==========================
            Chef Dashboard
        ========================== */}

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

        {/* ==========================
            Restaurants
        ========================== */}

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
          path="/add-restaurant"
          element={
            <ProtectedRoute
              allowedRoles={["Owner"]}
            >
              <AddRestaurant />
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

        {/* ==========================
            Menu
        ========================== */}

        <Route
          path="/menu"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
                "Chef",
              ]}
            >
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-menu"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Owner",
                "Manager",
              ]}
            >
              <AddMenuItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-menu-item/:menuId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Owner",
                "Manager",
              ]}
            >
              <EditMenuItem />
            </ProtectedRoute>
          }
        />
                {/* ==========================
            Cart
        ========================== */}

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

        {/* ==========================
            Orders
        ========================== */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
                "Chef",
              ]}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-order"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <AddOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-order/:orderId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <EditOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
                "Chef",
              ]}
            >
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            Reservations
        ========================== */}

        <Route
          path="/reservations"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
              ]}
            >
              <Reservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-reservation"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
              ]}
            >
              <AddReservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-reservation/:reservationId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
            >
              <EditReservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservation-details/:reservationId"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Customer",
                "Manager",
                "Owner",
              ]}
            >
              <ReservationDetails />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            Profile
        ========================== */}

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

        {/* ==========================
            Inventory
        ========================== */}

        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
                "Chef",
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

        {/* ==========================
            Predictions
        ========================== */}

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

        {/* ==========================
            Analytics
        ========================== */}

        <Route
          path="/analytics-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Owner",
              ]}
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

        {/* ==========================
            Error Pages
        ========================== */}

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