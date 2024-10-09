import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { user, logout } = useAuth()

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu perfil.</div>
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu Perfil</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl mb-4">Nombre: {user.name}</p>
        <p className="text-xl mb-4">Email: {user.email}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Profile