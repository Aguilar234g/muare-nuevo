import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'

function AdminDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Gestionar Productos</h2>
          <p className="text-gray-600">Ver, editar, eliminar y agregar productos</p>
        </Link>
        {/* Aquí puedes agregar más tarjetas para otras funciones administrativas */}
      </div>
    </div>
  )
}

export default AdminDashboard