import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [adminData, setAdminData] = useState({ name: "Admin", email: "admin@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAdminData(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggle = () => setOpen((prev) => !prev);

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
    <header className="bg-white shadow-md w-full z-40 px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">Admin Panel</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleToggle}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={open}
          >
            <FaUserCircle className="text-2xl text-gray-600" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-medium text-gray-700">
                {adminData.name}
              </span>
              <span className="text-xs text-gray-500">
                {adminData.email}
              </span>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {adminData.email}
                </p>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-150"
                  >
                    ⚙️ Pengaturan Akun
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-150 text-red-600"
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
