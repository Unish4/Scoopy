import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../assets/image.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingBag,
  Menu,
  X,
  Home,
  Store,
  MessageSquare,
  BookOpen,
  User,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const itemCount = getItemCount();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur/70 border-b border-[#E8D9C5]/60 transition-all duration-300">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Mobile Hamburger Menu (Left) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#4A3828] hover:text-[#B8956A] focus:outline-none transition-colors duration-300 z-50"
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>

        {/* Logo (Center on Mobile, Left on Desktop) */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            className="relative text-md tracking-wide transition-colors text-[#4A3828] hover:text-[#B8956A]"
          >
            <ShoppingBag className="w-5 h-5 text-[#4A3828] hover:text-[#B8956A] transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B8956A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 text-md tracking-wide transition-colors text-[#4A3828] hover:text-[#B8956A]"
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:block">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E8D9C5] py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#4A3828] hover:bg-[#F5F1EB] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#4A3828] hover:bg-[#F5F1EB] transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#4A3828] hover:bg-[#F5F1EB] transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-md tracking-wide transition-colors text-[#4A3828] hover:text-[#B8956A]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07F52] transition-all duration-300 text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Shopping Bag (Right) */}
        <div className="flex items-center md:hidden z-50">
          <Link to="/cart" className="relative block">
            <ShoppingBag className="w-6 h-6 text-[#4A3828] hover:text-[#B8956A] transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B8956A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8D9C5]/60 transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? "max-h-96 py-6 shadow-lg"
            : "max-h-0 py-0 border-transparent"
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

          {/* Mobile Auth Links */}
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
              >
                <User className="w-5 h-5" /> Profile
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
                >
                  <Shield className="w-5 h-5" /> Admin
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A] text-left"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
              >
                <User className="w-5 h-5" /> Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="text-lg tracking-wide flex items-center gap-3 transition-colors text-[#4A3828] hover:text-[#B8956A]"
              >
                <User className="w-5 h-5" /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
