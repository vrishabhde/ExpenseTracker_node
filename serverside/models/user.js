
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
    username:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    isactive:{
        type:Boolean,
        default:true
    },
    expenses:[]

})

export default mongoose.model("users", userSchema);