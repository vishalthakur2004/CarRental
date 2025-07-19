import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogin } from "../store/slices/authSlice";
import { setPickupDate, setReturnDate } from "../store/slices/bookingSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import BookingStatus from "../components/BookingStatus";

const CarDetails = () => {
  const { id } = useParams();

  const { cars } = useSelector((state) => state.cars);
  const { pickupDate, returnDate } = useSelector((state) => state.booking);
  const { currency } = useSelector((state) => state.app);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [userBookingStatus, setUserBookingStatus] = useState(null);
  const [userBooking, setUserBooking] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated before allowing booking
    if (!isAuthenticated) {
      toast.error("Please login to book a car");
      dispatch(setShowLogin(true));
      return;
    }

    // Check if user already has a booking for this car
    if (userBookingStatus === "confirmed") {
      toast.error("You have already booked this car");
      return;
    }

    if (userBookingStatus === "pending") {
      toast.error("You already have a pending booking for this car");
      return;
    }

    // Check if car is available for booking
    if (car.status && car.status !== "Available") {
      toast.error(
        `This car is currently ${car.status.toLowerCase()} and cannot be booked`,
      );
      return;
    }

    if (!car.isAvaliable) {
      toast.error("This car is not available for booking");
      return;
    }

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        // Update user booking status
        setUserBookingStatus("pending");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusUpdate = (status, booking) => {
    setUserBookingStatus(status);
    setUserBooking(booking);
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              {car.features && car.features.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-500">
                      <img
                        src={assets.check_icon}
                        className="h-4 mr-2"
                        alt=""
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">
                  No features listed for this car
                </p>
              )}
            </div>

            {/* Pickup and Drop Locations */}
            <div>
              <h1 className="text-xl font-medium mb-3">
                Pickup & Drop Locations
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center bg-light p-4 rounded-lg">
                  <img src={assets.location_icon} alt="" className="h-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Pickup Location</p>
                    <p className="text-gray-500">
                      {car.pickupLocation || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-light p-4 rounded-lg">
                  <img src={assets.location_icon} alt="" className="h-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Drop Location</p>
                    <p className="text-gray-500">
                      {car.dropLocation || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              value={pickupDate}
              onChange={(e) => dispatch(setPickupDate(e.target.value))}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => dispatch(setReturnDate(e.target.value))}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="return-date"
            />
          </div>

          <button
            disabled={
              (car.status && car.status !== "Available") || !car.isAvaliable
            }
            className={`w-full py-3 font-medium rounded-xl transition-all ${
              (car.status && car.status !== "Available") || !car.isAvaliable
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dull text-white cursor-pointer"
            }`}
          >
            {car.status && car.status !== "Available"
              ? `Car is ${car.status}`
              : !car.isAvaliable
                ? "Not Available"
                : "Book Now"}
          </button>

          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
