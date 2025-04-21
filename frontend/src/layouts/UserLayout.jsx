import React from 'react';
import Navbar from '../components/Navbar';


const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
     
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
