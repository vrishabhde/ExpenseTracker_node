import users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { newPasswordValidation } from "../utils/newPasswordValidation.js";


export const registration = async (req, res) => {
    try {

        const { username, email, password, contact } = req.body;

        const checkContact = await users.findOne({ email }).exec();

        if (checkContact) return res.status(400).json({ status: 400, success: false, message: "This Email is Already Have an Account" });

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username, email, contact,
            password: hashpassword
        });

        await newUser.save();

        return res.status(201).json({ status: 201, success: true, message: "You Have Registered Successfully." });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error Occured in controller." });
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await users.findOne({ email }).exec();
        if (!existUser) return res.status(404).json({ status: 404, success: false, message: "User not found." });

        const userId = { id: existUser._id };
        const token = jwt.sign(userId, process.env.jwtsecret);
        return res.status(200).json({ status: 200, success: true, message: "Logged in successfully.", token: token, userdata: existUser });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error." });
    }
}




export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;

        const decodeToken = jwt.verify(token, process.env.jwtsecret);
        const userId = decodeToken.id;
        const user = await users.findById(userId).select("-password").exec();
        console.log(user, "checkuser")
        if (user) {

            return res.status(200).json({ status: 200, success: true, data: user });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error." });
    }
}


export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, contact, username } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, status: 400, message: "id is required" });
        }


        const response = await users.findByIdAndUpdate(id, { email, contact, username }, { new: true }).exec();
        console.log(response, "response");
        return res.status(200).json({ success: true, message: "Your profile updated successfully", data: response });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error.message });
    }
}



export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, newPassword, confirmNewPassword } = req.body;

        if (!password) return res.status(400).json({ status: 400, success: false, message: "Old Password is required." });

        if (!newPassword) return res.status(400).json({ status: 400, success: false, message: "New Password is required." });

        if (!confirmNewPassword) return res.status(400).json({ status: 400, success: false, message: "Confirm Password is required." });

        const user = await users.findById(id).exec();

        if (!user) return res.status(404).json({ status: 404, success: false, message: "User not found." });

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) return res.status(400).json({ status: 400, success: false, message: "Incorrect old password." });

        try {
            newPasswordValidation(newPassword);
        } catch (error) {
            return res.status(400).json({ status: 400, success: false, message: error.message });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ status: 400, success: false, message: "New password and confirm new password must be identical." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({ status: 200, success: true, message: "Password updated successfully." });

    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: error.message });
    }
};


export const setIncome = async (req, res) => {
    try {
        const { income, id } = req.body;

        if (!income || isNaN(income) || income < 0) {
            return res.status(400).json({ status: 400, success: false, message: 'Invalid income value.' });
        }

        const user = await users.findByIdAndUpdate(id, { income }, { new: true });
        console.log(user, "user")
        if (!user) return res.status(404).json({ status: 404, success: false, message: 'User not found.' });

        return res.status(200).json({ status: 200, success: true, message: 'income set successfully.', income: user.income });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, success: false, message: 'Internal Server Error.' });
    }
};


// export const setBudget = async (req, res) => {
//     try {
//         const { budget, id } = req.body;

//         console.log(typeof (budget));

//         if (!budget || isNaN(budget) || budget < 0) {
//             return res.status(400).json({ status: 400, success: false, message: 'Invalid budget value.' });
//         }

//         const user = await users.findById(id);

//         if (!user) return res.status(404).json({ status: 404, success: false, message: 'User not found.' });
//        const expenseAmount = user.expenses.reduce((sum, obj) => sum + obj.amount, 0);
//        console.log(expenseAmount,"expenseAmount")
//         if(user.budget+user.savings+expenseAmount <= user.income){
//         user.budget += parseInt(budget);
//       user.savings =user.income - user.budget

//         await user.save();
//         return res.status(200).json({ status: 200, success: true, message: 'Budget set successfully.', budget: user.budget });

//     }else{
//         return res.status(404).json({ status: 404, success: false, message: "you can't set budget more than your income." }); 

//     }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: 500, success: false, message: 'Internal Server Error.' });
//     }
// };



export const setBudget = async (req, res) => {
    try {
        const { budget, id } = req.body;

        if (!budget || isNaN(budget) || budget < 0) {
            return res.status(400).json({ status: 400, success: false, message: 'Invalid budget value.' });
        }

        const user = await users.findById(id);

        if (!user) return res.status(404).json({ status: 404, success: false, message: 'User not found.' });


        if (user.budget == 0) {
            // First time budget setting
            user.budget += parseInt(budget);
            user.savings = user.income - user.budget;

            await user.save();
            return res.status(200).json({ status: 200, success: true, message: 'Budget set successfully.', budget: user.budget });
        } else if (user.budget > 0 && budget <= user.savings) {
            user.budget += parseInt(budget);
            user.savings = user.savings - budget;
            await user.save();
            return res.status(200).json({ status: 200, success: true, message: "budget set successfully 2nd time" });
        } else {
            return res.status(400).json({ status: 400, message: "budget exceeds limit", success: false })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, success: false, message: 'Internal Server Error.' });
    }
};



export const addExpense = async (req, res) => {
    try {
        const { category, description, amount, id } = req.body;

        if (!category || !description || !amount) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Description and amount are required."
            });
        }

        const user = await users.findById(id);
        console.log(user.budget, "userbudget")
        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found."
            });
        }

        const budget = parseInt(user.budget);
        const expenseAmount = parseInt(amount);

        if (budget < expenseAmount) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Expense exceeds the budget."
            });
        }

        // Add the expense to the user's expenses array
        user.expenses.push({ category, description, amount: expenseAmount });

        // Update the user's budget
        user.budget -= expenseAmount;

        // Save the updated user document
        await user.save();

        return res.status(201).json({
            status: 201,
            success: true,
            message: "Expense added successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error."
        });
    }
};


export const getExpenses = async (req, res) => {
    try {
        const { id } = req.body;
        const checkuser = await users.findById(id).exec();
        if (!checkuser) return res.status(400).json({ status: 400, success: false, message: "user not found" });

        return res.status(200).json({ status: 200, success: true, expensesList: checkuser.expenses })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error."
        });
    }
}


export const updateExpenses = async (req, res) => {
    try {
        const { id, category, description, amount,expense_id } = req.body;
        
        const user = await users.findById(id).exec();
        if (!user) return res.status(400).json({ status: 400, success: false, message: "user not found" });

        const arrayExpense = user.expenses;
        console.log(arrayExpense, "objid")


        // const filterExpense = arrayExpense.filter((k)=>k._id == expenseid)

        const updateExpense = arrayExpense.find((obj) => obj._id == expense_id)
        if (updateExpense) {
            updateExpense.category = category;
            updateExpense.description = description;
            if (amount < updateExpense.amount ) {
                user.budget = user.budget + (updateExpense.amount - amount)
                if(user.budget < 0) return res.status(400).json({status:400, success:false, message:"something went wrong regarding amount"})
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updated successfully" })

            } else if (amount > updateExpense.amount ) {
                user.budget = user.budget - (amount - updateExpense.amount)
                if(user.budget < 0) return res.status(400).json({status:400, success:false, message:"something went wrong regarding amount"})
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updateddd successfully" })

            } else if(user.budget == 0 && amount > updateExpense.amount){
              return res.status(400).json({status:400, success:false, message:"you cannot add amount at this time"})
            }else{
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updated successfully" })

            }

        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "internal server error" })
    }
}






