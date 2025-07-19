import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// API to Change Role of User
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Car

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    let image = null;

    if (imagekit && imageFile) {
      // Upload Image to ImageKit
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/cars",
      });

      // optimization through imagekit URL transformation
      var optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { width: "1280" }, // Width resizing
          { quality: "auto" }, // Auto compression
          { format: "webp" }, // Convert to modern format
        ],
      });

      image = optimizedImageUrl;
    } else {
      // Fallback: use a placeholder or base64 data for development
      image = imageFile ? `/uploads/${imageFile.filename}` : null;
    }
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Get Single Car for Editing
export const getOwnerCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;

    const car = await Car.findOne({ _id: carId, owner: _id });

    if (!car) {
      return res.json({
        success: false,
        message: "Car not found or unauthorized",
      });
    }

    res.json({ success: true, car });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Edit Car
export const editCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;
    let carData = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Find the car and verify ownership
    const existingCar = await Car.findOne({ _id: carId, owner: _id });

    if (!existingCar) {
      return res.json({
        success: false,
        message: "Car not found or unauthorized",
      });
    }

    let image = existingCar.image; // Keep existing image by default

    // If new image is uploaded, process it
    if (imageFile) {
      if (imagekit) {
        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
          file: fileBuffer,
          fileName: imageFile.originalname,
          folder: "/cars",
        });

        // optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
          path: response.filePath,
          transformation: [
            { width: "1280" }, // Width resizing
            { quality: "auto" }, // Auto compression
            { format: "webp" }, // Convert to modern format
          ],
        });

        image = optimizedImageUrl;
      } else {
        // Fallback: use a placeholder or base64 data for development
        image = `/uploads/${imageFile.filename}`;
      }
    }

    // Update the car with new data
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { ...carData, image },
      { new: true },
    );

    res.json({
      success: true,
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Checking is car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvaliable = !car.isAvaliable;
    await car.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Update Car Status
export const updateCarStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId, status } = req.body;

    // Validate status
    const validStatuses = ["Available", "Booked", "On Rent", "Not Available"];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.status = status;

    // Also update isAvailable based on status
    car.isAvaliable = status === "Available";

    await car.save();

    res.json({ success: true, message: `Car status updated to ${status}` });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Api to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Checking is car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null;
    car.isAvaliable = false;

    await car.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    // Calculate monthlyRevenue from bookings where status is confirmed
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to update user image

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
    res.json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
