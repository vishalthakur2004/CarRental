import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: assets.testimonial_image_1,
      description:
        "Leading SureRide with a vision to revolutionize the car rental industry.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: assets.testimonial_image_2,
      description:
        "Ensuring smooth operations and exceptional customer service across all locations.",
    },
    {
      name: "Emily Rodriguez",
      role: "Technology Director",
      image: assets.testimonial_image_1,
      description:
        "Driving innovation through cutting-edge technology and user experience.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "1,000+", label: "Premium Vehicles" },
    { number: "100+", label: "Cities Served" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About SureRide
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're redefining car rental with premium vehicles, exceptional
            service, and innovative technology to make your journey
            extraordinary.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
          >
            Our Story
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-gray-600 leading-relaxed"
          >
            <p>
              Founded in 2020, SureRide was born from a simple vision: to make
              premium vehicle rental accessible, convenient, and enjoyable for
              everyone. What started as a small startup with a handful of
              vehicles has grown into a leading car rental platform serving
              thousands of customers across the globe.
            </p>
            <p>
              Our journey began when our founders experienced the frustrations
              of traditional car rental services - long wait times, limited
              vehicle options, and complicated booking processes. They knew
              there had to be a better way. That's when SureRide was conceived -
              a platform that puts customer experience first.
            </p>
            <p>
              Today, we're proud to offer a diverse fleet of premium vehicles,
              from luxury sedans to rugged SUVs, all maintained to the highest
              standards. Our innovative technology platform makes booking
              seamless, while our dedicated team ensures every customer receives
              personalized service that exceeds expectations.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide exceptional car rental experiences through premium
                vehicles, innovative technology, and unparalleled customer
                service. We believe transportation should be stress-free,
                convenient, and tailored to your unique needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the world's most trusted and innovative car rental
                platform, setting new standards for convenience, quality, and
                customer satisfaction. We envision a future where accessing the
                perfect vehicle is just a tap away.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 md:px-16 lg:px-24 xl:px-32"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-16 text-center"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Excellence",
                description:
                  "We maintain the highest standards in vehicle quality, service delivery, and customer satisfaction.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously evolve our technology and services to meet changing customer needs and expectations.",
              },
              {
                title: "Trust",
                description:
                  "We build lasting relationships through transparency, reliability, and consistent delivery of our promises.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
