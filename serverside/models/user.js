
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
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
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    countryCode: {
        type: String,
        required: true,
        enum: ["+91", "+92"]
      
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
                category: {
                    type: String,
                    required: true,
                    enum: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Other']
                },
                amount: { type: Number, required: true },
                date: { type: Date, default: Date.now },
                
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