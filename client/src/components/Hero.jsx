import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { stateCityMapping, statesList } from '../data/stateCityMapping';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      '/cars?pickupLocation=' +
      pickupLocation +
      '&pickupDate=' +
      pickupDate +
      '&returnDate=' +
      returnDate
    );
  };

  return (
    <div className="w-full bg-black text-white pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 pt-16 pb-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Luxury Cars on Rent
          </h1>
          <p className="text-lg text-gray-300">
            Discover premium vehicles for your perfect journey
          </p>
        </div>

        {/* Right Side Car Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src={assets.hero_car_image} // Replace with actual image path
            alt="Luxury Car"
            className="w-full object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
          />
        </div>
      </div>

      {/* Search Section Card */}
      <div className="max-w-6xl mx-auto bg-white text-black shadow-xl rounded-2xl p-6 md:p-10 mt-4">
        <h2 className="text-2xl font-semibold mb-6">Find Your Perfect Ride</h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <select
              required
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setPickupLocation('');
              }}
              className="w-full border px-4 py-3 rounded-lg bg-gray-100"
            >
              <option value="">Choose State</option>
              {statesList.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              disabled={!selectedState}
              className="w-full border px-4 py-3 rounded-lg bg-gray-100 disabled:opacity-50"
            >
              <option value="">{selectedState ? 'Choose City' : 'Select state first'}</option>
              {selectedState &&
                stateCityMapping[selectedState]?.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border px-4 py-3 rounded-lg bg-gray-100"
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg bg-gray-100"
              required
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Search Available Cars
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
