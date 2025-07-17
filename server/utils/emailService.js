import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your SureRide Account",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #0558FE, #A9CFFF); padding: 30px; text-align: center; border-radius: 10px;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to SureRide!</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                        Thank you for joining SureRide! To complete your registration and start enjoying our premium vehicle rental service, please verify your email address using the OTP below:
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                        <h3 style="color: #333; margin-bottom: 10px;">Your Verification Code</h3>
                        <div style="font-size: 32px; font-weight: bold; color: #0558FE; letter-spacing: 5px; font-family: monospace;">
                            ${otp}
                        </div>
                    </div>
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        This OTP will expire in <strong>10 minutes</strong>. If you didn't request this verification, please ignore this email.
                    </p>
                    
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #0558FE;">
                        <p style="margin: 0; color: #0277bd; font-size: 14px;">
                            <strong>Security tip:</strong> Never share this OTP with anyone. SureRide will never ask for your OTP via phone or email.
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
                    <p>Questions? Contact our support team at support@sureride.com</p>
                    <p>&copy; 2024 SureRide. All rights reserved.</p>
                </div>
            </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, message: "Failed to send OTP email" };
  }
};
