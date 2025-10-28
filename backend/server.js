import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDB from "./config/db.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS setup (dev vs prod)
const corsOptions = {
  origin: [
    "https://ecom-1-dhs7.onrender.com/", // local frontend
    process.env.FRONTEND_URL || "", // production frontend
  ],
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

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Serve React frontend (for Render)
// const frontendPath = path.join(__dirname, "../frontend/dist");
// if (fs.existsSync(frontendPath)) {
//   app.use(express.static(frontendPath));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/^\/.*$/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
