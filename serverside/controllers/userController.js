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
        const {id} = req.params;
        const { password, newPassword, confirmNewPassword } = req.body;

        if (!password) return res.status(400).json({ status: 400, success: false, message: "Old Password is required." });

        if (!newPassword)  return res.status(400).json({ status: 400, success: false, message: "New Password is required." });

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






