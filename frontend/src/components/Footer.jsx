import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F5F1EB] border-t border-[#E8D9C5]">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12 w-full">
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 gap-4 text-center md:text-left">
            <h3 className="font-serif text-xl text-[#4A3828]">Scoopy</h3>
            <p className="text-[#6B5A4A] text-sm leading-relaxed text-center md:text-justify">
              Scoopy is your go-to destination for delicious ice cream and
              frozen treats! We offer a wide variety of flavors, from classic
              favorites to unique creations. Whether you're craving a scoop of
              creamy vanilla, a rich chocolate fudge, or a fruity sorbet, we've
              got you covered.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full md:w-1/2 gap-4">
            <h4 className="text-sm tracking-wide text-[#4A3828] mb-4 uppercase text-center">
              Quick Links
            </h4>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a
                href="/products"
                className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
              >
                Shop All
              </a>
              <a
                href="/contact"
                className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/about"
                className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
              >
                Our Story
              </a>
              <a
                href="/cart"
                className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
              >
                Shopping Cart
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E8D9C5] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B5A4A] text-sm text-center md:text-left">
            © {new Date().getFullYear()} Scoopy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-[#6B5A4A] text-sm hover:text-[#B8956A] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
