import express from "express";
import { authLogin, authRegister } from "../middlewares/userAuth.js";
import { addExpense, changePassword, getCurrentUser, login, registration, setBudget, updateuser } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",authRegister,registration);
router.post("/login",authLogin,login);
router.post("/getcurrentuser",getCurrentUser);
router.post("/updateuser/:id",updateuser);
router.post("/changePassword/:id",changePassword);
router.post("/setBudget", setBudget);
router.post("/addExpense", addExpense);

export default router;