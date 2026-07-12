import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
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

function App() {
  return (
    <BrowserRouter>
    <Navbar />
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
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
<Route path="/inventory" element={<Inventory />} />
<Route path="/add-inventory" element={<AddInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;