import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useProducts } from '../contexts/ProductContext'
import { Star } from 'lucide-react'

function Products() {
  const { addToCart } = useCart()
  const { products } = useProducts()
  const { category, subcategory } = useParams()
  const location = useLocation()

  const filteredProducts = products.filter(product => {
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (subcategory && product.subcategory.toLowerCase() !== subcategory.toLowerCase()) {
      return false;
    }
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true;
  })

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {subcategory || category || 'Todos los Productos'}
      </h2>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron productos que coincidan con su búsqueda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500">{product.name}</h3>
                </Link>
                <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products