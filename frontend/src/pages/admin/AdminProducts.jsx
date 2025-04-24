import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import { motion, AnimatePresence } from "framer-motion"; // 👉 for animation
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";

const Button = ({ children, icon: Icon, ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm ${
      props.disabled
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 text-white"
    } ${props.className || ""}`}
  >
    {Icon && <Icon className="text-sm" />}
    {children}
  </button>
);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: null,
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

  const handleToggleStatus = async (product) => {
    try {
      await axios.put(`/admin/products/${product.id}/status`, {
        is_active: !product.is_active,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Produk berhasil ${
          product.is_active ? "dinonaktifkan" : "diaktifkan"
        }.`,
      });
      fetchProducts(); // Refresh data produk
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui status produk.",
      });
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
      id: product.id, // simpan ID produk
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      is_active: product.is_active,
      category_id: product.category_id,
      image: null, // Gambar di-reset pada saat edit untuk upload ulang
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    const confirmation = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data produk yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "ml-2 bg-red-600 hover:bg-red-700  text-white font-semibold px-4 py-2 rounded",
        cancelButton:
          "ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded",
      },
    });

    if (!confirmation.isConfirmed) return;

    try {
      await axios.delete(`/admin/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Produk berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus produk.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
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
        if (key === "image" && val) {
          formData.append("image", val);
        } else {
          formData.append(key, key === "is_active" ? (val ? 1 : 0) : val);
        }
      });

      if (form.id) {
        // Update existing product
        formData.append("_method", "PUT");

        await axios.post(`/admin/products/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({
          title: "Berhasil!",
          text: "Produk berhasil diperbarui.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Create new product
        const response = await axios.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setProducts([...products, response.data]);

        Swal.fire({
          title: "Berhasil!",
          text: "Produk baru berhasil ditambahkan.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }

      // Reset form
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
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data produk.");

      Swal.fire({
        title: "Gagal!",
        text: "Untuk mengganti nama produk, Anda juga perlu memperbarui gambar produk yang terkait. Pastikan perubahan tersebut dilakukan secara bersamaan agar konsistensi data antara nama dan gambar produk tetap terjaga.",
        icon: "error",
        confirmButtonColor: "#d33",
      });

      console.log(err.response?.data?.errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 relative">
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Manajemen Produk
          </h1>
          <Button onClick={() => setShowForm(!showForm)} icon={FaPlus}>
            {showForm ? "Tutup Form" : "Tambah Produk"}
          </Button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Produk Table */}
        <div className="overflow-x-auto shadow-lg border rounded-xl mb-8 bg-white">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-5 py-4 border-b text-left">Gambar</th>
                <th className="px-5 py-4 border-b text-left">Nama</th>
                <th className="px-5 py-4 border-b text-left">Deskripsi</th>
                <th className="px-5 py-4 border-b text-left">Harga</th>
                <th className="px-5 py-4 border-b text-left">Stok</th>
                <th className="px-5 py-4 border-b text-center">Status</th>
                <th className="px-5 py-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((prod) => (
                <tr
                  key={prod.id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-5 py-4 text-center">
                    {prod.image ? (
                      <img
                        src={`http://localhost:8000/storage/${prod.image}`}
                        alt={prod.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400 italic">Tidak Ada</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium">{prod.name}</td>
                  <td className="px-5 py-4 text-gray-600">
                    {prod.description}
                  </td>
                  <td className="px-5 py-4 font-semibold text-blue-600">
                    Rp{parseInt(prod.price).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">{prod.stock}</td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        prod.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {prod.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                    <div className="mt-2">
                      <button
                        onClick={() => handleToggleStatus(prod)}
                        className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                          prod.is_active
                            ? "bg-rose-500 hover:bg-rose-600 text-white"
                            : "bg-emerald-500 hover:bg-emerald-600 text-white"
                        }`}
                      >
                        {prod.is_active ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center space-x-2">
                    <Button
                      onClick={() => handleEdit(prod)}
                      icon={FaEdit}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(prod.id)}
                      icon={FaTrash}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm"
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
              className="absolute right-6 top-20 z-50 bg-white p-6 rounded-xl ring-1 ring-gray-200 drop-shadow-xl backdrop-blur w-full max-w-lg"
            >
              <h2 className="text-xl font-semibold mb-4">
                📝 Tambah / Edit Produk
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm({ ...form, category_id: e.target.value })
                  }
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Stok"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    icon={FaTimes}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting} icon={FaSave}>
                    {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
