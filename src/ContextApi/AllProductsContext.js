'use client';
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AllProducts = async () => {
      try {
        const res = await fetch('http://157.230.240.97:9999/api/v1/shop/products');
        const json = await res.json();
        setAllProducts(json?.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    AllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for all products fetching
export const useProducts = () => useContext(ProductContext);