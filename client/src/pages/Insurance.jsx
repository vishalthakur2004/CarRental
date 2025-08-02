import React, { useState } from 'react'
import { motion } from 'motion/react'

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const insurancePlans = [
    {
      name: "Basic Coverage",
      price: "Included Free",
      description: "Standard protection included with every rental",
      features: [
        "Third-party liability coverage",
        "Basic vehicle damage coverage",
        "24/7 roadside assistance",
        "Theft protection",
        "₹25,000 security deposit"
      ],
      icon: "🛡️",
      color: "blue"
    },
    {
      name: "Premium Coverage",
      price: "₹299/day",
      description: "Enhanced protection for peace of mind",
      features: [
        "All Basic Coverage benefits",
        "Reduced security deposit (₹10,000)",
        "Personal accident coverage",
        "Damage waiver (up to ₹50,000)",
        "Priority customer support"
      ],
      icon: "⭐",
      color: "green",
      popular: true
    },
    {
      name: "Comprehensive Coverage",
      price: "₹499/day",
      description: "Maximum protection for worry-free driving",
      features: [
        "All Premium Coverage benefits",
        "Zero security deposit",
        "Full damage waiver",
        "Personal belongings coverage",
        "Medical expense coverage (₹2 lakhs)",
        "Trip interruption coverage"
      ],
      icon: "🏆",
      color: "purple"
    }
  ]

  const coverageDetails = [
    {
      title: "Vehicle Damage Protection",
      description: "Covers repair costs from accidents, vandalism, or natural disasters",
      icon: "🚗"
    },
    {
      title: "Theft Protection",
      description: "Full coverage if the vehicle is stolen during your rental period",
      icon: "🔒"
    },
    {
      title: "Third-Party Liability",
      description: "Protects against claims for injury or property damage to others",
      icon: "👥"
    },
    {
      title: "Personal Accident Coverage",
      description: "Medical expenses and compensation for rental-related accidents",
      icon: "🏥"
    },
    {
      title: "Roadside Assistance",
      description: "24/7 support for breakdowns, flat tires, and emergency services",
      icon: "🚨"
    },
    {
      title: "Legal Support",
      description: "Legal assistance for traffic violations and accident-related issues",
      icon: "⚖️"
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
            Insurance Coverage
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Drive with confidence knowing you're fully protected
          </motion.p>
        </div>
      </motion.div>

      <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Coverage Overview */}
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
            What's Covered
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageDetails.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{coverage.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{coverage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{coverage.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insurance Plans */}
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
            Choose Your Protection Level
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {insurancePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.popular ? 'border-2 border-green-400' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-green-400 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className={`text-2xl font-bold ${
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    }`}>
                      {plan.price}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                      plan.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      plan.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Claims Process */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
          >
            How to File a Claim
          </motion.h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Report Incident", description: "Call our 24/7 helpline immediately" },
                { step: "2", title: "Document Everything", description: "Take photos and gather witness information" },
                { step: "3", title: "Submit Claim", description: "Complete the online claim form" },
                { step: "4", title: "Get Assistance", description: "Our team handles the rest" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency Claims Hotline</h3>
            <p className="text-red-700 mb-4">Available 24/7 for accidents and emergencies</p>
            <div className="space-y-2">
              <a href="tel:+911800123456" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Call: +91 1800-123-456
              </a>
              <p className="text-red-600 text-sm">WhatsApp: +91 98765-43210</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-gray-800"
          >
            Insurance FAQs
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                question: "Is insurance mandatory?",
                answer: "Basic coverage is included free with every rental. Additional coverage is optional but recommended."
              },
              {
                question: "What's not covered?",
                answer: "Intentional damage, driving under influence, traffic violations, and damage from off-road driving are not covered."
              },
              {
                question: "How quickly are claims processed?",
                answer: "Most claims are processed within 48-72 hours. Emergency assistance is available 24/7."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Insurance