import React, { useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import Title from '../components/Title'
import RatingReviewForm from '../components/RatingReviewForm'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const MyBookings = () => {

  const { axios, user, currency } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [userReviews, setUserReviews] = useState([])

  const fetchMyBookings = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to load your bookings. Please refresh the page.')
    }
  }

  const fetchUserReviews = async () => {
    try {
      const { data } = await axios.get('/api/reviews/user')
      if (data.success) {
        setUserReviews(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch user reviews:', error)
    }
  }

  const handleRateBooking = (booking) => {
    setSelectedBooking(booking)
    setShowRatingForm(true)
  }

  const handleReviewSubmitted = () => {
    fetchUserReviews()
    fetchMyBookings()
  }

  const getBookingReview = (bookingId) => {
    return userReviews.find(review => review.booking._id === bookingId)
  }

  useEffect(()=>{
    if (user) {
      fetchMyBookings()
      fetchUserReviews()
    }
  },[user])

  return (
    <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    
    className='px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-8 sm:mt-12 lg:mt-16 text-sm max-w-7xl mx-auto'>

      <Title title='My Bookings'
       subTitle='View and manage your all car bookings'
       align="left"/>

       <div>
        {bookings.map((booking, index)=>(
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          
          key={booking._id} className='grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 border border-borderColor rounded-lg mt-5 first:mt-8 sm:first:mt-12 bg-white shadow-sm hover:shadow-md transition-shadow'>
            {/* Car Image + Info */}

            <div className='lg:col-span-1'>
              <div className='rounded-lg overflow-hidden mb-3'>
                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover'/>
              </div>
              <p className='text-base sm:text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
              <p className='text-sm text-gray-500'>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
            </div>

            {/* Booking Info */}
            <div className='lg:col-span-2'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                <p className='px-3 py-2 bg-light rounded-lg text-sm font-medium'>Booking #{index+1}</p>
                <p className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  booking.status === 'booked' ? 'bg-green-400/15 text-green-600' :
                  booking.status === 'completed' ? 'bg-blue-400/15 text-blue-600' :
                  booking.status === 'pending' ? 'bg-yellow-400/15 text-yellow-600' :
                  'bg-red-400/15 text-red-600'
                }`}>
                  {booking.status === 'booked' ? 'Confirmed' : booking.status}
                </p>
              </div>

              <div className='flex items-start gap-3 mt-4'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1 flex-shrink-0'/>
                <div>
                  <p className='text-gray-500 text-sm font-medium'>Rental Period</p>
                  <p className='text-sm sm:text-base font-medium'>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-3 mt-4'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1 flex-shrink-0'/>
                <div>
                  <p className='text-gray-500 text-sm font-medium'>Pick-up Location</p>
                  <p className='text-sm sm:text-base font-medium'>{booking.car.location}</p>
                </div>
              </div>
            </div>

           {/* Price */}
           <div className='lg:col-span-1 flex flex-col justify-between gap-4 sm:gap-6'>
              <div className='text-sm text-gray-500 text-center lg:text-right bg-gray-50 p-4 rounded-lg'>
                <p className='font-medium'>Total Price</p>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mt-1'>{currency}{booking.price}</h1>
                <p className='text-xs sm:text-sm mt-2'>Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
           </div>


          </motion.div>
        ))}
       </div>
      
    </motion.div>
  )
}

export default MyBookings
