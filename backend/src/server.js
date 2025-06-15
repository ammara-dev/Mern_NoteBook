import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimit from "./middleware/rateLimiter.js";

const app = express();
const __dirname = path.resolve();

dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

// Middleware
app.use(express.json());
app.use(rateLimit);

// ===================================
//         ** THE FIX **
// API routes ko yahan define karein
// ===================================
app.use("/api/notes", notesRoutes);

// Ab Production-specific logic ko handle karein
if (process.env.NODE_ENV === "production") {
  // Static files ko serve karein
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Baaki sab requests ke liye index.html bhej dein (Catch-all)
  // Ye hamesha API routes ke baad aana chahye
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is listening to the PORT:", PORT);
  });
});