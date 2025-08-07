import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'
import NotificationIcon from './NotificationIcon'

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
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`}>

        <Link to='/'>
            <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-8"/>
        </Link>

        <div className={`max-md:fixed max-md:h-screen max-md:w-full max-md:top-16 max-md:border-t border-borderColor right-0 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 lg:gap-8 max-md:p-6 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}>
            {/* Main navigation links */}
            <Link
                to="/"
                className='hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap'
                onClick={() => setOpen(false)}
            >
                Home
            </Link>

            <Link
                to="/cars"
                className='hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap'
                onClick={() => setOpen(false)}
            >
                Cars
            </Link>

            {user && (
                <Link
                    to="/my-bookings"
                    className='hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap'
                    onClick={() => setOpen(false)}
                >
                    My Bookings
                </Link>
            )}

            <Link
                to="/about-us"
                className='hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap'
                onClick={() => setOpen(false)}
            >
                About
            </Link>

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 py-2 rounded-full max-w-56 bg-white/50 backdrop-blur-sm'>
                <input type="text" className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-sm" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-60'/>
            </div>

            {/* User-specific navigation when logged in */}
            {user && (
                <div className='flex max-md:flex-col items-start md:items-center gap-3 md:gap-4 lg:gap-6 max-md:w-full max-md:mt-4 max-md:border-t max-md:border-gray-200 max-md:pt-4'>

                    {/* Direct access navigation links for logged-in users */}
                    <Link
                        to="/cars"
                        className="cursor-pointer hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap font-medium"
                        onClick={() => setOpen(false)}
                    >
                        🚗 Rent Cars
                    </Link>

                    <Link
                        to="/my-bookings"
                        className="cursor-pointer hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap font-medium"
                        onClick={() => setOpen(false)}
                    >
                        📋 My Bookings
                    </Link>

                    {/* Dashboard link - prominent for owners */}
                    {isOwner && (
                        <Link
                            to="/owner"
                            className="cursor-pointer px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all text-xs md:text-sm font-medium max-md:w-full max-md:text-center max-md:text-base whitespace-nowrap border border-blue-200"
                            onClick={() => setOpen(false)}
                        >
                            📊 Owner Dashboard
                        </Link>
                    )}

                    {/* Add Car button for owners */}
                    {isOwner && (
                        <button
                            onClick={() => {navigate('/owner/add-car'); setOpen(false)}}
                            className="cursor-pointer px-3 md:px-4 py-2 border border-gray-300 hover:border-primary hover:text-primary transition-all text-gray-600 rounded-lg text-xs md:text-sm font-medium max-md:w-full max-md:text-center max-md:text-base whitespace-nowrap"
                        >
                            ➕ Add Car
                        </button>
                    )}

                    {/* Become an Owner button for regular users */}
                    {!isOwner && (
                        <button
                            onClick={() => {changeRole(); setOpen(false)}}
                            className="cursor-pointer px-3 md:px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-lg transition-all text-xs md:text-sm font-medium max-md:w-full max-md:text-center max-md:text-base whitespace-nowrap"
                        >
                            🏆 Become Owner
                        </button>
                    )}
                </div>
            )}

            {/* User profile and logout section */}
            <div className='flex max-md:flex-col items-center max-md:items-start gap-3 md:gap-4 max-md:w-full max-md:mt-4'>
                {user && (
                    <div className='flex items-center gap-3 max-md:w-full max-md:justify-between'>
                        <span className='text-xs md:text-sm font-medium text-gray-700 max-md:text-base max-md:py-1 whitespace-nowrap'>
                            Welcome, {user.name}
                        </span>
                        <NotificationIcon />
                    </div>
                )}

                <button
                    onClick={()=> {user ? logout() : setShowLogin(true); setOpen(false)}}
                    className="cursor-pointer px-4 md:px-6 lg:px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg text-xs md:text-sm max-md:w-full max-md:text-center max-md:text-base whitespace-nowrap"
                >
                    {user ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>

        <button className='md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-200' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6'/>
        </button>
      
    </motion.div>
  )
}

export default Navbar
