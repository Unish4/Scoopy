import React from 'react';
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedProduct = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-4xl font-serif text-[#474a28] mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-[#6B5A4A] max-w-3xl mx-auto leading-relaxed font-serif">
              Discover our handpicked selection of the finest ice cream flavors,
              crafted with love and quality ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#B8956A] text-[#B8956A] rounded-full hover:bg-[#B8956A] hover:text-white transition-all duration-300"
            >
              View All Flavors
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
  );
}

export default FeaturedProduct;
