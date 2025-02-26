import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import CreateUpdateProduct from "./pages/CreateUpdateProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protect Admin Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/products" element={<CreateUpdateProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
