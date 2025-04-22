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
import Register from './pages/auth/Register'

import Cart from './pages/user/Cart'
import Checkout from './pages/user/Checkout'
import Home from './pages/user/Home'
import Orders from './pages/user/Orders'
import ProductDetail from './pages/user/ProductDetail'

const router = [
  // Auth
  { path: '/login', component: Login, layout: React.Fragment },
  { path: '/register', component: Register, layout: React.Fragment },

  // Admin
  { path: '/dashboard', component: Dashboard, layout: AdminLayout },
  { path: '/AdminCategory', component: AdminCategory, layout: AdminLayout },
  { path: '/AdminOrders', component: AdminOrders, layout: AdminLayout },
  { path: '/AdminProducts', component: AdminProducts, layout: AdminLayout },
  { path: '/AdminReports', component: AdminReports, layout: AdminLayout },
  { path: '/users', component: Users, layout: AdminLayout },

  // User
  { path: '/', component: Home, layout: UserLayout },
  { path: '/cart', component: Cart, layout: UserLayout },
  { path: '/checkout', component: Checkout, layout: UserLayout },
  { path: '/orders', component: Orders, layout: UserLayout },
  { path: '/product/:id', component: ProductDetail, layout: UserLayout },
]

export default router
