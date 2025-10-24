import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import connectToDB from "./config/db.js";
import cors from "cors";
import fs from "fs";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

// ✅ Proper CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ✅ JSON body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Created uploads folder");
}

// ✅ Serve uploaded images
app.use("/uploads", express.static(uploadDir));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 App running on http://${HOST}:${PORT}`);
});
