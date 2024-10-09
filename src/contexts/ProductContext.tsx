import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const docRef = await addDoc(collection(db, "products"), product);
    setProducts([...products, { id: docRef.id, ...product }]);
  };

  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    await updateDoc(doc(db, "products", id), updatedProduct);
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(product => product.id !== id));
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};