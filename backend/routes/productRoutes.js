import express from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";
import { protect,authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";


const router =express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

// Admin routes
router.post('/', protect, authorizeRoles('admin'),  upload.single("image"),createProduct);
router.put('/:id', protect, authorizeRoles('admin'), upload.single("image"),updateProduct);
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct);

export default router;