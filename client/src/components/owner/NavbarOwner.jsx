import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user, logout} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
      <Link to='/'>
        <img src={assets.logo} alt="" className="h-7"/>
      </Link>

      <div className='flex items-center gap-6'>
        <span className='text-gray-700'>Welcome, {user?.name || "Owner"}</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default NavbarOwner
