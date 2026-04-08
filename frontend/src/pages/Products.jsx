import React from "react";
import { useState, useMemo } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const flavorFilters = [
    { value: "all", label: "All" },
    { value: "classic", label: "Classic" },
    { value: "specialty", label: "Specialty" },
    { value: "vegan", label: "Vegan" },
    { value: "sugar-free", label: "Sugar-Free" },
  ];

  const priceFilters = [
    { value: "all", label: "All Prices" },
    { value: "under-18", label: "Under $18" },
    { value: "18-20", label: "$18 - $20" },
    { value: "over-20", label: "Over $20" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under-18" && product.price < 18) ||
        (priceFilter === "18-20" &&
          product.price >= 18 &&
          product.price <= 20) ||
        (priceFilter === "over-20" && product.price > 20);

      return matchesCategory && matchesPrice;
    });
  }, [categoryFilter, priceFilter]);

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        {/* Headers section */}
        <div className="mt-16 mb-12 text-center">
          <h1 className="font-serif text-5xl text-[#4A3828] mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-[#6B5A4A] max-w-2xl mx-auto">
            Explore our complete selection of handcrafted artisan ice cream,
            each flavor a journey of taste and luxury.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-[#B8956A]" />
            <h2 className="text-lg text-[#4A3828]">Filters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Category Filters */}
            <div>
              <label className="text-sm text-[#6B5A4A] mb-3 block uppercase tracking-wide">
                Category
              </label>
              <div className="flex flex-wrap gap-3">
                {flavorFilters.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCategoryFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      categoryFilter === option.value
                        ? "bg-[#B8956A] text-white"
                        : "bg-[#F5F1EB] text-[#6B5A4A] hover:bg-[#E8D9C5]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filters */}
            <div>
              <label className="text-sm text-[#6B5A4A] mb-3 block uppercase tracking-wide">
                Price Range
              </label>
              <div className="flex flex-wrap gap-3">
                {priceFilters.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      priceFilter === option.value
                        ? "bg-[#B8956A] text-white"
                        : "bg-[#F5F1EB] text-[#6B5A4A] hover:bg-[#E8D9C5]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-[#6B5A4A]">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "flavor" : "flavors"}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#6B5A4A] text-lg">
              No products match your current filters. Try adjusting your
              selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
