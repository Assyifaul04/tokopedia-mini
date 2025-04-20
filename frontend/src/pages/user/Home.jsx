// src/pages/user/Home.jsx
import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import ProductCard from '../../components/ProductCard'; // Komponen untuk menampilkan produk

const Home = () => {
  return (
    <UserLayout>
      <h1>Selamat datang di Toko Online</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ProductCard /> {/* Menampilkan daftar produk */}
        {/* Bisa diisi dengan lebih banyak produk */}
      </div>
    </UserLayout>
  );
};

export default Home;
