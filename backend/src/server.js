import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimit from "./middleware/rateLimiter.js";


const app = express();


dotenv.config();
//middleware
app.use(cors({
  origin : "http://localhost:5173",
}))
app.use(express.json()); // this will parse the JSON body
app.use(rateLimit); // apply rate limiting middleware
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5001;


connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("server is listening to the PORT:", PORT);
});

})
