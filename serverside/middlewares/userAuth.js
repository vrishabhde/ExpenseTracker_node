import { emailValidation } from "../utils/emailValidation.js";
import { passwordValidation } from "../utils/passwordValidation.js";
import users from "../models/user.js";
import bcrypt from "bcrypt";



export const authRegister = async(req,res,next) => {
    try {
        const {firstname,lastname,username, email, password, confirmpassword,countryCode, contact} = req.body;
        if(!firstname) return res.status(404).json({status: 404, success: false, message: "firstname is required."});        
        if(!lastname) return res.status(404).json({status: 404, success: false, message: "lastname is required."});        
        if(!username) return res.status(404).json({status: 404, success: false, message: "Username is required."});        
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});        
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});        
        if(!confirmpassword) return res.status(404).json({status: 404, success: false, message: "Confirm Password is required."});        
        if(!countryCode) return res.status(404).json({status: 404, success: false, message: "Country Code is required."});        
        if(!contact) return res.status(404).json({status: 404, success: false, message: "Contact Number is required."});
        if(contact.length != 10) return res.status(404).json({status: 404, success: false, message: "Contact Number must be of 10 digits only."});
            
        if(password !== confirmpassword) return res.status(500).json({status: 400, success: false, message: "Credentials not matched."});

        const checkContact = await users.findOne({contact}).exec();

        if(checkContact) return res.status(400).json({status:400,success:false,message:"This Contact is Already in Used"});

        const checkUsername = await users.findOne({username}).exec();

        if(checkUsername) return res.status(400).json({status:400,success:false,message:"This Username is Already in Used"});
 
        try {
            emailValidation(email);
            passwordValidation(password);
        } catch (error) {
            return res.status(400).json({status: 400, success: false, message: error.message});
        }
        next();
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}



export const authLogin = async(req,res,next) => {
    try {
        const {email, password} = req.body;
        if(!email) return res.status(404).json({status: 404, success: false, message:" Email is required."});
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});
        
        const existUser = await users.findOne({email}).exec();
        console.log(existUser)
        if(!existUser) return res.status(400).json({status: 400, success: false, message: "User not found, please register/Signup"});
        
        const checkPassword = await bcrypt.compare(password, existUser.password)
        console.log(checkPassword,"checkPassword")
        if(checkPassword){
            next();
        }else{
            return res.status(400).json({status: 400, success: false, message: "Invalid credentials."});
        }

    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: 'Internal server error from middleware.'});
    }
}