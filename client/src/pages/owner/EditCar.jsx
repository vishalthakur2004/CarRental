import React, { useState, useEffect } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditCar = () => {
  const { currency } = useSelector((state) => state.app);
  const { carId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
    pickupLocation: "",
    dropLocation: "",
  });

  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch car data for editing
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const { data } = await axios.get(`/api/owner/car/${carId}`);
        if (data.success) {
          const carData = data.car;
          setCar({
            brand: carData.brand || "",
            model: carData.model || "",
            year: carData.year || 0,
            pricePerDay: carData.pricePerDay || 0,
            category: carData.category || "",
            transmission: carData.transmission || "",
            fuel_type: carData.fuel_type || "",
            seating_capacity: carData.seating_capacity || 0,
            location: carData.location || "",
            description: carData.description || "",
            pickupLocation: carData.pickupLocation || "",
            dropLocation: carData.dropLocation || "",
          });
          setFeatures(carData.features || []);
          setCurrentImageUrl(carData.image || "");
        } else {
          toast.error(data.message);
          navigate("/owner/manage-cars");
        }
      } catch (error) {
        toast.error("Failed to load car data");
        navigate("/owner/manage-cars");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (carId) {
      fetchCarData();
    }
  }, [carId, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("carData", JSON.stringify({ ...car, features }));

      const { data } = await axios.put(
        `/api/owner/edit-car/${carId}`,
        formData,
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/owner/manage-cars");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  if (isLoadingData) {
    return (
      <div className="px-4 py-10 md:px-10 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading car details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/owner/manage-cars")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <img src={assets.arrow_icon} alt="" className="rotate-180 w-4 h-4" />
          Back to Manage Cars
        </button>
      </div>

      <Title
        title="Edit Car Details"
        subTitle="Update the information for your listed car, including pricing, availability, and specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-4 w-full">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : currentImageUrl || assets.upload_icon
              }
              alt="Car"
              className="h-14 w-14 rounded object-cover border border-gray-200"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              {image ? "New image selected" : "Current car image"}
            </p>
            <p className="text-xs text-gray-400">
              Click image to {image ? "change" : "update"}
            </p>
          </div>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              required
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              required
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            required
          >
            <option value="">Select a location</option>
            {cityList.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup and Drop Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Pickup Location</label>
            <select
              onChange={(e) =>
                setCar({ ...car, pickupLocation: e.target.value })
              }
              value={car.pickupLocation}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              required
            >
              <option value="">Select pickup location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Drop Location</label>
            <select
              onChange={(e) => setCar({ ...car, dropLocation: e.target.value })}
              value={car.dropLocation}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              required
            >
              <option value="">Select drop location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Car Features */}
        <div className="flex flex-col w-full">
          <label>Car Features</label>
          <div className="flex gap-2 mt-1 mb-2">
            <input
              type="text"
              placeholder="e.g. Bluetooth, GPS, Air Conditioning..."
              className="px-3 py-2 flex-1 border border-borderColor rounded-md outline-none"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dull"
              onClick={addFeature}
            >
              Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-light text-gray-700 rounded-full text-sm"
                >
                  {feature}
                  <button
                    type="button"
                    className="text-gray-500 hover:text-red-500 ml-1"
                    onClick={() => removeFeature(index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Press Enter or click Add to add a feature
          </p>
        </div>

        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            required
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/owner/manage-cars")}
            className="flex items-center gap-2 px-4 py-2.5 mt-4 border border-gray-300 text-gray-600 rounded-md font-medium w-max cursor-pointer hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer hover:bg-primary-dull"
          >
            <img src={assets.tick_icon} alt="" />
            {isLoading ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
