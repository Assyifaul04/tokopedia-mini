import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Produk tidak ditemukan atau terjadi kesalahan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post("/cart", {
        product_id: product.id,
        quantity: quantity
      });
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };

  const handleBuyNow = () => {
    console.log("Melakukan pembelian produk:", product, quantity);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const productImage = product?.image
    ? `http://localhost:8000/storage/${product.image}`
    : "/images/default-image.png";

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-xl mt-10">
      <div>
        <img
          src={productImage}
          alt={product?.name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product?.name}</h1>
          <p className="text-xl text-amber-600 font-semibold mb-4">
            Rp{Number(product?.price).toLocaleString("id-ID")}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product?.description || "Deskripsi produk belum tersedia."}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="text-gray-700 font-semibold">Jumlah:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition transform hover:scale-105"
          >
            Tambah ke Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
