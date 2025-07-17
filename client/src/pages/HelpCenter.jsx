import React, { useState } from "react";
import Title from "../components/Title";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      category: "Booking & Reservations",
      questions: [
        {
          question: "How do I make a reservation?",
          answer:
            "You can make a reservation through our website or mobile app. Simply select your pickup and return dates, choose your preferred vehicle, and complete the booking process. You'll receive a confirmation email with all the details.",
        },
        {
          question: "Can I modify or cancel my booking?",
          answer:
            "Yes, you can modify or cancel your booking up to 24 hours before your pickup time without any fees. For modifications or cancellations within 24 hours, standard fees may apply.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payment methods like Apple Pay and Google Pay.",
        },
      ],
    },
    {
      category: "Vehicle & Pickup",
      questions: [
        {
          question: "What documents do I need to rent a car?",
          answer:
            "You'll need a valid driver's license, a credit card in the driver's name, and proof of insurance. International visitors may need an International Driving Permit.",
        },
        {
          question: "What is the minimum age to rent a car?",
          answer:
            "The minimum age to rent a car is 21 years old. Drivers under 25 may be subject to young driver fees and vehicle restrictions.",
        },
        {
          question: "Is fuel included in the rental?",
          answer:
            "Vehicles are provided with a full tank of fuel and should be returned with a full tank. If returned with less fuel, refueling charges will apply at current market rates.",
        },
      ],
    },
    {
      category: "Insurance & Coverage",
      questions: [
        {
          question: "What insurance options are available?",
          answer:
            "We offer comprehensive insurance packages including collision damage waiver, liability protection, and personal accident insurance. You can also use your own auto insurance if it covers rental vehicles.",
        },
        {
          question: "Am I covered if I have an accident?",
          answer:
            "With our insurance packages, you're protected against most accident-related costs. The extent of coverage depends on the insurance option you choose during booking.",
        },
      ],
    },
    {
      category: "Billing & Charges",
      questions: [
        {
          question: "When will I be charged?",
          answer:
            "A pre-authorization hold is placed on your card at booking. The final charge is processed after you return the vehicle, including any additional fees for extras or damages.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. All fees are clearly disclosed during the booking process, including taxes, airport fees, and optional extras.",
        },
      ],
    },
  ];

  const contactOptions = [
    {
      icon: assets.car_icon,
      title: "Phone Support",
      description: "Speak with our customer service team",
      contact: "+91 98765 43210",
      hours: "24/7 Support Available",
    },
    {
      icon: assets.gmail_logo,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "carrental5862@gmail.com",
      hours: "Response within 2 hours",
    },
    {
      icon: assets.users_icon,
      title: "Live Chat",
      description: "Get instant help from our team",
      contact: "Start Chat",
      hours: "Available 24/7",
    },
  ];

  const filteredFaqs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Help Center"
          subTitle="Find answers to common questions and get the support you need for your rental experience"
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center bg-white px-4 mt-8 max-w-lg w-full h-12 rounded-full shadow-lg"
        >
          <img src={assets.search_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search for help topics..."
            className="w-full h-full outline-none text-gray-700"
          />
        </motion.div>
      </motion.div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-8"
          >
            How can we help you today?
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: assets.carIcon,
                title: "Vehicle Issues",
                desc: "Report problems with your rental",
              },
              {
                icon: assets.calendar_icon_colored,
                title: "Booking Help",
                desc: "Manage your reservations",
              },
              {
                icon: assets.car_icon,
                title: "Billing Questions",
                desc: "Understand charges and fees",
              },
              {
                icon: assets.location_icon,
                title: "Pickup & Return",
                desc: "Find locations and procedures",
              },
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <img
                    src={action.icon}
                    alt={action.title}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {category.category}
                </h3>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const isOpen = openFaq === `${categoryIndex}-${faqIndex}`;
                    return (
                      <div
                        key={faqIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(
                              isOpen ? null : `${categoryIndex}-${faqIndex}`,
                            )
                          }
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">
                              {faq.question}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-gray-500"
                            >
                              ↓
                            </motion.span>
                          </div>
                        </button>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: isOpen ? "auto" : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-4"
          >
            Still need help?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-center mb-8 max-w-2xl mx-auto"
          >
            Our support team is available 24/7 to assist you with any questions
            or concerns you may have.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={option.icon}
                    alt={option.title}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {option.description}
                </p>
                <p className="text-primary font-medium mb-1">
                  {option.contact}
                </p>
                <p className="text-gray-500 text-xs">{option.hours}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
