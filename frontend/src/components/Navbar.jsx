import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Bell, Mail, Store, Menu, Search, LogOut
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Ambil data user dari localStorage jika ada
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Hapus token dan user dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect ke halaman login setelah logout
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo + Kategori */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="h-7 w-auto" />
          </Link>

          <div className="relative group">
            <button className="text-sm text-gray-700 font-medium hover:text-green-600">
              Kategori
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 z-50">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Elektronik</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Kesehatan</Link>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari di Tokopedia"
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Right: Icons + Account */}
        <div className="flex items-center gap-4 relative">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-green-600" />
          </Link>
          <Link to="#">
            <Bell className="w-5 h-5 text-gray-700 hover:text-green-600" />
          </Link>
          <Link to="#">
            <Mail className="w-5 h-5 text-gray-700 hover:text-green-600" />
          </Link>
          <Link to="#">
            <Store className="w-5 h-5 text-gray-700 hover:text-green-600" />
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
                <span className="text-sm text-gray-700 truncate max-w-[100px]">{user.name}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl border z-50">
                  <div className="px-4 py-3 border-b">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
                        alt="avatar"
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{user.name}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 px-4 py-3 text-sm">
                    <Link to="/orders" className="hover:text-green-600">Pembelian</Link>
                    <Link to="/wishlist" className="hover:text-green-600">Wishlist</Link>
                    <Link to="#" className="hover:text-green-600">Toko Favorit</Link>
                    <Link to="/profile" className="hover:text-green-600">Pengaturan</Link>
                  </div>

                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-50 gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-green-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}

          <button className="md:hidden">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
