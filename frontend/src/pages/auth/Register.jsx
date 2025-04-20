import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getCsrfToken } from '../../services/axios'; // Pastikan mengimpor getCsrfToken

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mendapatkan token CSRF sebelum mengirimkan request register
      await getCsrfToken();

      // Kirim data register ke backend
      const res = await axios.post('/api/register', form);

      // Jika berhasil, simpan data user ke localStorage
      localStorage.setItem('user', JSON.stringify(res.data));

      // Arahkan user ke halaman utama setelah registrasi berhasil
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Menampilkan error validasi dari backend
        setError(Object.values(err.response.data.errors).join(', '));
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Konfirmasi Password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-6 border rounded"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;
