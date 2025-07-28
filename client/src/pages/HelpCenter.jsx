import React, { useState } from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: "How do I book a car?",
      answer: "Simply search for your location and dates, browse available cars, select your preferred vehicle, and complete the booking process. You'll receive a confirmation email with pickup details."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driver's license, government-issued ID (Aadhar card/Passport), and a credit card for security deposit. All documents should be original and valid."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before pickup time for a full refund. Cancellations within 24 hours may incur a small fee."
    },
    {
      question: "Is insurance included?",
      answer: "Yes, all our rentals include comprehensive insurance coverage. Additional coverage options are available for extra protection."
    },
    {
      question: "What if the car breaks down?",
      answer: "We provide 24/7 roadside assistance. Call our support number immediately, and we'll arrange repairs or a replacement vehicle at no extra cost."
    },
    {
      question: "How do I become a car owner on the platform?",
      answer: "Visit our 'List Your Car' page, fill out the application form, and our team will verify your documents. Once approved, you can start listing your vehicles."
    },
    {
      question: "What are the fuel policies?",
      answer: "Cars are provided with a full tank and should be returned with the same level. If returned with less fuel, a refueling charge will be applied."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental if the car is available. Contact customer support or use the app to request an extension."
    }
  ]

  const contactMethods = [
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 1800-123-4567",
      hours: "24/7 Available",
      icon: "📞"
    },
    {
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@carrental.com",
      hours: "Response within 2 hours",
      icon: "📧"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      hours: "9 AM - 11 PM",
      icon: "💬"
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary to-primary-dull text-white py-20 px-6 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Help Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90 mb-8"
          >
            Find answers to your questions and get the support you need
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-800 rounded-full border-none focus:ring-2 focus:ring-white/30"
              />
              <img src={assets.search_icon} alt="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Contact Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
          >
            Get in Touch
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-primary font-semibold mb-2">{method.contact}</p>
                <p className="text-sm text-gray-500">{method.hours}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary"
                  >
                    <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5 transform rotate-90" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">No results found for "{searchQuery}". Try a different search term.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Emergency Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-4xl mx-auto mt-20"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency Support</h3>
            <p className="text-red-700 mb-4">For roadside assistance or emergencies during your rental</p>
            <a href="tel:+911800123456" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Call Emergency Line: +91 1800-123-456
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HelpCenter
