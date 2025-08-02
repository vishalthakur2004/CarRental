import React from 'react'
import { motion } from 'motion/react'

const DataProtection = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a reservation, or contact us. This includes personal information like your name, email address, phone number, driver's license information, and payment details."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use your information to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers."
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers, law enforcement when required by law, and in connection with business transfers."
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie preferences through your browser settings, though this may affect functionality."
    },
    {
      title: "6. Data Retention",
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law."
    },
    {
      title: "7. Your Rights and Choices",
      content: "You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us to exercise these rights."
    },
    {
      title: "8. Children's Privacy",
      content: "Our services are not directed to children under 18. We do not knowingly collect personal information from children under 18. If we become aware of such collection, we will take steps to remove the information."
    },
    {
      title: "9. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers."
    },
    {
      title: "10. Changes to This Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date."
    }
  ]

  const dataTypes = [
    {
      category: "Personal Information",
      items: ["Name, email, phone number", "Driver's license details", "Government-issued ID", "Payment information"],
      icon: "👤"
    },
    {
      category: "Usage Information",
      items: ["Rental history", "Search queries", "Device information", "IP address and location"],
      icon: "📊"
    },
    {
      category: "Communication Data",
      items: ["Customer support messages", "Reviews and feedback", "Marketing preferences", "Account notifications"],
      icon: "💬"
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              Our Commitment to Your Privacy
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 leading-relaxed"
            >
              At CarRental, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our car rental services.
            </motion.p>
          </motion.div>

          {/* Data Collection Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center text-gray-800"
            >
              Types of Information We Collect
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {dataTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="text-3xl mb-4 text-center">{type.icon}</div>
                  <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">{type.category}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 text-sm">• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Policy Sections */}
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

          {/* Your Rights Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-green-50 border border-green-200 rounded-xl p-8 mt-12"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-green-800"
            >
              Your Privacy Rights
            </motion.h3>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 text-green-700"
            >
              <div>
                <h4 className="font-semibold mb-2">You have the right to:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Delete your account and data</li>
                  <li>• Export your data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">You can also:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Opt out of marketing emails</li>
                  <li>• Disable cookies in your browser</li>
                  <li>• Request data processing limitations</li>
                  <li>• File a complaint with authorities</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-8"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 text-blue-800"
            >
              Contact Our Privacy Team
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-blue-700 mb-4"
            >
              If you have any questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-2 text-blue-700"
            >
              <p><strong>Email:</strong> privacy@carrental.com</p>
              <p><strong>Phone:</strong> +91 1800-123-4567</p>
              <p><strong>Address:</strong> Data Protection Officer, 123 Business District, Jalandhar, Punjab 144011, India</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DataProtection