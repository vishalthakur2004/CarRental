import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async ()=>{
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Failed to update account status. Please try again.')
        }
    }

  return (
    <motion.div
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white shadow-sm relative transition-all z-50`}>

        <Link to='/'>
            <motion.div whileHover={{scale: 1.05}} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                        <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1l1.68 5.39a3 3 0 002.22 2.61c.58.13 1.17.11 1.75-.04L13 14a1 1 0 001-1V9a1 1 0 00-1-1H6.78l-.22-.89A3 3 0 003.64 4H3z"/>
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800">CarRental</span>
            </motion.div>
        </Link>

        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-gray-200 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 max-sm:p-6 transition-all duration-300 z-50 bg-white ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>

            {/* Navigation Links */}
            <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <Link
                    to="/"
                    className={`text-base font-medium transition-colors duration-200 max-sm:text-lg max-sm:py-2 ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                    onClick={() => setOpen(false)}
                >
                    Home
                </Link>
                <Link
                    to="/cars"
                    className={`text-base font-medium transition-colors duration-200 max-sm:text-lg max-sm:py-2 ${location.pathname === "/cars" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                    onClick={() => setOpen(false)}
                >
                    Cars
                </Link>
                <Link
                    to="/my-bookings"
                    className={`text-base font-medium transition-colors duration-200 max-sm:text-lg max-sm:py-2 ${location.pathname === "/my-bookings" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                    onClick={() => setOpen(false)}
                >
                    My Bookings
                </Link>
                <button
                    onClick={()=> {navigate('/cars'); setOpen(false)}}
                    className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 max-sm:text-lg max-sm:py-2"
                >
                    Search cars
                </button>
            </nav>

            {/* Search Icon */}
            <button
                onClick={() => {navigate('/cars'); setOpen(false)}}
                className='hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200'
            >
                <img src={assets.search_icon} alt="search" className='w-5 h-5 opacity-60'/>
            </button>

            {/* User Actions */}
            <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full max-sm:mt-4'>
                <button
                    onClick={()=> {isOwner ? navigate('/owner') : changeRole(); setOpen(false)}}
                    className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 max-sm:text-lg max-sm:py-2"
                >
                    {isOwner ? 'Dashboard' : 'List cars'}
                </button>

                {user ? (
                    <div className='flex max-sm:flex-col items-center max-sm:items-start gap-4 max-sm:w-full'>
                        <span className='text-sm font-medium text-gray-600 max-sm:text-base max-sm:py-1'>
                            Dashboard, {user.name}
                        </span>
                        <button
                            onClick={()=> {logout(); setOpen(false)}}
                            className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 max-sm:text-lg max-sm:py-2"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={()=> {setShowLogin(true); setOpen(false)}}
                        className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 max-sm:text-lg max-sm:py-2"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>

        <button className='sm:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-200' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6'/>
        </button>

    </motion.div>
  )
}

export default Navbar
