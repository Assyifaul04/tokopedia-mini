// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white min-h-screen shadow-md">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">🛍️ Admin Toko</h1>
            <p className="text-sm text-gray-400 mt-1">Panel Kontrol</p>
          </div>
          <nav className="p-4 space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Dashboard</Link>
            <Link to="/products" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Produk</Link>
            <Link to="/users" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Pengguna</Link>
            <Link to="/orders" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Pesanan</Link>
            <Link to="/reports" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Laporan</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
