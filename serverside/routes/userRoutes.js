import express from "express";
import { authLogin, authRegister } from "../middlewares/userAuth.js";
import { getCurrentUser, login, registration } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",authRegister,registration);
router.post("/login",authLogin,login);
router.post("/getcurrentuser",getCurrentUser);


export default router;