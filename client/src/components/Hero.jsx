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
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className='min-h-screen flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-14 bg-light text-center px-4'>

        <motion.h1 initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl leading-tight'>Luxury cars on Rent</motion.h1>
      
      <motion.form
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}

       onSubmit={handleSearch} className='flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 sm:p-6 rounded-lg lg:rounded-full w-full max-w-sm sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>

        <div className='flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 w-full lg:ml-8'>
            <div className='flex flex-col items-start gap-2 w-full sm:w-auto lg:min-w-40'>
                <label className='text-sm font-medium text-gray-700'>State</label>
                <select
                  required
                  value={selectedState}
                  onChange={(e)=> {
                    setSelectedState(e.target.value)
                    setPickupLocation('') // Reset city when state changes
                  }}
                  className='w-full px-3 py-2.5 border border-gray-300 rounded-md outline-none bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
                >
                    <option value="">Select State</option>
                    {statesList.map((state, index)=> <option key={`${state}-${index}`} value={state}>{state}</option>)}
                </select>
                <p className='px-1 text-xs text-gray-500 truncate max-w-40'>{selectedState ? selectedState : 'Please select state'}</p>
            </div>
            <div className='flex flex-col items-start gap-2 w-full sm:w-auto lg:min-w-40'>
                <label className='text-sm font-medium text-gray-700'>City</label>
                <select
                  required
                  value={pickupLocation}
                  onChange={(e)=>setPickupLocation(e.target.value)}
                  disabled={!selectedState}
                  className='w-full px-3 py-2.5 border border-gray-300 rounded-md outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
                >
                    <option value="">{selectedState ? 'Select City' : 'Select state first'}</option>
                    {selectedState && stateCityMapping[selectedState] &&
                      stateCityMapping[selectedState].map((city, index)=> <option key={`${city}-${index}`} value={city}>{city}</option>)
                    }
                </select>
                <p className='px-1 text-xs text-gray-500 truncate max-w-40'>{pickupLocation ? pickupLocation : (selectedState ? 'Please select city' : 'Select state first')}</p>
            </div>
            <div className='flex flex-col items-start gap-2 w-full sm:w-auto'>
                <label htmlFor='pickup-date' className='text-sm font-medium text-gray-700'>Pick-up Date</label>
                <input
                    value={pickupDate}
                    onChange={e=>setPickupDate(e.target.value)}
                    type="date"
                    id="pickup-date"
                    min={new Date().toISOString().split('T')[0]}
                    className='w-full px-3 py-2.5 border border-gray-300 rounded-md outline-none text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
                    required
                />
            </div>
            <div className='flex flex-col items-start gap-2 w-full sm:w-auto'>
                <label htmlFor='return-date' className='text-sm font-medium text-gray-700'>Return Date</label>
                <input
                    value={returnDate}
                    onChange={e=>setReturnDate(e.target.value)}
                    type="date"
                    id="return-date"
                    className='w-full px-3 py-2.5 border border-gray-300 rounded-md outline-none text-sm text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
                    required
                />
            </div>
            
        </div>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center justify-center gap-2 px-6 sm:px-8 lg:px-9 py-3 mt-4 lg:mt-0 w-full sm:w-auto bg-primary hover:bg-primary-dull text-white rounded-lg lg:rounded-full cursor-pointer font-medium transition-colors shadow-md hover:shadow-lg'>
                <img src={assets.search_icon} alt="search" className='brightness-300 w-4 h-4'/>
                Search
            </motion.button>
      </motion.form>

      <motion.img
        initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.8, delay: 0.6 }}
      src={assets.main_car} alt="car" className='max-h-48 sm:max-h-60 md:max-h-72 lg:max-h-80 xl:max-h-96 w-auto object-contain'/>
    </motion.div>
  )
}

export default Hero
