import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaBars,
} from 'react-icons/fa';
import Navbar from '../components/AdminNavbar';

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop & drawer for mobile */}
      <div>
        {/* Backdrop overlay (mobile only) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        <aside
          className={`fixed md:static z-50 bg-gray-900 text-white shadow-xl flex flex-col transition-all duration-300 ease-in-out h-full ${
            isOpen ? 'w-64 left-0' : 'w-64 -left-full'
          } md:left-0 md:w-64`}
        >
          {/* Header + Toggle (hidden on mobile) */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between md:block hidden">
            <h1 className="text-xl font-semibold">🛍️ Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 mt-2">
            <NavItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
            <NavItem to="/AdminCategory" icon={<FaBox />} label="Kategori" />
            <NavItem to="/AdminProducts" icon={<FaBox />} label="Produk" />
            <NavItem to="/AdminOrders" icon={<FaShoppingCart />} label="Pesanan" />
            <NavItem to="/users" icon={<FaUsers />} label="Pengguna" />
            <NavItem to="/AdminReports" icon={<FaChartLine />} label="Laporan" />
          </nav>

          {/* Footer */}
          <div className="p-4 text-sm text-gray-500 border-t border-gray-800">
            <span>© 2025 TokoMini</span>
          </div>
        </aside>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Navbar with toggle */}
        <div className="flex items-center justify-between p-4 bg-white shadow md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-2xl"
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
        </div>

        {/* Navbar (desktop) */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// Item navigasi
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-green-600 text-white font-medium shadow-md'
            : 'hover:bg-gray-800 text-gray-300 hover:text-white'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="ml-3 text-sm">{label}</span>
    </NavLink>
  );
};

export default AdminLayout;
