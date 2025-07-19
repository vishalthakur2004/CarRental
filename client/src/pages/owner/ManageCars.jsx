import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { isOwner } = useSelector((state) => state.auth);
  const { currency } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const statusOptions = ["Available", "Booked", "On Rent", "Not Available"];
  const statusColors = {
    Available: "bg-green-100 text-green-600",
    Booked: "bg-blue-100 text-blue-600",
    "On Rent": "bg-orange-100 text-orange-600",
    "Not Available": "bg-red-100 text-red-600",
  };

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateCarStatus = async (carId, newStatus) => {
    try {
      const { data } = await axios.post("/api/owner/update-car-status", {
        carId,
        status: newStatus,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
        setShowStatusModal(false);
        setSelectedCar(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?",
      );

      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>

                <td className="p-3 max-md:hidden">
                  <button
                    onClick={() => {
                      setSelectedCar(car);
                      setShowStatusModal(true);
                    }}
                    className={`px-3 py-1 rounded-full text-xs hover:opacity-80 transition-opacity cursor-pointer ${
                      statusColors[car.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {car.status || "Available"}
                  </button>
                </td>

                <td className="flex items-center p-3 gap-2">
                  <button
                    onClick={() => navigate(`/owner/edit-car/${car._id}`)}
                    className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 border border-green-200 rounded hover:bg-green-50 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCar(car);
                      setShowStatusModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                  >
                    Status
                  </button>

                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt=""
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Update Car Status</h3>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedCar(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {selectedCar.brand} {selectedCar.model}
              </p>
              <p className="text-xs text-gray-500">
                Current status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    statusColors[selectedCar.status] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedCar.status || "Available"}
                </span>
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Select new status:
              </p>
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => updateCarStatus(selectedCar._id, status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCar.status === status
                      ? statusColors[status] + " border-2 border-current"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      status === "Available"
                        ? "bg-green-500"
                        : status === "Booked"
                          ? "bg-blue-500"
                          : status === "On Rent"
                            ? "bg-orange-500"
                            : "bg-red-500"
                    }`}
                  ></span>
                  {status}
                  {status === "Available" && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Ready for booking)
                    </span>
                  )}
                  {status === "Booked" && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Reserved by customer)
                    </span>
                  )}
                  {status === "On Rent" && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Currently rented out)
                    </span>
                  )}
                  {status === "Not Available" && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Temporarily unavailable)
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedCar(null);
                }}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
