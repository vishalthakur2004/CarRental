import React, { useState } from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "general", name: "General", icon: "❓" },
    { id: "booking", name: "Booking", icon: "📅" },
    { id: "payment", name: "Payment", icon: "💳" },
    { id: "vehicle", name: "Vehicles", icon: "🚗" },
    { id: "account", name: "Account", icon: "👤" },
    { id: "support", name: "Support", icon: "🎧" },
  ];

  const faqs = {
    general: [
      {
        question: "What is SureRide?",
        answer:
          "SureRide is a premium car rental platform that connects you with high-quality vehicles for all your transportation needs. We offer a wide range of cars from economy to luxury, available for short-term and long-term rentals.",
      },
      {
        question: "How does SureRide work?",
        answer:
          "Simply browse our available vehicles, select your preferred car, choose your rental dates, and book instantly. You can pick up your vehicle at our designated locations or opt for delivery service in select areas.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "SureRide operates in over 100 cities worldwide. Check our website or app to see if we're available in your location. We're constantly expanding to new markets.",
      },
      {
        question: "Do you offer 24/7 customer support?",
        answer:
          "Yes! Our customer support team is available 24/7 to assist you with any questions or issues. You can reach us via phone, email, or live chat.",
      },
    ],
    booking: [
      {
        question: "How do I make a reservation?",
        answer:
          "You can make a reservation through our website or mobile app. Simply enter your location, dates, and time, browse available vehicles, and complete your booking with a few clicks.",
      },
      {
        question: "Can I modify or cancel my booking?",
        answer:
          "Yes, you can modify or cancel your booking up to 24 hours before your rental start time without any fees. Changes made within 24 hours may incur additional charges.",
      },
      {
        question: "What happens if I'm late for pickup?",
        answer:
          "We hold your reservation for up to 1 hour past your scheduled pickup time. If you're running late, please contact us to avoid any issues. Late fees may apply for extended delays.",
      },
      {
        question: "Can I extend my rental period?",
        answer:
          "Yes, you can extend your rental period subject to vehicle availability. Contact our customer service team or use the app to request an extension. Additional charges will apply for the extended period.",
      },
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and digital payment methods like Apple Pay and Google Pay.",
      },
      {
        question: "When will I be charged?",
        answer:
          "A pre-authorization hold is placed on your card when you book. The final charge is processed when you return the vehicle, including any additional fees for fuel, damages, or late returns.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in transparent pricing. All fees are clearly displayed before you complete your booking. Additional charges may apply for optional services like GPS, child seats, or fuel refill.",
      },
      {
        question: "Do you require a security deposit?",
        answer:
          "Yes, a refundable security deposit is required based on the vehicle category. This is held on your card and released within 3-7 business days after the vehicle is returned in good condition.",
      },
    ],
    vehicle: [
      {
        question: "What types of vehicles do you offer?",
        answer:
          "We offer a diverse fleet including economy cars, sedans, SUVs, luxury vehicles, sports cars, and specialty vehicles. All our cars are regularly maintained and thoroughly cleaned.",
      },
      {
        question: "What's included with my rental?",
        answer:
          "Your rental includes unlimited mileage, basic insurance coverage, 24/7 roadside assistance, and a full tank of fuel. Additional services like GPS and child seats are available for an extra fee.",
      },
      {
        question: "Can I choose a specific car model?",
        answer:
          "You can select a specific vehicle category. While we make every effort to provide the exact model shown, we reserve the right to substitute with a similar or higher category vehicle.",
      },
      {
        question: "What if the vehicle breaks down?",
        answer:
          "All our vehicles come with 24/7 roadside assistance. If you experience any issues, contact our emergency line immediately. We'll arrange for repairs or a replacement vehicle at no additional cost.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' on our website or app, provide your email and basic information, verify your email address with the OTP sent to you, and you're ready to start booking!",
      },
      {
        question: "What information do I need to rent a car?",
        answer:
          "You'll need a valid driver's license (held for at least 1 year), a credit card in your name, and you must be at least 21 years old. International customers may need additional documentation.",
      },
      {
        question: "Can I add additional drivers?",
        answer:
          "Yes, you can add additional drivers to your rental. They must meet the same requirements and be present during pickup with their valid driver's license. Additional driver fees may apply.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Log into your account and go to 'Profile Settings' to update your personal information, payment methods, and preferences. Make sure to keep your driver's license information current.",
      },
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via phone at +1 234 567890, email at support@sureride.com, or use the live chat feature on our website and app. We're available 24/7 to help you.",
      },
      {
        question: "What should I do in case of an accident?",
        answer:
          "First, ensure everyone's safety and call emergency services if needed. Then contact SureRide immediately at our emergency line. Document the incident and gather necessary information for insurance purposes.",
      },
      {
        question: "How do I report a problem with my rental?",
        answer:
          "Contact our customer service team immediately through phone, email, or live chat. Provide your booking reference and details about the issue. We'll work quickly to resolve any problems.",
      },
      {
        question: "Can I provide feedback about my experience?",
        answer:
          "Absolutely! We value your feedback. You can leave reviews and ratings after your rental, contact us directly, or use the feedback form on our website. Your input helps us improve our service.",
      },
    ],
  };

  const filteredFaqs = faqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Help Center</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to your questions and get the support you need
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg outline-none focus:ring-4 focus:ring-white/30"
              />
              <img
                src={assets.search_icon}
                alt="search"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-6 py-12"
      >
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Frequently Asked Questions -{" "}
            {categories.find((cat) => cat.id === activeCategory)?.name}
          </motion.h2>

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-gray-800 hover:text-primary transition-colors">
                    {faq.question}
                    <span className="ml-4 transform group-open:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-500">
                No results found. Try a different search term or browse other
                categories.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Contact Support Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you 24/7. Get in touch and we'll
            get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <p className="text-primary font-semibold">+1 234 567890</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <p className="text-primary font-semibold">support@sureride.com</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Get instant help through our chat
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpCenter;
