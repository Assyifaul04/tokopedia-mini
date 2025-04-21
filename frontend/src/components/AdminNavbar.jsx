// src/components/AdminNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  // Ambil data admin dari localStorage atau sessionStorage
  const adminData = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // kalau kamu simpan token juga
    sessionStorage.clear(); // opsional: hapus juga sessionStorage
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex justify-end items-center space-x-4">
        {/* Nama admin */}
        <span className="hidden sm:inline text-sm font-medium">
          👤 {adminData?.name || 'Admin'}
        </span>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
