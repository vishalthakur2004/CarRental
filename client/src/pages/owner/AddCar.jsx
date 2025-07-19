import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const AddCar = () => {
  const { currency } = useSelector((state) => state.app);

  const [image, setImage] = useState(null);
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
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify({ ...car, features }));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
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
        setFeatures([]);
        setNewFeature("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
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
                  if (
                    newFeature.trim() &&
                    !features.includes(newFeature.trim())
                  ) {
                    setFeatures([...features, newFeature.trim()]);
                    setNewFeature("");
                  }
                }
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dull"
              onClick={() => {
                if (
                  newFeature.trim() &&
                  !features.includes(newFeature.trim())
                ) {
                  setFeatures([...features, newFeature.trim()]);
                  setNewFeature("");
                }
              }}
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
                    onClick={() =>
                      setFeatures(features.filter((_, i) => i !== index))
                    }
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

        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
