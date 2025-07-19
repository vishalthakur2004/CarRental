import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  getOwnerCar,
  editCar,
  toggleCarAvailability,
  updateCarStatus,
  updateUserImage,
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCar);
ownerRouter.put("/edit-car/:carId", upload.single("image"), protect, editCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.get("/car/:carId", protect, getOwnerCar);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/update-car-status", protect, updateCarStatus);
ownerRouter.post("/delete-car", protect, deleteCar);

ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage,
);

export default ownerRouter;
