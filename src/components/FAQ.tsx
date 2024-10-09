import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: '¿Cuál es el tiempo de entrega?',
    answer: 'El tiempo de entrega estándar es de 3 a 5 días hábiles. Para zonas remotas, puede tomar hasta 7 días hábiles.'
  },
  {
    question: '¿Cómo puedo realizar un seguimiento de mi pedido?',
    answer: 'Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en nuestra página de seguimiento de pedidos.'
  },
  {
    question: '¿Cuál es la política de devoluciones?',
    answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto. El artículo debe estar en su estado original y sin usar.'
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Preguntas Frecuentes</h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ