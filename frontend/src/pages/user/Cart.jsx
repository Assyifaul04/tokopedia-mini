import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleUpdateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Keranjang Anda kosong.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Harga:</span>
            <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition transform hover:scale-105"
              onClick={handleCheckout}
            >
              Lanjutkan ke Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
