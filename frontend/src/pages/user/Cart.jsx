import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import axios from "../../services/axios"; // Pastikan axios sudah diatur dengan base URL yang benar

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get("/cart");
        setCartItems(res.data.data); // Menyimpan data cart items dari API
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price whenever cart items change
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  // Update quantity of item in the cart
  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      const res = await axios.put(`/cart/${id}`, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: res.data.data.quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Remove item from the cart
  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      setCartItems(cartItems.filter((item) => item.id !== id)); // Update state after removal
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Handle checkout (redirect or trigger checkout process)
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
