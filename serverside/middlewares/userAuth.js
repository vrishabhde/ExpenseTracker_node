import { emailValidation } from "../utils/emailValidation.js";
import { passwordValidation } from "../utils/passwordValidation.js";

export const authRegister = async(req,res,next) => {
    try {
        const {username, email, password, confirmpassword, contact} = req.body;
        if(!username) return res.status(404).json({status: 404, success: false, message: "Username is required."});        
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});        
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});        
        if(!confirmpassword) return res.status(404).json({status: 404, success: false, message: "Confirm Password is required."});        
        if(!contact) return res.status(404).json({status: 404, success: false, message: "Contact Number is required."});
            
        if(password !== confirmpassword) return res.status(500).json({status: 400, success: false, message: "Credentials not matched."});

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
