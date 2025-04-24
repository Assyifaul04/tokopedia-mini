import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const isActive =
    product?.is_active === true ||
    product?.is_active === 1 ||
    product?.is_active === "1";

  if (!isActive) {
    console.log(`Produk "${product?.name}" tidak aktif, tidak ditampilkan.`);
    return null;
  }

  const productImage = product?.image
    ? `http://localhost:8000/storage/${product.image}`
    : "/images/default-image.png";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      <img
        src={productImage}
        alt={product?.name || "Product"}
        className="w-full h-56 object-cover rounded-t-xl"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {product?.name || "Nama Produk"}
        </h3>
        <p className="text-lg text-amber-600 font-bold mt-2">
          Rp{Number(product?.price || 0).toLocaleString("id-ID")}
        </p>
        <Link
          to={`/product/${product?.id || "#"}`}
          className="mt-4 inline-block text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
