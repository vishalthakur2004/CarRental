import React from "react";
import { motion } from "motion/react";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using SureRide's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services. These terms apply to all users of SureRide, including browsers, customers, and car owners who list their vehicles on our platform.`,
    },
    {
      title: "2. Eligibility Requirements",
      content: `To use SureRide services, you must be at least 21 years old and possess a valid driver's license that has been held for a minimum of one year. You must provide accurate and complete information during registration and maintain the accuracy of your account information. International users may be required to provide additional documentation as specified by local regulations.`,
    },
    {
      title: "3. Vehicle Rental Terms",
      content: `All vehicle rentals are subject to availability and confirmation. Rental rates include unlimited mileage within the specified geographic area, basic insurance coverage, and 24/7 roadside assistance. Additional services such as GPS navigation, child safety seats, and additional driver coverage are available for extra fees. Fuel must be returned at the same level as provided or refueling charges will apply.`,
    },
    {
      title: "4. Booking and Payment",
      content: `Reservations require a valid credit card and may be subject to pre-authorization holds. Full payment is due at the time of booking unless otherwise specified. Cancellations made more than 24 hours before the rental start time are free of charge. Late cancellations or no-shows may result in fees. We accept all major credit cards and selected digital payment methods.`,
    },
    {
      title: "5. Vehicle Use and Restrictions",
      content: `Vehicles must be operated in accordance with all applicable laws and regulations. Smoking, vaping, and transportation of illegal substances are strictly prohibited. Vehicles may not be used for racing, off-road driving, or any commercial purposes unless specifically authorized. Pets are allowed in designated pet-friendly vehicles only, subject to additional cleaning fees.`,
    },
    {
      title: "6. Insurance and Liability",
      content: `Basic insurance coverage is included with all rentals, covering third-party liability and collision damage with applicable deductibles. Renters are responsible for any damage that exceeds insurance coverage. Optional additional insurance packages are available for enhanced protection. Renters must report any accidents or incidents immediately to SureRide and local authorities as required.`,
    },
    {
      title: "7. Privacy and Data Protection",
      content: `SureRide collects and processes personal information in accordance with our Privacy Policy. We implement appropriate security measures to protect your data and do not sell personal information to third parties. Location data may be collected during rentals for safety and operational purposes. Users have rights regarding their personal data as outlined in our Privacy Policy.`,
    },
    {
      title: "8. Prohibited Activities",
      content: `Users are prohibited from: providing false information, using vehicles for illegal activities, subletting or transferring rental agreements, tampering with vehicle tracking systems, operating vehicles under the influence of alcohol or drugs, and using the platform for any fraudulent purposes. Violation of these terms may result in immediate termination of services and legal action.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `SureRide's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, special, or consequential damages. Our total liability for any claim shall not exceed the amount paid for the specific rental period in question. This limitation applies to all claims, regardless of the legal theory on which they are based.`,
    },
    {
      title: "10. Dispute Resolution",
      content: `Any disputes arising from these terms or your use of SureRide services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in English in San Francisco, California. You waive any right to participate in class-action lawsuits or class-wide arbitration against SureRide.`,
    },
    {
      title: "11. Modifications to Terms",
      content: `SureRide reserves the right to modify these Terms of Service at any time. We will notify users of significant changes via email or through our platform. Continued use of our services after modifications constitutes acceptance of the updated terms. We recommend reviewing these terms periodically to stay informed of any changes.`,
    },
    {
      title: "12. Termination",
      content: `Either party may terminate this agreement at any time. SureRide may suspend or terminate your account immediately for violations of these terms, fraudulent activity, or other harmful conduct. Upon termination, all outstanding obligations remain in effect, and you must immediately return any rented vehicles and settle all outstanding payments.`,
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
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using SureRide services
          </p>
          <p className="text-lg mt-4 opacity-90">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-6 py-12"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to SureRide
          </h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms of Service ("Terms") govern your use of SureRide's car
            rental platform and services. SureRide connects vehicle owners with
            renters through our digital platform, providing a seamless and
            secure car rental experience. By creating an account or using our
            services, you agree to comply with these terms and our Privacy
            Policy.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Questions About These Terms?
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            If you have any questions about these Terms of Service, please don't
            hesitate to contact us. Our legal team is available to provide
            clarification and assistance.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p>legal@sureride.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Phone</h4>
              <p>+1 234 567890</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Address</h4>
              <p>
                1234 Luxury Drive
                <br />
                San Francisco, CA 94107
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM PST
                <br />
                Saturday - Sunday: 10:00 AM - 4:00 PM PST
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl"
        >
          <div className="flex">
            <div className="text-yellow-400 text-2xl mr-4">⚠️</div>
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                Important Notice
              </h4>
              <p className="text-yellow-700 leading-relaxed">
                These terms constitute a legally binding agreement. Please
                ensure you read and understand all provisions before using
                SureRide services. If you disagree with any part of these terms,
                you should not use our platform or services.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
