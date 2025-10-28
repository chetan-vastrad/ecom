import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { allProducts, searchQuery, setSearchQuery } = useContext(ProductContext);
  const dispatch = useDispatch();
  // Filter products for the category
  const products = useMemo(() => {
    console.log("allProducts:", allProducts);
    let results = [...allProducts];
    // console.log(results);
    
    if (categoryName && categoryName !== "all") {
      results = results.filter(
        (p) => p.category.toLowerCase() === categoryName.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return results;
  }, [categoryName, allProducts, searchQuery]);

  const handelAddToCart = (p) =>{
 dispatch(addToCart(p));
  }
  return (
    <div className="px-10 py-6 ">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {categoryName === "all" ? "All Products" : categoryName}
      </h1>

      <input
        type="text"
        placeholder="Search within category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded px-4 py-2 mb-6 w-full md:w-1/3"
      />

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-md text-center flex flex-col">
              <img src={`https://ecom-qca1.onrender.com${p.image}`} alt={p.name} className="w-full h-40 object-contain mb-3" />
              <h3 className="text-lg font-semibold text-black">{p.name}</h3>
              <h3 className="text-xxl font-semibold text-gray-500 ">{p.description}</h3>
              <p className="text-indigo-600 font-bold mt-2">${p.price}</p>
              <button 
              onClick={()=>handelAddToCart(p)}
              className="mt-5 bg-blue-500 text-black px-6 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white transition duration-300 font-semibold flex items-center gap-2 justify-center">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
