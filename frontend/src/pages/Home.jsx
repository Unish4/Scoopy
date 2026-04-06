import React from "react";
import Testimonials from "../components/Testimonials";
import Story from "../components/Story";
import FeaturedProduct from "../components/FeaturedProduct";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Flavor of the month */}

      {/* Featured Products */}
      <FeaturedProduct />

      {/* Our Story Section */}
      <Story />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
