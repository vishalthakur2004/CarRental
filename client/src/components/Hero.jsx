import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { stateCityMapping, statesList } from '../data/stateCityMapping'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')
    const [selectedState, setSelectedState] = useState('')

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <div className='relative overflow-hidden'>
      {/* Hero Section with Dark Background */}
      <div className='relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black'>

        {/* Background Car Image */}
        <div className='absolute inset-0 overflow-hidden'>
          <img
            src={assets.main_car}
            alt="luxury car"
            className='absolute right-0 top-1/2 transform -translate-y-1/2 h-[80%] w-auto object-contain opacity-60'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent'></div>
        </div>

        {/* Content Container */}
        <div className='relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto w-full'>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-left mb-12 lg:mb-16 max-w-2xl'
            >
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6'>
                Luxury Cars on Rent
              </h1>
              <p className='text-xl sm:text-2xl text-gray-300 font-medium'>
                Discover premium vehicles for your perfect journey
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='bg-white rounded-3xl shadow-2xl p-6 lg:p-8 max-w-5xl'
            >
              <form onSubmit={handleSearch} className='space-y-6'>

                {/* Form Header */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>

                  {/* Find Your Perfect Ride Section */}
                  <div>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-6 h-6 text-blue-600'>
                        <svg fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <h2 className='text-xl lg:text-2xl font-bold text-gray-800'>Find Your Perfect Ride</h2>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
                        <div className='relative'>
                          <select
                            required
                            value={selectedState}
                            onChange={(e)=> {
                              setSelectedState(e.target.value)
                              setPickupLocation('')
                            }}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white text-gray-700'
                          >
                            <option value="">Choose State</option>
                            {statesList.map((state, index)=> <option key={`${state}-${index}`} value={state}>{state}</option>)}
                          </select>
                          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                        <div className='relative'>
                          <select
                            required
                            value={pickupLocation}
                            onChange={(e)=>setPickupLocation(e.target.value)}
                            disabled={!selectedState}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700'
                          >
                            <option value="">{selectedState ? 'Select state first' : 'Select state first'}</option>
                            {selectedState && stateCityMapping[selectedState] &&
                              stateCityMapping[selectedState].map((city, index)=> <option key={`${city}-${index}`} value={city}>{city}</option>)
                            }
                          </select>
                          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rental Period Section */}
                  <div>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-6 h-6 text-blue-600'>
                        <svg fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <h2 className='text-xl lg:text-2xl font-bold text-gray-800'>Rental Period</h2>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <label htmlFor='pickup-date' className='block text-sm font-medium text-gray-700 mb-2'>Pickup Date</label>
                        <input
                          value={pickupDate}
                          onChange={e=>setPickupDate(e.target.value)}
                          type="date"
                          id="pickup-date"
                          min={new Date().toISOString().split('T')[0]}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700'
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor='return-date' className='block text-sm font-medium text-gray-700 mb-2'>Return Date</label>
                        <input
                          value={returnDate}
                          onChange={e=>setReturnDate(e.target.value)}
                          type="date"
                          id="return-date"
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700'
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className='pt-6 border-t border-gray-200'>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                    <span>Search Available Cars</span>
                    <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
