import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then((res) => {
        console.log(res.data); // Cek apakah data produk diterima
        setProducts(res.data.data || []); // Set data produk
      })
      .catch((err) => {
        console.error("Gagal mengambil produk:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Selamat datang di Toko Online</h1>

      {loading ? (
        <p>Loading produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Tidak ada produk yang tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
