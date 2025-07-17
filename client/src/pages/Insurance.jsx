import React, { useState } from "react";
import { motion } from "motion/react";

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const plans = [
    {
      id: "basic",
      name: "Basic Coverage",
      price: "Included",
      popular: false,
      features: [
        "Third-party liability coverage",
        "Collision damage waiver (CDW)",
        "Theft protection",
        "24/7 roadside assistance",
        "$1,000 damage excess",
        "Basic personal accident coverage",
      ],
      description:
        "Essential protection included with every rental at no extra cost.",
    },
    {
      id: "premium",
      name: "Premium Protection",
      price: "$15/day",
      popular: true,
      features: [
        "Everything in Basic Coverage",
        "Zero damage excess",
        "Personal effects coverage",
        "Extended roadside assistance",
        "Medical expense coverage",
        "Trip interruption protection",
        "Windscreen and tire coverage",
      ],
      description:
        "Enhanced protection for worry-free travel with comprehensive coverage.",
    },
    {
      id: "ultimate",
      name: "Ultimate Shield",
      price: "$25/day",
      popular: false,
      features: [
        "Everything in Premium Protection",
        "Key replacement coverage",
        "Emergency accommodation",
        "Alternative transport costs",
        "Extended medical coverage",
        "Business equipment protection",
        "Premium vehicle replacement",
      ],
      description:
        "Maximum protection with comprehensive coverage for all situations.",
    },
  ];

  const coverageTypes = [
    {
      title: "Collision Damage Waiver (CDW)",
      icon: "🚗",
      description:
        "Covers damage to the rental vehicle from collisions, regardless of fault.",
      coverage: "Up to full vehicle value",
      excess: "Varies by plan",
    },
    {
      title: "Third-Party Liability",
      icon: "👥",
      description:
        "Protects against claims from other parties for injury or property damage.",
      coverage: "Up to $1 million",
      excess: "No excess",
    },
    {
      title: "Theft Protection",
      icon: "🔒",
      description:
        "Coverage in case the rental vehicle is stolen during your rental period.",
      coverage: "Full vehicle value",
      excess: "Varies by plan",
    },
    {
      title: "Personal Accident Insurance",
      icon: "🏥",
      description:
        "Covers medical expenses and personal injury for the driver and passengers.",
      coverage: "Up to $50,000 per person",
      excess: "No excess",
    },
  ];

  const faqs = [
    {
      question: "What does the basic insurance cover?",
      answer:
        "Basic insurance includes third-party liability, collision damage waiver, theft protection, and 24/7 roadside assistance. It covers most common scenarios with a damage excess of $1,000.",
    },
    {
      question: "How do I make an insurance claim?",
      answer:
        "Contact our 24/7 emergency line immediately after any incident. We'll guide you through the claims process and connect you with our insurance partners. Most claims are processed within 5-7 business days.",
    },
    {
      question: "Can I purchase additional insurance after booking?",
      answer:
        "Yes, you can upgrade your insurance coverage up to 24 hours before your rental start time through your account dashboard or by contacting our customer service team.",
    },
    {
      question: "Does insurance cover damage caused by negligence?",
      answer:
        "Insurance coverage may be voided in cases of gross negligence, such as driving under the influence, reckless driving, or using the vehicle for prohibited activities. Please review the full terms for details.",
    },
    {
      question: "What happens if I decline additional insurance?",
      answer:
        "You'll still have basic coverage included with your rental. However, you'll be responsible for the damage excess and any costs not covered by basic insurance. We recommend reviewing your personal auto insurance policy for additional coverage.",
    },
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Insurance & Protection
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Travel with confidence knowing you're protected with comprehensive
            insurance coverage
          </p>
        </div>
      </motion.div>

      {/* Insurance Plans */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Choose Your Protection Level
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-primary transform scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  {plan.price}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 text-lg mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Coverage Types */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Types of Coverage
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coverageTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{type.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Coverage:
                    </span>
                    <p className="text-primary">{type.coverage}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Excess:</span>
                    <p className="text-primary">{type.excess}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Claims Process */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            How to Make a Claim
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Report Incident",
                  description:
                    "Contact our 24/7 emergency line immediately after any incident.",
                  icon: "📞",
                },
                {
                  step: "2",
                  title: "Document Everything",
                  description:
                    "Take photos, gather witness information, and complete the incident report.",
                  icon: "📸",
                },
                {
                  step: "3",
                  title: "Submit Claim",
                  description:
                    "Provide all required documentation through our online claims portal.",
                  icon: "📄",
                },
                {
                  step: "4",
                  title: "Get Resolution",
                  description:
                    "We process your claim and provide resolution within 5-7 business days.",
                  icon: "✅",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center bg-white rounded-xl p-6 shadow-md"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Insurance FAQ
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl shadow-md"
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
        </div>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Emergency Contact
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            In case of an accident or emergency, contact us immediately. Our
            team is available 24/7 to assist you.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">🚨 Emergency Hotline</h3>
              <p className="text-3xl font-bold">+1 800 EMERGENCY</p>
              <p className="text-lg mt-2">(+1 800 363-7436)</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">📧 Claims Email</h3>
              <p className="text-xl font-semibold">claims@sureride.com</p>
              <p className="text-lg mt-2">For non-emergency claims</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Insurance;
