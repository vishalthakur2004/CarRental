import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored},
  ]

  const fetchDashboardData = async ()=>{
    try {
       const { data } = await axios.get('/api/owner/dashboard')
       if (data.success){
        setData(data.dashboardData)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error('Failed to load dashboard data. Please refresh the page.')
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
    }
  },[isOwner])

  return (
    <div className='px-4 pt-6 sm:pt-8 lg:pt-10 md:px-6 lg:px-10 flex-1'>
      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"/>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6 sm:my-8 max-w-5xl'>
        {dashboardCards.map((card, index)=>(
          <div key={index} className='flex gap-3 items-center justify-between p-4 sm:p-5 rounded-lg border border-borderColor bg-white shadow-sm hover:shadow-md transition-shadow'>
            <div>
              <h1 className='text-xs sm:text-sm text-gray-500 font-medium'>{card.title}</h1>
              <p className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mt-1'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10'>
              <img src={card.icon} alt="" className='h-5 w-5 sm:h-6 sm:w-6'/>
            </div>
          </div>
        ))}
      </div>


      <div className='flex flex-col lg:flex-row items-start gap-6 mb-8 w-full'>
        {/* recent booking  */}
        <div className='p-4 sm:p-6 border border-borderColor rounded-lg bg-white shadow-sm flex-1 lg:max-w-2xl w-full'>
          <h1 className='text-lg sm:text-xl font-medium text-gray-800'>Recent Bookings</h1>
          <p className='text-gray-500 text-sm sm:text-base'>Latest customer bookings</p>
          {data.recentBookings.map((booking, index)=>(
            <div key={index} className='mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-3 border-b border-gray-100 last:border-b-0'>

              <div className='flex items-center gap-3'>
                <div className='flex sm:hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10'>
                  <img src={assets.listIconColored} alt="" className='h-4 w-4 sm:h-5 sm:w-5'/>
                </div>
                <div>
                  <p className='font-medium text-sm sm:text-base'>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-xs sm:text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-center justify-between sm:justify-end gap-2 sm:gap-3 font-medium'>
                <p className='text-sm sm:text-base text-gray-700'>{currency}{booking.price}</p>
                <p className={`px-2 sm:px-3 py-1 border border-borderColor rounded-full text-xs sm:text-sm ${
                  booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                  booking.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                  'bg-gray-50 text-gray-600'
                }`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* monthly revenue */}
        <div className='p-4 sm:p-6 mb-6 border border-borderColor rounded-lg bg-white shadow-sm w-full lg:max-w-sm'>
          <h1 className='text-lg sm:text-xl font-medium text-gray-800'>Monthly Revenue</h1>
          <p className='text-gray-500 text-sm sm:text-base'>Revenue for current month</p>
          <p className='text-2xl sm:text-3xl lg:text-4xl mt-4 sm:mt-6 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
        </div>
        
      </div>


    </div>
  )
}

export default Dashboard
