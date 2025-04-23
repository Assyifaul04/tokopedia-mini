import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import { motion, AnimatePresence } from "framer-motion"; // 👉 for animation

const Button = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-all ${
      props.disabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 text-white"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    is_active: true,
    category_id: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/admin/categories");
      setCategories(response.data);
    } catch {
      setError("Gagal mengambil data kategori.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/admin/products");
      setProducts(response.data);
    } catch {
      setError("Gagal mengambil data produk.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      is_active: product.is_active,
      category_id: product.category_id,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      await axios.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      setError("Gagal menghapus produk.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) {
      setError("Harap isi semua field yang wajib.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, key === "is_active" ? (val ? 1 : 0) : val);
      });

      const response = await axios.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, response.data]);
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        is_active: true,
        category_id: "",
        image: null,
      });
      setShowForm(false);
    } catch {
      setError("Gagal menambahkan produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛒 Manajemen Produk</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Tutup Form" : "+ Tambah Produk"}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Produk Table */}
      <div className="overflow-x-auto shadow-md border rounded-lg mb-6 bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 border">Gambar</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Deskripsi</th>
              <th className="p-3 border">Harga</th>
              <th className="p-3 border">Stok</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50 transition-all">
                <td className="p-3 border text-center">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded-md mx-auto"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 border">{prod.name}</td>
                <td className="p-3 border">{prod.description}</td>
                <td className="p-3 border">
                  Rp{parseInt(prod.price).toLocaleString()}
                </td>
                <td className="p-3 border">{prod.stock}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      prod.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {prod.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="p-3 border space-x-2 text-center">
                  <Button
                    onClick={() => handleEdit(prod)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(prod.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-6 top-20 z-50 bg-white p-6 shadow-2xl rounded-xl border w-full max-w-lg"
          >
            <h2 className="text-xl font-semibold mb-4">📝 Tambah / Edit Produk</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Produk"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 border rounded-md"
                required
              />
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-3 border rounded-md"
              />
              <input
                type="number"
                placeholder="Harga"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Stok"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full p-3 border rounded-md"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={() =>
                    setForm({ ...form, is_active: !form.is_active })
                  }
                />
                <label className="text-sm">
                  {form.is_active ? "Aktif" : "Nonaktif"}
                </label>
              </div>
              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
                accept="image/*"
              />
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700"
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
