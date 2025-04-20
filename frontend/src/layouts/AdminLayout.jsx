// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>
          <ul>
            <li>
              <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Produk</Link>
            </li>
            <li>
              <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Pengguna</Link>
            </li>
            <li>
              <Link to="/admin/orders" className="block py-2 px-4 hover:bg-gray-700">Pesanan</Link>
            </li>
            <li>
              <Link to="/admin/reports" className="block py-2 px-4 hover:bg-gray-700">Laporan</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
