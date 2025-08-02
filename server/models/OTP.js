import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes expiration
    },
    attempts: {
        type: Number,
        default: 0,
        max: 5 // Max 5 verification attempts
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index for faster lookups
otpSchema.index({ email: 1, createdAt: 1 });

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;