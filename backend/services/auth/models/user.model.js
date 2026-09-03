import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    avatar: {
        type: String,
        trim: true,
        default: ""
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
