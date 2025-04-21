// src/components/AdminNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const adminData =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleToggle = () => setOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white text-black px-6 py-4 shadow-md w-full z-40">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-700">Admin Panel</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {adminData?.name || "Admin"}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {adminData?.email || "admin@example.com"}
                </p>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                {/* Tambahkan menu lainnya di sini */}
                <li>
                  <button
                    onClick={() => navigate("/admin/settings")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    ⚙️ Pengaturan Akun
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
                  >
                    🔓 Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
