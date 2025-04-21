import React from 'react'

import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'

import Dashboard from './pages/admin/Dashboard'
import OrdersAdmin from './pages/admin/Orders'
import Products from './pages/admin/Products'
import Reports from './pages/admin/Reports'
import Users from './pages/admin/Users'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import Home from './pages/user/Home'
import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import Orders from './pages/user/Orders'
import ProductDetail from './pages/user/ProductDetail'

const router = [
  // Auth
  { path: '/login', component: Login, layout: React.Fragment },
  { path: '/register', component: Register, layout: React.Fragment },

  // Admin
  { path: '/admin', component: Dashboard, layout: AdminLayout },
  { path: '/admin/orders', component: OrdersAdmin, layout: AdminLayout },
  { path: '/admin/products', component: Products, layout: AdminLayout },
  { path: '/admin/reports', component: Reports, layout: AdminLayout },
  { path: '/admin/users', component: Users, layout: AdminLayout },

  // User
  { path: '/', component: Home, layout: UserLayout },
  { path: '/cart', component: Cart, layout: UserLayout },
  { path: '/checkout', component: Checkout, layout: UserLayout },
  { path: '/orders', component: Orders, layout: UserLayout },
  { path: '/product/:id', component: ProductDetail, layout: UserLayout },
]

export default router
