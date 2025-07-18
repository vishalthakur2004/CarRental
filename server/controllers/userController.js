import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";
import {
  generateOTP,
  generateTempToken,
  sendOTPEmail,
} from "../utils/otpUtils.js";

// Generate JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists && userExists.isVerified) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const tempToken = generateTempToken();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // If user exists but not verified, update their data
    if (userExists && !userExists.isVerified) {
      userExists.name = name;
      userExists.password = hashedPassword;
      userExists.otp = otp;
      userExists.otpExpires = otpExpires;
      userExists.tempToken = tempToken;
      await userExists.save();
    } else {
      // Create new user with OTP
      await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
        tempToken,
        isVerified: false,
      });
    }

    // Send OTP email
    await sendOTPEmail(email, otp, name);

    res.json({
      success: true,
      message: "OTP sent to your email",
      tempToken,
      expiresAt: otpExpires.getTime(),
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, tempToken } = req.body;

    if (!email || !otp || !tempToken) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({
      email,
      tempToken,
      otp,
      otpExpires: { $gt: Date.now() }, // Check if OTP is not expired
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Verify user and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.tempToken = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      message: "Account verified successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email, isVerified: false });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found or already verified",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp, user.name);

    res.json({
      success: true,
      message: "OTP sent successfully",
      expiresAt: otpExpires.getTime(),
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = generateToken(user._id.toString());
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get All Cars for the Frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvaliable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to change password
export const changePassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordCorrect) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to initiate forget password (send OTP)
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found or not verified",
      });
    }

    // Generate OTP and temp token for password reset
    const otp = generateOTP();
    const tempToken = generateTempToken();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    user.tempToken = tempToken;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp, user.name, "Password Reset");

    res.json({
      success: true,
      message: "Password reset OTP sent to your email",
      tempToken,
      expiresAt: otpExpires.getTime(),
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to reset password with OTP verification
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, tempToken } = req.body;

    if (!email || !otp || !newPassword || !tempToken) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await User.findOne({
      email,
      tempToken,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.tempToken = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    let image = null;

    if (imagekit && imageFile) {
      // Upload Image to ImageKit
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/users",
      });

      // optimization through imagekit URL transformation
      var optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { width: "400" }, // Width resizing
          { quality: "auto" }, // Auto compression
          { format: "webp" }, // Convert to modern format
        ],
      });

      image = optimizedImageUrl;
    } else {
      // Fallback: use a placeholder for development
      image = imageFile ? `/uploads/${imageFile.filename}` : null;
    }

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Profile image updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
