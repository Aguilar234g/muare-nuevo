import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Pencil, Trash2, Plus, Upload, Link } from 'lucide-react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const categories = [
  {
    name: 'Mantelería',
    subcategories: ['Manteles antimanchas', 'Manteles tacto tela', 'Manteles redondos antimanchas', 'Manteles XL antimanchas', 'Manteles jacquard antimanchas']
  },
  {
    name: 'Complementos',
    subcategories: ['Manteles individuales', 'Caminos de mesa', 'Delantales', 'Paños de cocina', 'Servilletas', 'Fundas de cojín', 'Rellenos de cojín', 'Colección Waffle']
  },
  {
    name: 'Especial jardín',
    subcategories: ['Cojín para asiento', 'Cojín para silla de exterior', 'Cojín para silla de jardín', 'Cojín para tumbonas', 'Fundas de cojín']
  },
  {
    name: 'Colección 100% lino',
    subcategories: ['Manteles 100% lino', 'Caminos de mesa', 'Servilletas', 'Paños de cocina', 'Delantales', 'Manteles individuales', 'Fundas de cojín']
  }
]

function ProductManagement() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', images: [], category: '', subcategory: '' })
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
  }

  if (!user || user.email !== 'admin_muare@gmail.com') {
    return <Navigate to="/login" replace />
  }

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product })
  }

  const handleUpdateProduct = async () => {
    await updateDoc(doc(db, "products", editingProduct.id), editingProduct);
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
    setEditingProduct(null)
    fetchProducts()
  }

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(p => p.id !== id))
  }

  const handleAddProduct = async () => {
    const docRef = await addDoc(collection(db, "products"), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }])
    setNewProduct({ name: '', price: '', description: '', images: [], category: '', subcategory: '' })
    fetchProducts()
  }

  const handleAddImage = (productId, imageUrl) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, images: [...editingProduct.images, imageUrl] })
    } else {
      setProducts(products.map(p => p.id === productId ? { ...p, images: [...p.images, imageUrl] } : p))
    }
  }

  const handleFileUpload = (e, productId) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleAddImage(productId, reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlUpload = (productId) => {
    if (imageUrl) {
      handleAddImage(productId, imageUrl)
      setImageUrl('')
    }
  }

  const handleCategoryChange = (e, isEditing) => {
    const selectedCategory = e.target.value
    if (isEditing) {
      setEditingProduct({ ...editingProduct, category: selectedCategory, subcategory: '' })
    } else {
      setNewProduct({ ...newProduct, category: selectedCategory, subcategory: '' })
    }
  }

  const renderCategorySelect = (product, isEditing) => (
    <select
      value={product.category}
      onChange={(e) => handleCategoryChange(e, isEditing)}
      className="w-full mb-2 p-2 border rounded"
    >
      <option value="">Selecciona una categoría</option>
      {categories.map((category) => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  )

  const renderSubcategorySelect = (product, isEditing) => {
    const selectedCategory = categories.find(c => c.name === product.category)
    return (
      <select
        value={product.subcategory}
        onChange={(e) => isEditing 
          ? setEditingProduct({ ...editingProduct, subcategory: e.target.value })
          : setNewProduct({ ...newProduct, subcategory: e.target.value })
        }
        className="w-full mb-2 p-2 border rounded"
        disabled={!product.category}
      >
        <option value="">Selecciona una subcategoría</option>
        {selectedCategory?.subcategories.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>
      
      {/* Lista de productos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Productos Existentes</h2>
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">Precio: €{product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">Categoría: {product.category}</p>
            <p className="text-gray-600">Subcategoría: {product.subcategory}</p>
            <div className="flex flex-wrap mt-2">
              {product.images.map((img, index) => (
                <img key={index} src={img} alt={`${product.name} ${index + 1}`} className="w-20 h-20 object-cover m-1 rounded" />
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEditProduct(product)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                <Pencil size={16} className="inline mr-1" /> Editar
              </button>
              <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                <Trash2 size={16} className="inline mr-1" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de edición */}
      {editingProduct && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Nombre del producto"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Precio"
            />
            <textarea
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Descripción"
            />
            {renderCategorySelect(editingProduct, true)}
            {renderSubcategorySelect(editingProduct, true)}
            <div className="flex flex-wrap mt-2">
              {editingProduct.images.map((img, index) => (
                <img key={index} src={img} alt={`${editingProduct.name} ${index + 1}`} className="w-20 h-20 object-cover m-1 rounded" />
              ))}
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, editingProduct.id)}
                className="hidden"
                id={`file-upload-${editingProduct.id}`}
              />
              <label
                htmlFor={`file-upload-${editingProduct.id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
              >
                <Upload size={16} className="inline mr-1" /> Subir imagen
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-grow p-2 border rounded"
                placeholder="URL de la imagen"
              />
              <button
                onClick={() => handleUrlUpload(editingProduct.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                <Link size={16} className="inline mr-1" /> Agregar URL
              </button>
            </div>
            <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Guardar Cambios
            </button>
          </div>
        </div>
      )}

      {/* Formulario para agregar nuevo producto */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Agregar Nuevo Producto</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Nombre del producto"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Precio"
          />
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Descripción"
          />
          {renderCategorySelect(newProduct, false)}
          {renderSubcategorySelect(newProduct, false)}
          <div className="flex flex-wrap mt-2">
            {newProduct.images.map((img, index) => (
              <img key={index} src={img} alt={`Nueva imagen ${index + 1}`} className="w-20 h-20 object-cover m-1 rounded" />
            ))}
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'new')}
              className="hidden"
              id="file-upload-new"
            />
            <label
              htmlFor="file-upload-new"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
            >
              <Upload size={16} className="inline mr-1" /> Subir imagen
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-grow p-2 border rounded"
              placeholder="URL de la imagen"
            />
            <button
              onClick={() => handleUrlUpload('new')}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              <Link size={16} className="inline mr-1" /> Agregar URL
            </button>
          </div>
          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Plus size={16} className="inline mr-1" /> Agregar Producto
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductManagement