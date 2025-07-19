import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BookingStatus = ({ carId, carStatus, onStatusUpdate }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userBookingStatus, setUserBookingStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserBookingStatus = async () => {
    if (!isAuthenticated || !carId) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/bookings/car-status/${carId}`);
      if (data.success) {
        setUserBookingStatus(data.status);
        if (onStatusUpdate) {
          onStatusUpdate(data.status, data.booking);
        }
      }
    } catch (error) {
      console.error("Error fetching booking status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookingStatus();
  }, [carId, isAuthenticated]);

  if (!isAuthenticated || loading) {
    return null;
  }

  const getStatusDisplay = () => {
    // If user has a booking for this car
    if (userBookingStatus && userBookingStatus !== "no_booking") {
      switch (userBookingStatus) {
        case "confirmed":
          return {
            text: "Booked by You",
            bgColor: "bg-green-500/90",
            textColor: "text-white",
          };
        case "pending":
          return {
            text: "Booking Pending",
            bgColor: "bg-yellow-500/90",
            textColor: "text-white",
          };
        case "cancelled":
          return {
            text: "Booking Cancelled",
            bgColor: "bg-red-500/90",
            textColor: "text-white",
          };
        default:
          return null;
      }
    }

    // If user has no booking but car is booked by someone else
    if (carStatus === "Booked") {
      return {
        text: "Not Available",
        bgColor: "bg-red-500/90",
        textColor: "text-white",
      };
    }

    // Default car status
    if (carStatus) {
      return {
        text: carStatus,
        bgColor:
          carStatus === "Available"
            ? "bg-green-500/90"
            : carStatus === "On Rent"
              ? "bg-orange-500/90"
              : "bg-red-500/90",
        textColor: "text-white",
      };
    }

    return null;
  };

  const statusDisplay = getStatusDisplay();

  if (!statusDisplay) {
    return null;
  }

  return (
    <div
      className={`absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full ${statusDisplay.bgColor} ${statusDisplay.textColor}`}
    >
      {statusDisplay.text}
    </div>
  );
};

export default BookingStatus;
