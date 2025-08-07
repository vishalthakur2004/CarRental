import express from "express";
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getCarBookedDates, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.get('/car/:carId/dates', getCarBookedDates)
bookingRouter.post('/change-status', protect, changeBookingStatus)

export default bookingRouter;
