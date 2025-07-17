import React from "react";
import Title from "../components/Title";
import { motion } from "motion/react";

const PrivacyPolicy = () => {
  const privacySections = [
    {
      title: "1. Information We Collect",
      content: `We collect several types of information to provide and improve our services:
      
      Personal Information: Name, address, phone number, email address, driver's license information, and payment details.
      
      Vehicle Usage Data: GPS location, mileage, fuel consumption, and driving patterns during your rental period.
      
      Technical Information: IP address, browser type, device information, and cookies to enhance your online experience.
      
      Communication Records: Customer service interactions, feedback, and correspondence with our team.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Your information is used to:
      
      • Process rental reservations and payments
      • Verify identity and driving eligibility
      • Provide customer support and assistance
      • Improve our services and develop new features
      • Send important updates about your rental
      • Comply with legal and regulatory requirements
      • Prevent fraud and enhance security
      • Conduct market research and analytics`,
    },
    {
      title: "3. Information Sharing",
      content: `We may share your information with:
      
      Service Providers: Third-party companies that help us operate our business, such as payment processors, insurance companies, and maintenance services.
      
      Legal Authorities: When required by law, court order, or to protect our rights and safety.
      
      Business Transfers: In case of merger, acquisition, or sale of our business assets.
      
      Partners: Authorized dealers and partners who help provide our services in different locations.
      
      We do not sell your personal information to third parties for marketing purposes.`,
    },
    {
      title: "4. Data Security",
      content: `We implement robust security measures to protect your personal information:
      
      • Encryption of sensitive data during transmission and storage
      • Regular security audits and vulnerability assessments
      • Access controls limiting employee access to personal data
      • Secure data centers with physical and digital protection
      • Regular backup and disaster recovery procedures
      
      While we strive to protect your information, no system is completely secure. We encourage you to use strong passwords and keep your account information confidential.`,
    },
    {
      title: "5. Cookies and Tracking",
      content: `Our website uses cookies and similar technologies to:
      
      • Remember your preferences and settings
      • Analyze website traffic and usage patterns
      • Provide personalized content and advertisements
      • Ensure website functionality and security
      
      You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality and your user experience.`,
    },
    {
      title: "6. Your Privacy Rights",
      content: `Depending on your location, you may have the following rights:
      
      • Access: Request copies of your personal information
      • Correction: Update or correct inaccurate information
      • Deletion: Request deletion of your personal data
      • Portability: Receive your data in a portable format
      • Opt-out: Unsubscribe from marketing communications
      • Restriction: Limit how we process your information
      
      To exercise these rights, please contact our privacy team using the information provided below.`,
    },
    {
      title: "7. Data Retention",
      content: `We retain your personal information for as long as necessary to:
      
      • Provide our services and maintain your account
      • Comply with legal and regulatory requirements
      • Resolve disputes and enforce our agreements
      • Fulfill business and legal obligations
      
      Rental records are typically retained for 7 years for insurance and legal purposes. Marketing communications can be discontinued at any time upon request.`,
    },
    {
      title: "8. Children's Privacy",
      content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.`,
    },
    {
      title: "9. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers, including:
      
      • Standard contractual clauses approved by data protection authorities
      • Adequacy decisions by relevant regulatory bodies
      • Certification under appropriate privacy frameworks`,
    },
    {
      title: "10. Changes to This Policy",
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes through:
      
      • Email notifications to registered users
      �� Prominent notices on our website
      • In-app notifications for mobile users
      
      Continued use of our services after changes constitutes acceptance of the updated policy.`,
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
          title="Privacy Policy"
          subTitle="Learn how we collect, use, and protect your personal information"
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
            className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8"
          >
            <h3 className="font-semibold text-lg mb-2 text-green-800">
              Your Privacy Matters
            </h3>
            <p className="text-green-700 leading-relaxed">
              At SureRide, we are committed to protecting your privacy and
              personal information. This Privacy Policy explains how we collect,
              use, share, and safeguard your data when you use our car rental
              services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary mb-2">GDPR</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary mb-2">CCPA</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary mb-2">SOC 2</div>
              <div className="text-sm text-gray-600">Certified</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Privacy Content */}
        <div className="space-y-8">
          {privacySections.map((section, index) => (
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
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Privacy Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/5 rounded-xl p-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-4"
          >
            Contact Our Privacy Team
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-gray-700 mb-6">
              If you have questions about this Privacy Policy or want to
              exercise your privacy rights, please contact our dedicated privacy
              team:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                <p className="text-gray-700">carrental5862@gmail.com</p>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">Mailing Address</h4>
                <p className="text-gray-700">
                  SureRide Privacy Team
                  <br />
                  SureRide Car Rentals
                  <br />
                  Jalandhar, Punjab, India
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mt-4">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-gray-700">
                We typically respond to privacy inquiries within 30 days. For
                urgent matters, please call our privacy hotline for immediate
                assistance.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Effective Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>This Privacy Policy is effective as of January 1, 2024</p>
          <p className="mt-1">Last updated: January 1, 2024</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
