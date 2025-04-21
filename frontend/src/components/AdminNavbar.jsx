// src/components/AdminNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-red-800 text-white flex justify-end items-center px-6 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium hidden sm:inline">👤 Admin</span>
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
