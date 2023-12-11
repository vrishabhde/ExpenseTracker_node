import users from "../models/user.js";
import bcrypt from "bcrypt";


export const registration = async (req, res) => {
    try {

        const { username, email, password, contact } = req.body;

        const userExist = await users.findOne({ email }).exec();

        if (userExist) {return res.satus(400).json({ status: 400, success: false, message: "you are already registered" })};

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username, email, contact,
            password: hashpassword
        });

        await newUser.save();
        return res.status(201).json({ status: 201, success: true, message: "You Have Registered Successfully." });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error Occured." });
    }
}