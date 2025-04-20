import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center">
        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover mr-4" />
        <div>
          <h4 className="text-lg font-semibold">{item.product.name}</h4>
          <p className="text-sm text-gray-500">Rp{item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-4">x{item.quantity}</span>
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
