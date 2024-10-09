import React, { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para suscribir al newsletter
    console.log('Suscrito al newsletter:', email)
    setEmail('')
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Suscríbete a nuestro Newsletter</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex items-center border-b border-blue-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Suscribirse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newsletter