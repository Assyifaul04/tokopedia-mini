import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow p-4">
      <img
        src={product?.image || "/images/user-avatar.png"}
        alt={product?.name || "Product"}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="mt-2 text-lg font-semibold">
        {product?.name || "Nama Produk"}
      </h3>
      <p className="text-gray-600">Rp{product?.price || "0"}</p>
      <Link
        to={`/product/${product?.id || "#"}`}
        className="mt-2 inline-block text-sm text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function ProductCard({ product }) {
//   return (
//     <div className="border rounded shadow p-4">
//       <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
//       <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
//       <p className="text-gray-600">Rp{product.price}</p>
//       <Link
//         to={`/product/${product.id}`}
//         className="mt-2 inline-block text-sm text-blue-500 hover:underline"
//       >
//         View Details
//       </Link>
//     </div>
//   )
// }
