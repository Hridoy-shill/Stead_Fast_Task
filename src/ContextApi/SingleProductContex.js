'use client';
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const SingleProductContext = createContext();

// Provider component
export const SingleProductProvider = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState([]);
  const [SingleLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // ✅ Proxy route used here instead of HTTP API
        const res = await fetch('/api/proxy/product/iphone-15-plus');
        const json = await res.json();
        setSingleProduct(json?.data || []);
      } catch (err) {
        console.error('Failed to fetch single product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, []);

  return (
    <SingleProductContext.Provider value={{ singleProduct, SingleLoading }}>
      {children}
    </SingleProductContext.Provider>
  );
};

// Custom hook for single product fetching
export const useSingleProduct = () => useContext(SingleProductContext);
