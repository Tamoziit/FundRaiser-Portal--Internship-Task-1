import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    payment_intent_id: {
        type: String,
        required: true
    },
    volunteer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    volunteer_name: {
        type: String,
        required: true
    },
    volunteer_email: {
        type: String,
        required: true
    },
    donor_name: {
        type: String,
        required: true
    },
    donor_email: {
        type: String,
        required: true
    },
    donor_mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    donationType: {
        type: String,
        enum: ["External", "Self"],
        required: true
    }
}, { timestamps: true });

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;