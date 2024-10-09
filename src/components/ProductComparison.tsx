import React from 'react'

function ProductComparison() {
  const products = [
    { id: 1, name: 'Sofá Moderno', price: 599.99, material: 'Cuero', color: 'Negro', dimensions: '200x90x80 cm' },
    { id: 2, name: 'Sofá Clásico', price: 499.99, material: 'Tela', color: 'Beige', dimensions: '180x85x75 cm' },
    { id: 3, name: 'Sofá Esquinero', price: 799.99, material: 'Microfibra', color: 'Gris', dimensions: '250x200x85 cm' },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Comparación de Productos</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Producto</th>
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Material</th>
              <th className="py-3 px-6 text-left">Color</th>
              <th className="py-3 px-6 text-left">Dimensiones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.material}</td>
                <td className="py-3 px-6 text-left">{product.color}</td>
                <td className="py-3 px-6 text-left">{product.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductComparison