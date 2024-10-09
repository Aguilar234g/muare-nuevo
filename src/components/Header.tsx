import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  const categories = [
    {
      name: 'Mantelería',
      subcategories: ['Manteles antimanchas', 'Manteles tacto tela', 'Manteles redondos antimanchas', 'Manteles XL antimanchas', 'Manteles jacquard antimanchas']
    },
    {
      name: 'Complementos',
      subcategories: ['Manteles individuales', 'Caminos de mesa', 'Delantales', 'Paños de cocina', 'Servilletas', 'Fundas de cojín', 'Rellenos de cojín', 'Colección Waffle']
    },
    {
      name: 'Especial jardín',
      subcategories: ['Cojín para asiento', 'Cojín para silla de exterior', 'Cojín para silla de jardín', 'Cojín para tumbonas', 'Fundas de cojín']
    },
    {
      name: 'Colección 100% lino',
      subcategories: ['Manteles 100% lino', 'Caminos de mesa', 'Servilletas', 'Paños de cocina', 'Delantales', 'Manteles individuales', 'Fundas de cojín']
    }
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto sm:h-10"
              src="/src/assets/muare-logo.svg"
              alt="Muare"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link to={`/products/${category.name.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 hover:text-gray-900 font-medium">
                  {category.name}
                </Link>
                <div className="absolute z-10 left-0 transform -translate-x-1/4 mt-2 px-2 w-screen max-w-xs sm:px-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          to={`/products/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`}
                          className="text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
          
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="mr-4">
              <input
                type="text"
                placeholder="Buscar..."
                className="border rounded-full py-1 px-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            {user ? (
              <>
                <Link to="/wishlist" className="text-gray-400 hover:text-gray-500 mr-4">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="text-gray-400 hover:text-gray-500 mr-4">
                  <ShoppingCart className="h-6 w-6" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-500 hover:text-gray-900">
                    <User className="h-6 w-6 mr-1" />
                    <span>{user.email}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {user.email === 'admin_muare@gmail.com' ? (
                      <>
                        <Link to="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Panel de Admin</Link>
                        <Link to="/admin/products" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Gestionar Productos</Link>
                        <Link to="/admin/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Gestionar Usuarios</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Perfil</Link>
                        <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pedidos</Link>
                      </>
                    )}
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Cerrar sesión</button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-gray-500 hover:text-gray-900">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header