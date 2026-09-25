import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userModel);

export default User;