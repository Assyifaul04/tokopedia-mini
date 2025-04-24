import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from '../../services/axios';

const AdminCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/admin/categories');
      setCategories(response.data);
    } catch (error) {
      setError('Gagal mengambil data kategori.');
    }
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;

    try {
      if (editId) {
        await axios.put(`/admin/categories/${editId}`, { name: categoryName });
        Swal.fire('Berhasil', 'Kategori berhasil diupdate', 'success');
      } else {
        await axios.post('/admin/categories', { name: categoryName });
        Swal.fire('Berhasil', 'Kategori berhasil ditambahkan', 'success');
      }

      setCategoryName('');
      setEditId(null);
      setIsFormOpen(false);
      fetchCategories();
    } catch (error) {
      setError('Gagal menyimpan kategori.');
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'ml-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded',
        cancelButton: 'ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded',
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/admin/categories/${id}`);
        fetchCategories();
        Swal.fire('Dihapus!', 'Kategori berhasil dihapus.', 'success');
      } catch (error) {
        setError('Gagal menghapus kategori.');
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 relative">
        <div className="flex justify-between items-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Kategori</h1>
          <div className="relative">
            <button
              onClick={() => {
                setCategoryName('');
                setEditId(null);
                setIsFormOpen(!isFormOpen);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl shadow hover:bg-green-700 transition"
            >
              <FiPlus className="text-base" /> Tambah Kategori
            </button>

            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 bg-white w-96 p-6 rounded-xl shadow-xl border z-10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{editId ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
                    <button
                      onClick={() => {
                        setIsFormOpen(false);
                        setCategoryName('');
                        setEditId(null);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nama kategori"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setIsFormOpen(false);
                        setCategoryName('');
                        setEditId(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {editId ? 'Update' : 'Simpan'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 border">#</th>
                <th className="px-6 py-3 border">Nama Kategori</th>
                <th className="px-6 py-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">Belum ada kategori.</td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 border">{index + 1}</td>
                    <td className="px-6 py-3 border">{category.name}</td>
                    <td className="px-6 py-3 border text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition"
                        >
                          <FiEdit className="text-sm" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                          <FiTrash2 className="text-sm" /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
