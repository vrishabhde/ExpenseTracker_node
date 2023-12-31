import users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { newPasswordValidation } from "../utils/newPasswordValidation.js";
import { emailValidation } from "../utils/emailValidation.js";



// registration.js

// registration.js

export const registration = async (req, res) => {
    try {
        // Validate input using middleware

        const { firstname, lastname, username, email, password, country, contact } = req.body;

        const checkContact = await users.findOne({ email }).exec();

        if (checkContact) return res.status(400).json({ status: 400, success: false, message: "This Email is Already Have an Account" });

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            firstname,
            lastname,
            username,
            email,
            contact,
            country: {
                code: country.code,
                name: country.name
            },
            password: hashpassword
        });

        await newUser.save();

        return res.status(201).json({ status: 201, success: true, message: "Signup Successfully." });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error Occurred in controller." });
    }
};





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
        const { firstname, lastname, email, contact } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, status: 400, message: "id is required" });
        }

        const existingEmail = await users.findOne({
            $and: [
                { _id: { $ne: id } }, 
                { $or: [{ email }] }
            ]
        }).exec();

        if (existingEmail) {
            return res.status(409).json({ success: false, status: 409, message: "Email already exists, please try with another Email..!" });
        }

        const existingContact = await users.findOne({
            $and: [
                { _id: { $ne: id } }, // Exclude the current user
                { $or: [{ contact }] }
            ]
        }).exec();

        if (existingContact) {
            return res.status(409).json({ success: false, status: 409, message: "This contact number is already in used" });
        }

        try {
            emailValidation(email);

        } catch (error) {
            return res.status(400).json({ status: 400, success: false, message: error.message });
        }
        // Update the user profile
        const response = await users.findByIdAndUpdate(id, { email, contact, firstname, lastname }, { new: true }).exec();
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

        if (!password) return res.status(400).json({ status: 400, success: false, message: "Current Password is required." });

        if (!newPassword) return res.status(400).json({ status: 400, success: false, message: "New Password is required." });

        if (!confirmNewPassword) return res.status(400).json({ status: 400, success: false, message: "Confirm Password is required." });

        const user = await users.findById(id).exec();

        if (!user) return res.status(404).json({ status: 404, success: false, message: "User not found." });

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) return res.status(400).json({ status: 400, success: false, message: "Incorrect current password." });


        try {
            newPasswordValidation(newPassword);
        } catch (error) {
            return res.status(400).json({ status: 400, success: false, message: error.message });
        }


        if (newPassword == password) return res.status(400).json({ status: 400, success: false, message: "current password & new password should not be same." })
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ status: 400, success: false, message: "New password and confirm password must be identical." });
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
        const check = await users.findById(id).exec();
        if (check.income == 0) {
            const user = await users.findByIdAndUpdate(id, { income }, { new: true });
            console.log(user, "user")
            if (!user) return res.status(404).json({ status: 404, success: false, message: 'User not found.' });
            return res.status(200).json({ status: 200, success: true, message: 'income set successfully.', income: user.income });
        } else if (check.income > 0 && income > check.income) {
            check.income = check.income + income;
            await check.save();
            return res.status(200).json({ status: 200, success: true, message: "income updated 2nd time" });
        }else if(check.income > 0 && income < check.income){
            check.income = check.income + income;
            await check.save();
            return res.status(200).json({ status: 200, success: true, message: "income updated 2nd time" });
   
        }else{
            return res.status(400).json({status:400,success:false,message:"something went wrong in income controller"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, success: false, message: 'Internal Server Error.' });
    }
};




export const setBudget = async (req, res) => {
    try {
        const { budget, id } = req.body;

        if (!budget || isNaN(budget) || budget < 0) {
            return res.status(400).json({ status: 400, success: false, message: 'Invalid budget value.' });
        }

        const user = await users.findById(id);

        if (!user) return res.status(404).json({ status: 404, success: false, message: 'User not found.' });

        if (user.income == 0) {
            return res.status(400).json({ status: 400, success: false, message: " please set income value..." })
        }else if(budget > user.income){
            return res.status(400).json({status:400,success:false,message:"budget exceeds income"})
        }
        else if(budget <= user.income && budget <= (user.income+user.budget)){
            user.budget = user.budget + budget;
            user.income = user.income - budget;
            await user.save();
            return res.status(200).json({status:200,success:true,message:"budget updated Successfully"})
        }
        else if (user.budget == 0 && user.savings == 0) {
            // First time budget setting
            user.budget += parseInt(budget);
            user.savings = user.income - budget;

            await user.save();
            return res.status(200).json({ status: 200, success: true, message: 'Budget set successfully.', budget: user.budget });


        } else if (user.budget == 0 && user.savings > 0) {

            user.budget += parseInt(budget);
            user.savings = user.savings - budget;

            await user.save();
            return res.status(200).json({ status: 200, success: true, message: 'Budget set successfully.', budget: user.budget });

        }
        else if (user.budget > 0 && budget <= user.savings) {
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
        const { category, description, amount, date, id } = req.body;
        if (!category) return res.status(400).json({ status: 400, success: false, message: "Category is required" });
        if (!description) return res.status(400).json({ status: 400, success: false, message: "Description is required" });
        if (!amount) return res.status(400).json({ status: 400, success: false, message: "Amount is required" });
        if (!id) return res.status(400).json({ status: 400, success: false, message: "ID is required" });

        const selectedDate = new Date(date);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Cannot add expenses for future dates."
            });
        }

        const formattedDate = date ? formatDates(selectedDate) : formatDate(currentDate);

        const user = await users.findById(id);

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

        user.expenses.push({ category, description, amount: expenseAmount, date: formattedDate });
        user.budget -= expenseAmount;

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

// Custom function to format the date as dd Mon yyyy
function formatDates(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}






// export const getExpenses = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const checkuser = await users.findById(id).exec();
//         if (!checkuser) return res.status(400).json({ status: 400, success: false, message: "user not found" });

//         return res.status(200).json({ status: 200, success: true, expensesList: checkuser.expenses })
//     } catch (error) {
//         return res.status(500).json({
//             status: 500,
//             success: false,
//             message: "Internal Server Error."
//         });
//     }
// }


export const getExpenses = async (req, res) => {
    try {
        const { id } = req.body;
        const checkuser = await users.findById(id).exec();

        if (!checkuser) {
            return res.status(400).json({ status: 400, success: false, message: "user not found" });
        }

        // Format the dates in the expenses array
        const formattedExpenses = checkuser.expenses.map(expense => ({
            ...expense.toObject(),
            date: formatDate(new Date(expense.date)),
        }));

        return res.status(200).json({ status: 200, success: true, expensesList: formattedExpenses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error."
        });
    }
};

// Custom function to format the date as dd Mon yyyy
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}




export const updateExpenses = async (req, res) => {
    try {
        const { id, category, description, amount, expense_id } = req.body;

        const user = await users.findById(id).exec();
        if (!user) return res.status(400).json({ status: 400, success: false, message: "user not found" });

        const arrayExpense = user.expenses;
        console.log(arrayExpense, "objid")


        // const filterExpense = arrayExpense.filter((k)=>k._id == expenseid)

        const updateExpense = arrayExpense.find((obj) => obj._id == expense_id)
        if (updateExpense) {
            updateExpense.category = category;
            updateExpense.description = description;
            if (amount < updateExpense.amount) {
                user.budget = user.budget + (updateExpense.amount - amount)
                if (user.budget < 0) return res.status(400).json({ status: 400, success: false, message: "something went wrong regarding amount" })
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updated successfully" })

            } else if (amount > updateExpense.amount) {
                user.budget = user.budget - (amount - updateExpense.amount)
                if (user.budget < 0) return res.status(400).json({ status: 400, success: false, message: "Expense amount exceeds your budget." })
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updateddd successfully" })

            } else if (user.budget == 0 && amount > updateExpense.amount) {
                return res.status(400).json({ status: 400, success: false, message: "you cannot add amount at this time" })
            } else {
                updateExpense.amount = amount;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "expense updated successfully" })

            }

        }
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "internal server error" })
    }
}



export const deleteExpense = async (req, res) => {
    try {
        const { id, expense_id } = req.body

        const user = await users.findById(id).exec();
        if (!user) return res.status(400).json({ status: 400, success: false, message: "user not found" });
        const expensesArray = user.expenses;
        for (let i = 0; i < expensesArray.length; i++) {
            if (expensesArray[i]._id == expense_id) {

                user.budget = user.budget + expensesArray[i].amount;

                expensesArray.splice(i, 1);

                await user.save();

                return res.status(200).json({ status: 200, success: true, message: "deleted" })

            }
        }

    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "internal server error" })
    }
}




