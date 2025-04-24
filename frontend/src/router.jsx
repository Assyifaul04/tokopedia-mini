import React from 'react'

import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'

import AdminOrders from './pages/admin/AdminOrders'
import AdminCategory from './pages/admin/AdminCategory'
import AdminProducts from './pages/admin/AdminProducts'
import Dashboard from './pages/admin/Dashboard'
import AdminReports from './pages/admin/AdminReports'
import Users from './pages/admin/Users'

import Login from './pages/auth/Login'
import AdminLogin from './pages/auth/AdminLogin'
import Register from './pages/auth/Register'

import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import Home from './pages/user/Home'
import Orders from './pages/user/Orders'
import ProductDetail from './pages/user/ProductDetail'

import PrivateRoute from './cache/PrivateRoute'
import UserPrivateRoute from './cache/UserPrivateRoute'

const router = [
  // Auth
  {path: '/admin/login', component: AdminLogin, layout: React.Fragment},
  { path: '/login', component: Login, layout: React.Fragment },
  { path: '/register', component: Register, layout: React.Fragment },

  // Admin (dengan proteksi)
  {
    path: '/dashboard',
    component: Dashboard,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/AdminCategory',
    component: AdminCategory,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/AdminOrders',
    component: AdminOrders,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/AdminProducts',
    component: AdminProducts,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/AdminReports',
    component: AdminReports,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/users',
    component: Users,
    layout: ({ children }) => (
      <PrivateRoute>
        <AdminLayout>{children}</AdminLayout>
      </PrivateRoute>
    ),
  },

  // User (tanpa proteksi untuk sekarang, bisa ditambahkan nanti)
  { path: '/', component: Home, layout: UserLayout },
  {
    path: '/cart',
    component: Cart,
    layout: ({ children }) => (
      <UserPrivateRoute>
        <UserLayout>{children}</UserLayout>
      </UserPrivateRoute>
    ),
  },
  {
    path: '/checkout',
    component: Checkout,
    layout: ({ children }) => (
      <UserPrivateRoute>
        <UserLayout>{children}</UserLayout>
      </UserPrivateRoute>
    ),
  },
  {
    path: '/orders',
    component: Orders,
    layout: ({ children }) => (
      <UserPrivateRoute>
        <UserLayout>{children}</UserLayout>
      </UserPrivateRoute>
    ),
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    layout: UserLayout, //bebas
  },
]

export default router
