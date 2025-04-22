// src/pages/admin/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null,  // To store image file
    stock_quantity: "",
    is_active: true,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/admin/products");
    setProducts(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get("/admin/categories");
    setCategories(response.data);
  };

  const handleSubmit = async () => {
    try {
      console.log(form); // Log the form data
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category_id", form.category_id);
      formData.append("stock_quantity", form.stock_quantity);
      formData.append("is_active", form.is_active); // Ensure it's a boolean (true/false)
  
      if (form.image) {
        formData.append("image", form.image); // Adding image if present
      }
  
      if (form.id) {
        await axios.post(`/admin/products/${form.id}?_method=PUT`, formData);
        Swal.fire("Berhasil", "Produk berhasil diupdate", "success");
      } else {
        await axios.post("/admin/products", formData);
        Swal.fire("Berhasil", "Produk berhasil ditambahkan", "success");
      }
      setIsFormOpen(false);
      setForm({
        id: null,
        name: "",
        description: "",
        price: "",
        category_id: "",
        image: "",
        stock_quantity: "",
        is_active: true,
      });
      fetchProducts();
    } catch (error) {
      console.error(error.response?.data); // Log detailed error response from server
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan produk", "error");
    }
  };
  

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      image: product.image,  // Handle existing image
      stock_quantity: product.stock_quantity,
      is_active: product.is_active,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus produk?",
      text: "Tindakan ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      await axios.delete(`/admin/products/${id}`);
      fetchProducts();
      Swal.fire("Dihapus!", "Produk berhasil dihapus.", "success");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
          <button
            onClick={() => {
              setForm({
                id: null,
                name: "",
                description: "",
                price: "",
                category_id: "",
                image: null,
                stock_quantity: "",
                is_active: true,
              });
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FiPlus /> Tambah Produk
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Harga</th>
                <th className="border px-4 py-2">Stok</th>
                <th className="border px-4 py-2">Kategori</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">
                    Rp{parseFloat(product.price).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{product.stock_quantity}</td>
                  <td className="border px-4 py-2">
                    {product.category?.name || "-"}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {form.id ? "Edit Produk" : "Tambah Produk"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <FiX />
              </button>
            </div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama"
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Deskripsi"
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Harga"
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <input
              type="number"
              value={form.stock_quantity}
              onChange={(e) =>
                setForm({ ...form, stock_quantity: e.target.value })
              }
              placeholder="Stok"
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="w-full mb-2 px-4 py-2 border rounded"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
                className="h-4 w-4"
              />
              <span>Produk Aktif</span>
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {form.id ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
