import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes/userRoutes.js"
import cors from "cors";

dotenv.config();
            
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api",router);


mongoose.connect(process.env.MONGODB)
.then(()=>{console.log("DB connection established")})
.catch(()=>{console.log("DB error:",err)})


const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{console.log(`working on port: ${PORT}`)});
