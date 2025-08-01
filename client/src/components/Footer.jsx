import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    
    className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            
            className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div>
                    <motion.img 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}

                    src={assets.logo} alt="logo" className='h-8 md:h-9' />

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}

                    className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    
                    className='flex items-center gap-3 mt-6'>
                        <a href="#" className="hover:scale-110 transition-transform duration-200"> <img src={assets.facebook_logo} className='w-5 h-5' alt="Facebook" /> </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200"> <img src={assets.instagram_logo} className='w-5 h-5' alt="Instagram" /> </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200"> <img src={assets.twitter_logo} className='w-5 h-5' alt="Twitter" /> </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200"> <img src={assets.gmail_logo} className='w-5 h-5' alt="Email" /> </a>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}

                className='flex flex-wrap justify-between w-1/2 gap-8'>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
                        <li><Link to="/cars" className="hover:text-primary transition-colors duration-200">Browse Cars</Link></li>
                        <li><Link to="/list-your-car" className="hover:text-primary transition-colors duration-200">List Your Car</Link></li>
                        <li><Link to="/about-us" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><Link to="/help-center" className="hover:text-primary transition-colors duration-200">Help Center</Link></li>
                        <li><Link to="/terms-of-service" className="hover:text-primary transition-colors duration-200">Terms of Service</Link></li>
                        <li><Link to="/data-protection" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
                        <li><Link to="/insurance" className="hover:text-primary transition-colors duration-200">Insurance</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>123 Business District</li>
                        <li>Jalandhar, Punjab 144011</li>
                        <li>+91 1800-123-4567</li>
                        <li>info@carrental.com</li>
                    </ul>
                </div>

                </motion.div>
                

                  
                

            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><Link to="/data-protection" className="hover:text-primary transition-colors duration-200">Privacy</Link></li>
                    <li>|</li>
                    <li><Link to="/terms-of-service" className="hover:text-primary transition-colors duration-200">Terms</Link></li>
                    <li>|</li>
                    <li><Link to="/data-protection" className="hover:text-primary transition-colors duration-200">Cookies</Link></li>
                </ul>
            </motion.div>
        </motion.div>
  )
}

export default Footer
