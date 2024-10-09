import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Trash2 } from 'lucide-react'

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tu Carrito</h2>
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tu Carrito</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
          Proceder al Pago
        </button>
      </div>
    </div>
  )
}

export default Cart