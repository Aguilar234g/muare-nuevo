import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Lock, Unlock } from 'lucide-react'

// Simulación de una base de datos de usuarios
const initialUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'user', isOnline: true, isBlocked: false, discount: 10 },
  { id: 2, name: 'María García', email: 'maria@example.com', role: 'user', isOnline: false, isBlocked: false, discount: 15 },
  { id: 3, name: 'Admin', email: 'admin_muare@gmail.com', role: 'admin', isOnline: true, isBlocked: false, discount: 0 },
]

function UserManagement() {
  const { user } = useAuth()
  const [users, setUsers] = useState(initialUsers)

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isOnline: !u.isOnline } : u
    ))
  }

  const toggleUserBlock = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isBlocked: !u.isBlocked, discount: u.isBlocked ? u.discount : 0 } : u
    ))
  }

  const updateUserDiscount = (userId, newDiscount) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, discount: parseInt(newDiscount) } : u
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Bloqueado
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Descuento
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold ${user.isOnline ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 ${user.isOnline ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{user.isOnline ? 'En línea' : 'Desconectado'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold ${user.isBlocked ? 'text-red-900' : 'text-green-900'} leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 ${user.isBlocked ? 'bg-red-200' : 'bg-green-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{user.isBlocked ? 'Bloqueado' : 'Activo'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input
                    type="number"
                    value={user.discount}
                    onChange={(e) => updateUserDiscount(user.id, e.target.value)}
                    className="w-16 px-2 py-1 border rounded"
                    min="0"
                    max="100"
                    disabled={user.isBlocked}
                  />
                  <span className="ml-1">%</span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Cambiar estado
                  </button>
                  <button
                    onClick={() => toggleUserBlock(user.id)}
                    className={`${user.isBlocked ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'}`}
                  >
                    {user.isBlocked ? <Unlock size={20} /> : <Lock size={20} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement