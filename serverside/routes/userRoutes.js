import express from "express";
import { authLogin, authRegister } from "../middlewares/userAuth.js";
import { addExpense, changePassword, getCurrentUser, getExpenses, login, registration, setBudget, setIncome, updateExpenses, updateuser } from "../controllers/userController.js";


const router = express.Router();

router.post("/register",authRegister,registration);
router.post("/login",authLogin,login);
router.post("/getcurrentuser",getCurrentUser);
router.post("/updateuser/:id",updateuser);
router.post("/changePassword/:id",changePassword);
router.post("/budget", setBudget);
router.post("/income", setIncome);
router.post("/addexpense", addExpense);
router.post("/getExpenses", getExpenses);
router.post("/updateExpense", updateExpenses);

export default router;