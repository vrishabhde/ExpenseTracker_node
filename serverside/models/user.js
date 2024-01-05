import mongoose, { Schema } from "mongoose";


function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

const expenseSchema = new Schema({
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        default: 'Food',
        enum: ['Transportation', 'Food', 'Housing', 'Entertainment', 'Other']
    },
    amount: { type: Number, required: true },
    date: {
        type: String, 
        default: () => formatDate(new Date()) 
    },
});

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1) // Convert first letter to uppercase
    },
    lastname: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1) // Convert first letter to uppercase
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true,
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
    isadmin: {
        type: Boolean,
        default: false
    },
    isactive: {
        type: Boolean,
        default: true
    },
    expenses: [expenseSchema], 
    budget: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },
    savings: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("users", userSchema);
