import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    DOB: String,
    department: {
        type: String,
    },
    gender: String,
    registerNo: {
        type: Number,
        required: true,
    },
    email: String,
    mobileNo: String,
    address: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user',
    },
})


export default mongoose.model("User", UserSchema);