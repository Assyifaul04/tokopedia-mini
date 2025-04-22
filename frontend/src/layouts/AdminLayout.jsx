// src/layouts/AdminLayout.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import Navbar from '../components/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">🛍️ Admin Toko</h1>
          <p className="text-sm text-gray-400 mt-1">Panel Kontrol</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem to="/AdminProducts" icon={<FaBox />} label="Produk" />
          <NavItem to="/users" icon={<FaUsers />} label="Pengguna" />
          <NavItem to="/AdminOrders" icon={<FaShoppingCart />} label="Pesanan" />
          <NavItem to="/AdminReports" icon={<FaChartLine />} label="Laporan" />
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// Sub-komponen untuk item navigasi dengan icon dan style aktif
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded transition ${
          isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-800'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

export default AdminLayout;
