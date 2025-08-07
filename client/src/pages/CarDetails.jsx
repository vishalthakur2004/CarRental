import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import BookingCalendar from '../components/BookingCalendar'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const {id} = useParams()

  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user, setShowLogin} = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e)=>{
    e.preventDefault();

    // Check if user is logged in before booking
    if (!user) {
      toast.error('Please login to book this car')
      setShowLogin(true)
      return
    }

    if (!pickupDate || !returnDate) {
      toast.error('Please select pickup and return dates')
      return
    }

    try {
      const {data} = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })

      if (data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to book this car')
        setShowLogin(true)
      } else {
        toast.error(error.response?.data?.message || 'Failed to book car. Please try again.')
      }
    }
  }

  useEffect(()=>{
    setCar(cars.find(car => car._id === id))
  },[cars, id])

  return car ? (
    <div className='px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 mt-8 sm:mt-12 lg:mt-16'>

      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all cars
       </button>

       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          {/* Left: Car Image & Details */}
          <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}

          className='lg:col-span-2'>
              <motion.img 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}

              src={car.image} alt="" className='w-full h-auto sm:max-h-80 md:max-h-96 lg:max-h-100 object-cover rounded-xl mb-4 sm:mb-6 shadow-md'/>
              <motion.div className='space-y-4 sm:space-y-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div>
                  <h1 className='text-2xl sm:text-3xl font-bold'>{car.brand} {car.model}</h1>
                  <p className='text-gray-500 text-base sm:text-lg'>{car.category} • {car.year}</p>
                </div>
                <hr className='border-borderColor my-6'/>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
                  {[
                    {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                    {icon: assets.fuel_icon, text: car.fuel_type},
                    {icon: assets.car_icon, text: car.transmission},
                    {icon: assets.location_icon, text: car.address?.city ? `${car.address.city}, ${car.address.state}` : car.location},
                  ].map(({icon, text})=>(
                    <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    
                    key={text} className='flex flex-col items-center bg-light p-3 sm:p-4 rounded-lg text-center'>
                      <img src={icon} alt="" className='h-4 sm:h-5 mb-2'/>
                      <span className='text-xs sm:text-sm'>{text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h1 className='text-lg sm:text-xl font-medium mb-3'>Description</h1>
                  <p className='text-gray-500 text-sm sm:text-base'>{car.description}</p>
                </div>

                {/* Pickup Address */}
                {car.address && (
                  <div>
                    <h1 className='text-lg sm:text-xl font-medium mb-3'>Pickup Location</h1>
                    <div className='bg-gray-50 p-3 sm:p-4 rounded-lg'>
                      <div className='flex items-start gap-2'>
                        <img src={assets.location_icon_colored} alt="" className='w-5 h-5 mt-1'/>
                        <div>
                          <p className='font-medium text-sm sm:text-base'>{car.address.city}, {car.address.state}</p>
                          {car.address.street && <p className='text-gray-600 text-xs sm:text-sm mt-1'>{car.address.street}</p>}
                          {car.address.landmark && <p className='text-gray-500 text-xs sm:text-sm'>Near {car.address.landmark}</p>}
                          {car.address.zipCode && <p className='text-gray-500 text-xs sm:text-sm'>ZIP: {car.address.zipCode}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h1 className='text-lg sm:text-xl font-medium mb-3'>Features</h1>
                  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    {
                      ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item)=>(
                        <li key={item} className='flex items-center text-gray-500 text-sm sm:text-base'>
                          <img src={assets.check_icon} className='h-3 sm:h-4 mr-2 flex-shrink-0' alt="" />
                          <span>{item}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>

              </motion.div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}

          onSubmit={handleSubmit} className='shadow-lg h-max lg:sticky lg:top-18 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6 text-gray-500'>

            <p className='flex items-center justify-between text-xl sm:text-2xl text-gray-800 font-semibold'>{currency}{car.pricePerDay}<span className='text-sm sm:text-base text-gray-400 font-normal'>per day</span></p> 

            <hr className='border-borderColor my-6'/>

            <div className='flex flex-col gap-2'>
              <label htmlFor="pickup-date" className='text-sm sm:text-base font-medium'>Pickup Date</label>
              <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
              type="date" className='border border-borderColor px-3 py-2.5 rounded-lg text-sm sm:text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors' required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="return-date" className='text-sm sm:text-base font-medium'>Return Date</label>
              <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
              type="date" className='border border-borderColor px-3 py-2.5 rounded-lg text-sm sm:text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors' required id='return-date'/>
            </div>

            <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 sm:py-3.5 font-medium text-white rounded-xl cursor-pointer text-sm sm:text-base shadow-md hover:shadow-lg'>Book Now</button>

            <p className='text-center text-xs sm:text-sm text-gray-500'>No credit card required to reserve</p>

          </motion.form>
       </div>

    </div>
  ) : <Loader />
}

export default CarDetails
