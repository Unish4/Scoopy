import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<div className="py-20 text-center"><h1 className="text-3xl">Contact Page - Coming Soon</h1></div>} />
          <Route path="/about" element={<div className="py-20 text-center"><h1 className="text-3xl">About Page - Coming Soon</h1></div>} />
          <Route path="/cart" element={<div className="py-20 text-center"><h1 className="text-3xl">Cart Page - Coming Soon</h1></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
