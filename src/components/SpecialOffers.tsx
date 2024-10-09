import React from 'react'
import { Link } from 'react-router-dom'

function SpecialOffers() {
  const offers = [
    { id: 1, name: 'Sofá de Cuero', originalPrice: 999.99, discountedPrice: 799.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
    { id: 2, name: 'Juego de Comedor', originalPrice: 1299.99, discountedPrice: 999.99, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ofertas Especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={offer.image} alt={offer.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{offer.name}</h3>
              <div className="mt-2 flex items-center">
                <span className="text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                <span className="ml-2 text-2xl font-bold text-red-500">${offer.discountedPrice.toFixed(2)}</span>
              </div>
              <Link
                to={`/products/${offer.id}`}
                className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Ver Oferta
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpecialOffers