import express from "express";
import { authRegister } from "../middlewares/userAuth.js";
import { registration } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",authRegister,registration);


export default router;