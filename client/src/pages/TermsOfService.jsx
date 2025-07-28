import React from 'react'
import { motion } from 'motion/react'

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using CarRental's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Rental Requirements",
      content: "To rent a vehicle, you must be at least 21 years old, possess a valid driver's license, and provide a valid government-issued photo ID and credit card. Additional age restrictions may apply for certain vehicle categories."
    },
    {
      title: "3. Vehicle Use",
      content: "Vehicles must be used in accordance with all applicable laws and regulations. The vehicle may not be used for commercial purposes, racing, or any illegal activities. Smoking is prohibited in all vehicles."
    },
    {
      title: "4. Payment and Fees",
      content: "Payment is due at the time of rental. We accept major credit cards. Additional fees may apply for late returns, fuel charges, cleaning fees, or damage repairs. All prices are subject to applicable taxes."
    },
    {
      title: "5. Insurance and Liability",
      content: "Basic insurance coverage is included with all rentals. Renters are responsible for deductibles and any damages not covered by insurance. Additional coverage options are available for purchase."
    },
    {
      title: "6. Cancellation Policy",
      content: "Bookings may be cancelled up to 24 hours before the pickup time for a full refund. Cancellations within 24 hours may incur a cancellation fee. No-shows will result in forfeiture of the full rental amount."
    },
    {
      title: "7. Vehicle Condition",
      content: "Customers are responsible for inspecting the vehicle before use and reporting any damage or issues. The vehicle must be returned in the same condition as received, normal wear and tear excepted."
    },
    {
      title: "8. Prohibited Uses",
      content: "Vehicles may not be used to: transport hazardous materials, exceed passenger capacity, drive off-road (unless specifically permitted), or use while under the influence of alcohol or drugs."
    },
    {
      title: "9. Privacy Policy",
      content: "We are committed to protecting your privacy. Personal information collected during the rental process is used solely for business purposes and is not shared with third parties except as required by law."
    },
    {
      title: "10. Limitation of Liability",
      content: "CarRental's liability is limited to the maximum extent permitted by law. We are not responsible for indirect, incidental, or consequential damages arising from the use of our services."
    },
    {
      title: "11. Modifications",
      content: "CarRental reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms."
    },
    {
      title: "12. Governing Law",
      content: "These terms are governed by the laws of India. Any disputes arising from these terms or the use of our services will be subject to the jurisdiction of Indian courts."
    }
  ]

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
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Please read these terms carefully before using our services
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg opacity-75 mt-4"
          >
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-gray-800"
            >
              Welcome to CarRental
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 leading-relaxed"
            >
              These Terms of Service ("Terms") govern your relationship with CarRental operated by our company. 
              By using our service, you agree to these terms. Please read them carefully.
            </motion.p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-12"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-blue-800"
            >
              Questions About These Terms?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-blue-700 mb-4"
            >
              If you have any questions about these Terms of Service, please contact us:
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-2 text-blue-700"
            >
              <p><strong>Email:</strong> legal@carrental.com</p>
              <p><strong>Phone:</strong> +91 1800-123-4567</p>
              <p><strong>Address:</strong> 123 Business District, Mumbai, Maharashtra 400001, India</p>
            </motion.div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mt-8"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl font-bold mb-4 text-yellow-800"
            >
              Important Notice
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-yellow-700"
            >
              By continuing to use CarRental services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service. These terms may be updated from time to time, 
              and continued use constitutes acceptance of any changes.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
