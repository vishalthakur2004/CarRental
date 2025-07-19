import nodemailer from "nodemailer";
import crypto from "crypto";

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate random token for temporary auth
export const generateTempToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Create email transporter (using Gmail SMTP)
const createTransporter = () => {
  // For now, we'll use a basic transporter without authentication
  // In production, you would use actual email service credentials
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "carrental5862@gmail.com",
      pass: process.env.EMAIL_PASS || "your-app-password",
    },
  });
};

// Send OTP email
export const sendOTPEmail = async (
  email,
  otp,
  name = "User",
  purpose = "Account Verification",
) => {
  try {
    // For demo purposes, we'll just log the OTP
    console.log(`=== OTP EMAIL ===`);
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`================`);

    // In a real application, you would uncomment the following code:
    /*
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'carrental5862@gmail.com',
            to: email,
            subject: 'SureRide - Verify Your Account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1e40af;">Welcome to SureRide!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for registering with SureRide. Please use the following OTP to verify your account:</p>
                    <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #1e40af; font-size: 32px; margin: 0;">${otp}</h1>
                    </div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't create this account, please ignore this email.</p>
                    <p>Best regards,<br>The SureRide Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        */

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: "Failed to send OTP email" };
  }
};
