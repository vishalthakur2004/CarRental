import express from 'express';
import { sendOTP, verifyOTP, resendOTP } from '../controllers/otpController.js';

const otpRouter = express.Router();

// Send OTP for email verification
otpRouter.post('/send-otp', sendOTP);

// Verify OTP
otpRouter.post('/verify-otp', verifyOTP);

// Resend OTP
otpRouter.post('/resend-otp', resendOTP);

export default otpRouter;