import React from "react";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const formattedPrice = item.price ? Number(item.price).toLocaleString("id-ID") : "0";

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={`http://localhost:8000/storage/${item.image}`}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-700">Rp{formattedPrice}</p>

        <div className="flex gap-2 items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="text-sm text-gray-700 hover:text-green-600"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="text-sm text-gray-700">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="text-sm text-gray-700 hover:text-green-600"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemoveItem(item.id)}
          className="mt-4 text-sm text-red-500 hover:text-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CartItem;
