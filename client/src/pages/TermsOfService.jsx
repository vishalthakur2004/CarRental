import React from "react";
import Title from "../components/Title";
import { motion } from "motion/react";

const TermsOfService = () => {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Car Rental's services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website, mobile application, and rental services.`,
    },
    {
      title: "2. Rental Requirements",
      content: `To rent a vehicle from Car Rental, you must be at least 21 years old and possess a valid driver's license. You must provide a valid credit card for payment and security deposit purposes. International visitors may be required to provide an International Driving Permit along with their home country license.`,
    },
    {
      title: "3. Vehicle Use and Restrictions",
      content: `The rented vehicle may only be driven by authorized drivers listed in the rental agreement. The vehicle must not be used for commercial purposes, racing, or any illegal activities. Smoking is prohibited in all vehicles. You are responsible for all traffic violations, parking tickets, and toll charges incurred during the rental period.`,
    },
    {
      title: "4. Booking and Payment",
      content: `Reservations are confirmed upon receipt of payment and completion of required documentation. Payment is due at the time of vehicle pickup unless otherwise arranged. We accept major credit cards and debit cards. A security deposit may be required and will be refunded upon satisfactory return of the vehicle.`,
    },
    {
      title: "5. Cancellation and Modification",
      content: `Reservations may be cancelled or modified up to 24 hours before the scheduled pickup time without penalty. Cancellations or modifications made within 24 hours of pickup may be subject to fees. No-shows will be charged the full rental amount plus applicable fees.`,
    },
    {
      title: "6. Insurance and Liability",
      content: `You are responsible for any damage to the vehicle during the rental period. Car Rental offers various insurance options to limit your liability. If you decline our insurance coverage, you must provide proof of personal auto insurance that covers rental vehicles. You remain liable for any damages not covered by insurance.`,
    },
    {
      title: "7. Vehicle Return",
      content: `Vehicles must be returned to the designated location at the agreed-upon time with the same fuel level as provided. Late returns may incur additional charges. The vehicle will be inspected upon return, and any damage will be assessed and charged accordingly.`,
    },
    {
      title: "8. Prohibited Uses",
      content: `The following uses are strictly prohibited: driving under the influence of alcohol or drugs, using the vehicle for ride-sharing services without authorization, transporting hazardous materials, exceeding vehicle capacity limits, or using the vehicle outside of permitted geographic areas.`,
    },
    {
      title: "9. Data Privacy",
      content: `Car Rental collects and processes personal data in accordance with our Privacy Policy. By using our services, you consent to the collection and use of your personal information as described in our Privacy Policy. We implement appropriate security measures to protect your data.`,
    },
    {
      title: "10. Limitation of Liability",
      content: `Car Rental's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages. Our maximum liability shall not exceed the total amount paid for the rental services.`,
    },
    {
      title: "11. Dispute Resolution",
      content: `Any disputes arising from these terms or the rental services shall be resolved through binding arbitration in accordance with the rules of the Indian Arbitration and Conciliation Act. The arbitration shall take place in Jalandhar, Punjab, India.`,
    },
    {
      title: "12. Changes to Terms",
      content: `Car Rental reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after such changes constitutes acceptance of the new terms.`,
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
          title="Terms of Service"
          subTitle="Please read these terms carefully before using our car rental services"
        />
      </motion.div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-5xl mx-auto">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8"
          >
            <h3 className="font-semibold text-lg mb-2">
              Effective Date: January 1, 2024
            </h3>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding
              agreement between you and Car Rental regarding your use of our car
              rental services. By using our services, you acknowledge that you
              have read, understood, and agree to be bound by these Terms.
            </p>
          </motion.div>
        </motion.div>

        {/* Terms Content */}
        <div className="space-y-8">
          {termsData.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-50 rounded-xl p-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-4"
          >
            Questions About These Terms?
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-2 text-gray-700"
          >
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-primary">carrental5862@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-primary">+91 98765 43210</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p>
                  Car Rental
                  <br />
                  Jalandhar, Punjab, India
                </p>
              </div>
              <div>
                <p className="font-medium">Business Hours:</p>
                <p>
                  Monday - Friday: 8:00 AM - 6:00 PM PST
                  <br />
                  24/7 Emergency Support Available
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>Last updated: January 1, 2024</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
