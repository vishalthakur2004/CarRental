import OTP from "../models/OTP.js";
import User from "../models/User.js";
import { sendOTPEmail } from "../configs/emailConfig.js";

// In-memory rate limiting storage (in production, use Redis)
const rateLimitStore = new Map();

// Rate limiting function
const checkRateLimit = (email, type) => {
    const key = `${email}_${type}`;
    const now = Date.now();
    const windowMs = type === 'send' ? 30000 : 60000; // 30s for send, 60s for verify
    const maxAttempts = type === 'send' ? 1 : 5;

    if (!rateLimitStore.has(key)) {
        rateLimitStore.set(key, { count: 1, firstAttempt: now });
        return { allowed: true };
    }

    const data = rateLimitStore.get(key);
    
    // Reset if window has passed
    if (now - data.firstAttempt > windowMs) {
        rateLimitStore.set(key, { count: 1, firstAttempt: now });
        return { allowed: true };
    }

    // Check if limit exceeded
    if (data.count >= maxAttempts) {
        const remainingTime = Math.ceil((windowMs - (now - data.firstAttempt)) / 1000);
        return { 
            allowed: false, 
            message: `Too many attempts. Please wait ${remainingTime} seconds.`,
            remainingTime 
        };
    }

    // Increment count
    data.count++;
    rateLimitStore.set(key, data);
    return { allowed: true };
};

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: 'Email is required' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }

        // Check rate limit
        const rateCheck = checkRateLimit(email, 'send');
        if (!rateCheck.allowed) {
            return res.json({ success: false, message: rateCheck.message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists with this email' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Delete any existing OTP for this email
        await OTP.deleteMany({ email });

        // Create new OTP record
        await OTP.create({
            email,
            otp,
            attempts: 0,
            verified: false
        });

        // Send email
        const emailResult = await sendOTPEmail(email, otp);
        
        if (!emailResult.success) {
            return res.json({ 
                success: false, 
                message: 'Failed to send OTP email. Please try again.' 
            });
        }

        res.json({ 
            success: true, 
            message: 'OTP sent successfully to your email',
            expiresIn: 300 // 5 minutes
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.json({ success: false, message: 'Internal server error' });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({ success: false, message: 'Email and OTP are required' });
        }

        // Check rate limit
        const rateCheck = checkRateLimit(email, 'verify');
        if (!rateCheck.allowed) {
            return res.json({ success: false, message: rateCheck.message });
        }

        // Find OTP record
        const otpRecord = await OTP.findOne({ 
            email, 
            verified: false 
        }).sort({ createdAt: -1 }); // Get the latest OTP

        if (!otpRecord) {
            return res.json({ 
                success: false, 
                message: 'OTP not found or expired. Please request a new OTP.' 
            });
        }

        // Check if too many attempts
        if (otpRecord.attempts >= 5) {
            await OTP.deleteMany({ email }); // Clean up
            return res.json({ 
                success: false, 
                message: 'Too many failed attempts. Please request a new OTP.' 
            });
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();
            
            const remainingAttempts = 5 - otpRecord.attempts;
            return res.json({ 
                success: false, 
                message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                remainingAttempts
            });
        }

        // OTP is correct - mark as verified
        otpRecord.verified = true;
        await otpRecord.save();

        // Clean up old OTP records for this email
        await OTP.deleteMany({ 
            email, 
            _id: { $ne: otpRecord._id } 
        });

        res.json({ 
            success: true, 
            message: 'Email verified successfully',
            verificationToken: otpRecord._id.toString() // Temporary token for final signup
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.json({ success: false, message: 'Internal server error' });
    }
};

// Resend OTP
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: 'Email is required' });
        }

        // Check rate limit (same as send OTP)
        const rateCheck = checkRateLimit(email, 'send');
        if (!rateCheck.allowed) {
            return res.json({ success: false, message: rateCheck.message });
        }

        // Check if there's a pending OTP
        const existingOTP = await OTP.findOne({ email, verified: false });
        if (!existingOTP) {
            return res.json({ 
                success: false, 
                message: 'No pending verification found. Please start the signup process again.' 
            });
        }

        // Generate new OTP
        const otp = generateOTP();

        // Update existing record
        existingOTP.otp = otp;
        existingOTP.attempts = 0;
        existingOTP.createdAt = new Date();
        await existingOTP.save();

        // Send email
        const emailResult = await sendOTPEmail(email, otp);
        
        if (!emailResult.success) {
            return res.json({ 
                success: false, 
                message: 'Failed to resend OTP email. Please try again.' 
            });
        }

        res.json({ 
            success: true, 
            message: 'OTP resent successfully to your email',
            expiresIn: 300
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.json({ success: false, message: 'Internal server error' });
    }
};
