import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        min: 2,
        required: true
    },
    profilePic: {
        type: String
    },
    donations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donation",
            default: []
        }
    ],
    raisedAmount: {
        type: Number,
        default: 0.0,
        required: true
    },
    level: {
        type: String,
        default: "Newbie",
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;