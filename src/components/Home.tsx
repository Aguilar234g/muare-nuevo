import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const backgroundImages = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
]

function Home() {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <div 
        className="h-screen bg-cover bg-center transition-all duration-1000 flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Bienvenido a MuareHome</h1>
          <p className="text-xl md:text-2xl mb-8">Descubre la belleza en cada rincón de tu hogar</p>
          <Link to="/products" className="bg-white text-gray-800 py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300 inline-flex items-center">
            Ver Productos
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryCard title="Muebles" image="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
          <CategoryCard title="Decoración" image="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
          <CategoryCard title="Iluminación" image="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Productos Más Vendidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProductCard name="Sofá Moderno" price={599.99} image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <ProductCard name="Lámpara de Mesa" price={79.99} image="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <ProductCard name="Alfombra Decorativa" price={129.99} image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <ProductCard name="Mesa de Centro" price={249.99} image="https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ title, image }) {
  return (
    <Link to={`/category/${title.toLowerCase()}`} className="relative overflow-hidden rounded-lg shadow-lg group">
      <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
      </div>
    </Link>
  )
}

function ProductCard({ name, price, image }) {
  return (
    <Link to={`/product/${name.toLowerCase().replace(/ /g, '-')}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default Home