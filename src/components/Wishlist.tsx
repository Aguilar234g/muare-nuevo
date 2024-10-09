import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Heart } from 'lucide-react'

function Wishlist() {
  const { addToCart } = useCart()
  const wishlist = [
    { id: 1, name: 'Sofá Moderno', price: 599.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
    { id: 2, name: 'Lámpara de Mesa', price: 79.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu Lista de Deseos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Añadir al Carrito
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <Heart size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist