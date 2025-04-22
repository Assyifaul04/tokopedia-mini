import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { getCsrfToken } from '../../services/axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getCsrfToken();
      const res = await axios.post('/api/login', form);
      const user = res.data;

      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-md bg-white px-8 py-10 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-600">🛍️ tokopedia-mini</h2>
          <p className="text-sm text-gray-500">Silakan login untuk masuk ke akun Anda</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition font-semibold"
          >
            Masuk
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
