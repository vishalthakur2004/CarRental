import React, { useState } from "react";
import Title from "../components/Title";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const insurancePlans = [
    {
      id: "basic",
      name: "Basic Protection",
      price: "$15/day",
      recommended: false,
      features: [
        "Collision Damage Waiver (CDW)",
        "Theft Protection",
        "Third-party Liability Coverage",
        "$1,000 damage excess",
        "Roadside Assistance",
      ],
      description: "Essential coverage for peace of mind during your rental",
      coverage: "Up to $25,000",
    },
    {
      id: "standard",
      name: "Standard Protection",
      price: "$25/day",
      recommended: true,
      features: [
        "Everything in Basic Protection",
        "Personal Accident Insurance",
        "Personal Effects Coverage",
        "$500 damage excess",
        "Windscreen & Tire Protection",
        "Key Replacement Coverage",
      ],
      description: "Comprehensive protection for most travelers",
      coverage: "Up to $50,000",
    },
    {
      id: "premium",
      name: "Premium Protection",
      price: "$35/day",
      recommended: false,
      features: [
        "Everything in Standard Protection",
        "Zero Excess Coverage",
        "Extended Personal Effects Coverage",
        "Trip Interruption Coverage",
        "Enhanced Roadside Assistance",
        "Rental Car Coverage for Delays",
      ],
      description:
        "Maximum protection with zero excess for complete peace of mind",
      coverage: "Up to $100,000",
    },
  ];

  const coverageDetails = [
    {
      icon: assets.check_icon,
      title: "Collision Damage Waiver",
      description:
        "Covers damage to the rental vehicle in case of collision or rollover",
    },
    {
      icon: assets.car_icon,
      title: "Theft Protection",
      description: "Protection against vehicle theft and attempted theft",
    },
    {
      icon: assets.users_icon,
      title: "Personal Accident Insurance",
      description:
        "Medical expenses and accidental death coverage for you and passengers",
    },
    {
      icon: assets.star_icon,
      title: "Personal Effects Coverage",
      description:
        "Coverage for personal belongings stolen from the rental vehicle",
    },
    {
      icon: assets.location_icon,
      title: "Roadside Assistance",
      description:
        "24/7 emergency roadside assistance for breakdowns and emergencies",
    },
    {
      icon: assets.tick_icon,
      title: "Legal Liability",
      description:
        "Protection against third-party property damage and injury claims",
    },
  ];

  const faqs = [
    {
      question:
        "Do I need rental car insurance if I have personal auto insurance?",
      answer:
        "While your personal auto insurance may provide some coverage, it often has limitations for rental cars. Our insurance plans provide additional protection and eliminate gaps in coverage.",
    },
    {
      question: 'What does "excess" mean?',
      answer:
        "Excess is the amount you pay out-of-pocket before insurance coverage kicks in. Our Premium Protection plan offers zero excess, meaning you pay nothing for covered damages.",
    },
    {
      question: "Can I purchase insurance after my rental begins?",
      answer:
        "Insurance must be purchased at the time of rental. It cannot be added retroactively after your rental period has started.",
    },
    {
      question: "Are there any exclusions to the coverage?",
      answer:
        "Yes, standard exclusions include damage due to negligence, driving under the influence, off-road driving, and using the vehicle for commercial purposes. Full terms are provided with your policy.",
    },
  ];

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
          title="Insurance Coverage"
          subTitle="Protect yourself and your rental with comprehensive insurance options tailored to your needs"
        />
      </motion.div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-7xl mx-auto">
        {/* Insurance Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-4"
          >
            Choose Your Protection Level
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Select the insurance plan that best fits your travel needs and
            budget. All plans include comprehensive coverage and 24/7 support.
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-8">
            {insurancePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                  plan.recommended
                    ? "border-primary shadow-xl"
                    : selectedPlan === plan.id
                      ? "border-primary"
                      : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    Coverage: {plan.coverage}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.recommended
                      ? "bg-primary text-white hover:bg-primary-dull"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coverage Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-12"
          >
            What's Covered
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageDetails.map((coverage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={coverage.icon}
                    alt={coverage.title}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="font-semibold mb-3">{coverage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {coverage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Our Insurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-semibold mb-6"
              >
                Why Choose Car Rental Insurance?
              </motion.h2>
              <div className="space-y-4">
                {[
                  "Simple, transparent pricing with no hidden fees",
                  "24/7 claims support and emergency assistance",
                  "Fast claim processing and settlement",
                  "Coverage valid in all 50 states",
                  "No deductible on comprehensive plans",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600 mb-6">
                  Customer Satisfaction Rate
                </div>

                <div className="text-3xl font-bold text-primary mb-2">
                  &lt; 2 hours
                </div>
                <div className="text-gray-600 mb-6">
                  Average Claim Processing Time
                </div>

                <div className="text-3xl font-bold text-primary mb-2">$0</div>
                <div className="text-gray-600">Hidden Fees</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-12"
          >
            Insurance FAQs
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Have more questions about our insurance coverage?
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dull transition-colors">
              Contact Insurance Team
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;
