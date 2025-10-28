import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //  const res = await axios.get("https://ecom-qca1.onrender.com/api/products");
    const fetchAllProduct = async () =>{
        try {
            const res = await axios.get("https://ecom-qca1.onrender.com/api/products");
            // console.log(res.data.product);
             setAllProducts(res.data.product);
    setFilteredProducts(res.data.product);
            
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    fetchAllProduct();
  }, []);

  useEffect(() => {
    let results = [...allProducts];
    if (searchQuery.trim()) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(results);
  }, [searchQuery, allProducts]);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        filteredProducts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
