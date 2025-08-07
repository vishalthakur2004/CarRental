import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import BookingCancellationModal from '../../components/BookingCancellationModal'
import BookingActionModal from '../../components/BookingActionModal'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {

  const { currency, axios } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  const fetchOwnerBookings = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error('Failed to load bookings. Please refresh the page.')
    }
  }

  const changeBookingStatus = async (bookingId, status)=>{
    try {
      const { data } = await axios.post('/api/bookings/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error('Failed to update booking status. Please try again.')
    }
  }

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const confirmCancelBooking = async (bookingId, cancellationReason) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status: 'cancelled',
        cancellationReason
      })

      if(data.success){
        toast.success('Booking cancelled successfully')
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to cancel booking. Please try again.')
    }
  }

  useEffect(()=>{
    fetchOwnerBookings()
  },[])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      
      <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index)=>(
              <tr key={index} className='border-t border-borderColor text-gray-500'>

                <td className='p-3 flex items-center gap-3'>
                  <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover'/>
                  <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                </td>

                <td className='p-3 max-md:hidden'>
                  {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                </td>

                <td className='p-3'>{currency}{booking.price}</td>

                <td className='p-3 max-md:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                </td>

                <td className='p-3'>
                  {booking.status === 'pending' ? (
                    <div className="flex flex-col gap-2">
                      <select onChange={e=> changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-2 py-1.5 text-gray-500 border border-borderColor rounded-md outline-none text-xs'>
                        <option value="pending">Pending</option>
                        <option value="booked">Accept</option>
                      </select>
                      <button
                        onClick={() => handleCancelBooking(booking)}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : booking.status === 'booked' ? (
                    <div className="flex flex-col gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold text-center">
                        Booked
                      </span>
                      <button
                        onClick={() => changeBookingStatus(booking._id, 'completed')}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-xs"
                      >
                        Mark Complete
                      </button>
                    </div>
                  ) : booking.status === 'completed' ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  ) : (
                    <div className="flex flex-col">
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold text-center mb-1">
                        Cancelled
                      </span>
                      {booking.cancellationReason && (
                        <p className="text-xs text-gray-500 italic">
                          {booking.cancellationReason.length > 30
                            ? `${booking.cancellationReason.substring(0, 30)}...`
                            : booking.cancellationReason
                          }
                        </p>
                      )}
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Cancellation Modal */}
      <BookingCancellationModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false)
          setSelectedBooking(null)
        }}
        onConfirm={confirmCancelBooking}
        booking={selectedBooking}
      />

    </div>
  )
}

export default ManageBookings
