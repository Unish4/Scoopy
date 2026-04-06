import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    quote: "The Madagascar Vanilla is unlike anything I've tasted. You can truly taste the quality in every bite."
  },
  {
    name: "Rahul Thapa",
    quote: "Scoopy has ruined all other ice cream for me. The Pistachio & Rose is an absolute masterpiece."
  },
  {
    name: "Anisha Koirala",
    quote: "A true luxury experience. The presentation, the flavors, the texture — everything is perfection."
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-[#4A3828] mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#E8E1D7] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
              <Quote className="w-8 h-8 text-[#E8D9C5] mb-4 group-hover:text-[#B8956A] transition-colors duration-300" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#B8956A] text-[#B8956A]"
                  />
                ))}
              </div>
              <p className="text-[#6B5A4A] leading-relaxed text-justify grow">
                "{testimonial.quote}"
              </p>
              <p className="text-[#4A3828] mt-6 font-medium">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
