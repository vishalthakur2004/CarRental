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
            {menuLinks.map((link, index)=> (
                <Link
                    key={index}
                    to={link.path}
                    className='hover:text-primary transition-colors duration-200 text-sm md:text-base max-md:text-lg max-md:py-2 whitespace-nowrap'
                    onClick={() => setOpen(false)}
                >
                    {link.name}
                </Link>
            ))}

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 py-2 rounded-full max-w-56 bg-white/50 backdrop-blur-sm'>
                <input type="text" className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-sm" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-60'/>
            </div>

            <div className='flex max-md:flex-col items-start md:items-center gap-3 md:gap-4 lg:gap-6 max-md:w-full max-md:mt-4'>

                <button
                    onClick={()=> {isOwner ? navigate('/owner') : changeRole(); setOpen(false)}}
                    className="cursor-pointer hover:text-primary transition-colors duration-200 text-base max-sm:text-lg max-sm:py-2"
                >
                    {isOwner ? 'Dashboard' : 'List cars'}
                </button>

                {user && (
                    <button
                        onClick={() => {navigate('/owner/add-car'); setOpen(false)}}
                        className="cursor-pointer px-4 py-2 border border-gray-300 hover:border-primary hover:text-primary transition-all text-gray-600 rounded-lg text-sm font-medium max-sm:w-full max-sm:text-center max-sm:text-base"
                    >
                        Add Car
                    </button>
                )}

                <div className='flex max-sm:flex-col items-center max-sm:items-start gap-4 max-sm:w-full'>
                    {user && (
                        <span className='text-sm font-medium text-gray-700 max-sm:text-base max-sm:py-1'>
                            Welcome, {user.name}
                        </span>
                    )}

                    {user && <NotificationIcon />}

                    <button
                        onClick={()=> {user ? logout() : setShowLogin(true); setOpen(false)}}
                        className="cursor-pointer px-6 sm:px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg max-sm:w-full max-sm:text-center max-sm:text-base"
                    >
                        {user ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </div>

        <button className='sm:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors duration-200' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6'/>
        </button>
      
    </motion.div>
  )
}

export default Navbar
