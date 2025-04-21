import React from 'react'

export default function CartItem({ item }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-700">Rp{item.price}</p>
      </div>
    </div>
  )
}
