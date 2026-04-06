import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Home />
      <Footer />
    </>
  );
};

export default App;
