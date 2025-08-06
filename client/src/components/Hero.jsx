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
    className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>

        <motion.h1 initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl md:text-5xl font-semibold'>Luxury cars on Rent</motion.h1>
      
      <motion.form
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}

       onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>

        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 min-md:ml-8'>
            <div className='flex flex-col items-start gap-2'>
                <select
                  required
                  value={selectedState}
                  onChange={(e)=> {
                    setSelectedState(e.target.value)
                    setPickupLocation('') // Reset city when state changes
                  }}
                  className='px-3 py-2 border border-gray-300 rounded-md outline-none bg-white'
                >
                    <option value="">Select State</option>
                    {statesList.map((state, index)=> <option key={`${state}-${index}`} value={state}>{state}</option>)}
                </select>
                <p className='px-1 text-sm text-gray-500'>{selectedState ? selectedState : 'Please select state'}</p>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <select
                  required
                  value={pickupLocation}
                  onChange={(e)=>setPickupLocation(e.target.value)}
                  disabled={!selectedState}
                  className='px-3 py-2 border border-gray-300 rounded-md outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed'
                >
                    <option value="">{selectedState ? 'Select City' : 'Select state first'}</option>
                    {selectedState && stateCityMapping[selectedState] &&
                      stateCityMapping[selectedState].map((city, index)=> <option key={`${city}-${index}`} value={city}>{city}</option>)
                    }
                </select>
                <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : (selectedState ? 'Please select city' : 'Select state first')}</p>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor='pickup-date'>Pick-up Date</label>
                <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required/>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor='return-date'>Return Date</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='text-sm text-gray-500' required/>
            </div>
            
        </div>
            <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
                <img src={assets.search_icon} alt="search" className='brightness-300'/>
                Search
            </motion.button>
      </motion.form>

      <motion.img 
        initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.8, delay: 0.6 }}
      src={assets.main_car} alt="car" className='max-h-74'/>
    </motion.div>
  )
}

export default Hero
