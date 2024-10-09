import React from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { Star } from 'lucide-react'

const products = [
  { id: 1, name: 'Sofá Moderno', price: 599.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', rating: 4.5, reviews: 120, description: 'Sofá moderno y cómodo, perfecto para cualquier sala de estar.' },
  { id: 2, name: 'Lámpara de Mesa', price: 79.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', rating: 4.2, reviews: 85, description: 'Lámpara de mesa elegante con diseño minimalista.' },
  { id: 3, name: 'Alfombra Decorativa', price: 129.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', rating: 4.7, reviews: 200, description: 'Alfombra decorativa de alta calidad con patrones geométricos.' },
  { id: 4, name: 'Mesa de Centro', price: 249.99, image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', rating: 4.3, reviews: 150, description: 'Mesa de centro moderna con acabado en madera natural.' },
]

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-gray-600 mt-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-400 fill-current" size={20} />
            <span className="ml-1 text-lg text-gray-600">{product.rating} ({product.reviews} reseñas)</span>
          </div>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <button 
            onClick={() => addToCart(product)}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reseñas de Clientes</h2>
        {/* Aquí puedes agregar un componente de reseñas de clientes */}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos Relacionados</h2>
        {/* Aquí puedes agregar un componente de productos relacionados */}
      </div>
    </div>
  )
}

export default ProductDetail