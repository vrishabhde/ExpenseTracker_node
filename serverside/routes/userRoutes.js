import express from "express";
import { authLogin, authRegister } from "../middlewares/userAuth.js";
import { login, registration } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",authRegister,registration);
router.post("/login",authLogin,login);


export default router;