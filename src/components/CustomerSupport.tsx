import React, { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'

function CustomerSupport() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: 'user', message }])
      setMessage('')
      // Aquí iría la lógica para procesar el mensaje y obtener una respuesta del bot
      setTimeout(() => {
        setChatHistory(prev => [...prev, { sender: 'bot', message: 'Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto.' }])
      }, 1000)
    }
  }

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Soporte al Cliente</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
              &times;
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-2 ${chat.sender === 'user' ? 'text-right' : ''}`}>
                <span className={`inline-block p-2 rounded-lg ${chat.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {chat.message}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default CustomerSupport