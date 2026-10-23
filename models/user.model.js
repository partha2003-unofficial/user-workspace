import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required },
    password: { type: String, required, min: 6 }
}, { timestamps: true })

const userModel = mongoose.model('user_model', userSchema);

export default userModel;