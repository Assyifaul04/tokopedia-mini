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
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white shadow-xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Header + Toggle */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h1
            className={`text-xl font-semibold transition-all duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            🛍️ Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white text-xl hover:text-green-400 transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 mt-2">
          <NavItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/AdminCategory" icon={<FaBox />} label="Kategori" isOpen={isOpen} />
          <NavItem to="/AdminProducts" icon={<FaBox />} label="Produk" isOpen={isOpen} />
          <NavItem to="/AdminOrders" icon={<FaShoppingCart />} label="Pesanan" isOpen={isOpen} />
          <NavItem to="/users" icon={<FaUsers />} label="Pengguna" isOpen={isOpen} />
          <NavItem to="/AdminReports" icon={<FaChartLine />} label="Laporan" isOpen={isOpen} />
        </nav>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-500 border-t border-gray-800">
          {isOpen && <span>© 2025 TokoMini</span>}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// Item navigasi dengan styling aktif + transisi icon dan teks
const NavItem = ({ to, icon, label, isOpen }) => {
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
      <span
        className={`ml-3 text-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
};

export default AdminLayout;
