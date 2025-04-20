// src/components/CartItem.jsx
import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
      <div className="flex flex-col flex-grow ml-4">
        <span className="font-bold">{item.name}</span>
        <span className="text-sm text-gray-500">{item.price}</span>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="px-2 py-1 border rounded text-sm"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded text-sm"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline">
        Hapus
      </button>
    </div>
  );
};

export default CartItem;
