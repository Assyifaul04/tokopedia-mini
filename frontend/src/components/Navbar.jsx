// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">TokoOnline</Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-4">
          {/* Kategori Dropdown (dummy) */}
          <div className="relative group hidden md:block">
            <button className="text-sm font-medium text-gray-700 hover:text-green-600">
              Kategori
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 w-40">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Elektronik</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Kesehatan</Link>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">
              2
            </span>
          </Link>

          {/* User / Login */}
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-green-600">
            Login
          </Link>

          {/* Register Button */}
          <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700">
            Register
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
