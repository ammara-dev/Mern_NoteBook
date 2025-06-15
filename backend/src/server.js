import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path";



import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimit from "./middleware/rateLimiter.js";


const app = express();
const __dirname = path.resolve()

dotenv.config();
if(process.env.NODE_ENV !== "production"){
app.use(cors({
  origin : "http://localhost:5173",
}))
}

//middleware

app.use(express.json()); // this will parse the JSON body
app.use(rateLimit); // apply rate limiting middleware


if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  })
}

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5001;


connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("server is listening to the PORT:", PORT);
});

})
