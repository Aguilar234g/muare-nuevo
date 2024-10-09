import React, { useState } from 'react'
import { Star } from 'lucide-react'

function ReviewSystem({ productId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la reseña
    console.log('Reseña enviada:', { productId, rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Deja tu reseña</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Escribe tu comentario aquí..."
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Enviar reseña
        </button>
      </form>
    </div>
  )
}

export default ReviewSystem