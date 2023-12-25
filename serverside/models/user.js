
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
    expenses:[
            {
                description: { type: String, required: true },
                category: { type: String, required: true },
                amount: { type: Number, required: true },
                date: { type: Date, default: Date.now }
            }
        ],

    budget:{
        type:Number,
        default:0
    },
    income:{
        type:Number,
        default:0
    },
    savings:{
        type:Number,
        default:0
    }

})

export default mongoose.model("users", userSchema);