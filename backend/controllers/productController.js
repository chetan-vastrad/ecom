import {Product} from "../model/Product.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import path from "path";

// Create Product
const ALLOWED_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Mobiles",
  "Clothing",
  "Shoes",
  "Beauty",
  "Toys",
  "Groceries"
];
const createProduct = async (req,res) =>{
    try {
    const {name,description,price,category,image,stock} = req.body;
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category selected!" });
    }
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await Product.create({
        name,description,price,category,image:imagePath,stock
    })
    res.status(200).json({message:"Product Created !", product});
    } catch (error) {
        res.status(400).json({message:"Product Not created !",error})
    }
}

// Get All Product 
const getAllProducts = async (req,res)=>{
    try {
        const product = await Product.find().sort({ createdAt: -1 });
        if(!product){
        return res.status(400).json({message:"Product Not Avalibale !"})
        }
        res.status(200).json({message:"All Product List !",product});
    } catch (error) {
        return res.status(400).json({message:"In Catch Block Product Not Avalibale !"})
    }
}

// Get Single Product
const getSingleProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        const singleProduct = await Product.findById(id);
        console.log(singleProduct);
        if(!singleProduct){
            res.status(400).json({message:"Product Not Found !"});
        }
        res.status(200).json({message:"Produt Found", singleProduct});
    } catch (error) {
        res.status(400).json({message:"Product Not Found Ctach Block!"});   
    }
}

// Update Products
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const updatedData = {
      name,
      description,
      price,
      category,
      stock,
    };

    // If there's a new image file uploaded
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product Not Found!" });
    }

    res.status(200).json({ message: "Product Updated!", product });
  } catch (error) {
    console.error("Error in updateProduct:", error.message, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Dlete Products 
const deleteProduct = async(req,res) =>{
    try {
        const productID = await Product.findByIdAndDelete(req.params.id);
        if(!productID){
            return res.status(400).json({message:"Prodcut Not Found !"});
        }
        res.status(200).json({message:"Product Deleted!"});
    } catch (error) {
    return res.status(400).json({message:"Prodcut Not Found In Catch Block!"});
    }
}

export {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct}