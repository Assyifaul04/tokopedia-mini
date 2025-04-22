// src/services/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Sesuaikan dengan URL backend Anda
  withCredentials: true,  // Pastikan ini diaktifkan jika menggunakan autentikasi berbasis cookie
});

export default instance;
