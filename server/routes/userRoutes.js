import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
  verifyOTP,
  resendOTP,
  updateUserImage,
  changePassword,
  forgetPassword,
  resetPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/resend-otp", resendOTP);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);
userRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage,
);
userRouter.post("/change-password", protect, changePassword);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
