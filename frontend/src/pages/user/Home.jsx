// src/pages/user/Home.jsx
import React from 'react';
import ProductCard from '../../components/ProductCard';



const Home = () => {
  return (
    <>
      <h1>Selamat datang di Toko Online</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ProductCard />
      </div>
    </>
  );
};


export default Home;

