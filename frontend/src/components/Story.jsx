import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Truck } from "lucide-react";

const Story = () => {
  return (
    <section className="py-20 bg-[#F5F1EB]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-[#4A3828] mb-4">
              Crafted with Passion
            </h2>
            <p className="text-lg text-[#6B5A4A] max-w-3xl mx-auto leading-relaxed font-serif">
              At Scoopy, we believe that exceptional ice cream begins with
              exceptional ingredients. Every icecream is handcrafted in small
              batches using organic dairy from local farms and the finest
              ingredients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E1D7] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#F5F1EB] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-[#B8956A] transition-all duration-300">
                <Leaf className="w-8 h-8 text-[#B8956A] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3 group-hover:text-[#B8956A] transition-colors duration-300">
                Organic Ingredients
              </h3>
              <p className="text-[#6B5A4A] text-sm leading-relaxed">
                We source only the finest organic ingredients, ensuring every
                scoop is pure indulgence.
              </p>
            </div>

            <div className="relative group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E1D7] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#F5F1EB] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-[#B8956A] transition-all duration-300">
                <Heart className="w-8 h-8 text-[#B8956A] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3 group-hover:text-[#B8956A] transition-colors duration-300">
                Handcrafted Daily
              </h3>
              <p className="text-[#6B5A4A] text-sm leading-relaxed">
                Each batch is made by hand in small quantities, ensuring peak
                freshness and flavor.
              </p>
            </div>

            <div className="relative group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E1D7] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#F5F1EB] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-[#B8956A] transition-all duration-300">
                <Truck className="w-8 h-8 text-[#B8956A] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3 group-hover:text-[#B8956A] transition-colors duration-300">
                Fresh Delivery
              </h3>
              <p className="text-[#6B5A4A] text-sm leading-relaxed">
                Delivered quickly in temperature-controlled packaging to ensure
                every scoop arrives perfectly fresh.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#4A3828] text-[#4A3828] rounded-full hover:bg-[#4A3828] hover:text-white transition-all duration-300"
            >
              Read Our Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
