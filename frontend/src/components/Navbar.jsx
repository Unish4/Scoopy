import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../assets/image.png";
import { ShoppingBag, Menu, X, Home, Store, MessageSquare, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur/70 border-b border-[#E8D9C5]/60 transition-all duration-300">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center font-serif text-2xl tracking-wide text-[#474a28] hover:text-[#bfc725] transition-colors duration-300 z-50"
        >
          <img
            src={home}
            alt="Scoopy logo"
            className="mr-1 w-20 h-12 object-cover"
          />
          Scoopy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to={"/"}
            className="text-md tracking-wide flex items-center gap-2 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to={"/products"}
            className="text-md tracking-wide flex items-center gap-2 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <Store className="w-4 h-4" /> Shop
          </Link>
          <Link
            to={"/contact"}
            className="text-md tracking-wide flex items-center gap-2 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <MessageSquare className="w-4 h-4" /> Contact
          </Link>
          <Link
            to={"/about"}
            className="text-md tracking-wide flex items-center gap-2 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <BookOpen className="w-4 h-4" /> Our Story
          </Link>
          <Link
            to={"/cart"}
            className="text-md tracking-wide transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <ShoppingBag className="w-5 h-5 text-[#4A3828] hover:text-[#B8956A] transition-colors duration-300" />
          </Link>
        </div>

        {/* Mobile Navigation Icons */}
        <div className="flex items-center gap-6 md:hidden z-50">
          <Link to="/cart">
            <ShoppingBag className="w-6 h-6 text-[#4A3828] hover:text-[#B8956A] transition-colors duration-300" />
          </Link>
          <button 
            onClick={toggleMenu} 
            className="text-[#4A3828] hover:text-[#B8956A] focus:outline-none transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8D9C5]/60 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 py-6 shadow-lg' : 'max-h-0 py-0 border-transparent'
        }`}
      >
        <div className="flex flex-col gap-6 px-6">
          <Link
            to={"/"}
            onClick={toggleMenu}
            className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            to={"/products"}
            onClick={toggleMenu}
            className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <Store className="w-5 h-5" /> Shop
          </Link>
          <Link
            to={"/contact"}
            onClick={toggleMenu}
            className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <MessageSquare className="w-5 h-5" /> Contact
          </Link>
          <Link
            to={"/about"}
            onClick={toggleMenu}
            className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <BookOpen className="w-5 h-5" /> Our Story
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
