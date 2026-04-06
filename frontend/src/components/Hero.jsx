import React from "react";
import backgroundImage from "../assets/home2.jpg";
// import backgroundImage from "../assets/home.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* <div
                className="absolute inset-0 bg-cover"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
            /> */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(250, 248, 245, 0.3), rgba(250, 248, 245, 0.3)), url(${backgroundImage})`,
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-[#3b2818] mb-4">
          Welcome to Scoopy
        </h1>
        <p className="text-lg md:text-xl text-[#2d1910] mb-8 font-mono">
          Indulge in the finest ice cream flavors, crafted with love and quality
          ingredients.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Shop Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
