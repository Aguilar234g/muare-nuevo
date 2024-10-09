import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ProductProvider } from './contexts/ProductContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Profile from './components/Profile'
import AdminDashboard from './components/AdminDashboard'
import ProductManagement from './components/ProductManagement'
import UserManagement from './components/UserManagement'

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<ProductManagement />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App