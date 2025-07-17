import React from "react";
import { motion } from "motion/react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when creating an account, making reservations, or contacting us. This includes your name, email address, phone number, driver's license information, payment details, and profile preferences. We also automatically collect certain information when you use our services, such as IP address, device information, browser type, and usage patterns through cookies and similar technologies.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your personal information to provide and improve our services, process bookings and payments, communicate with you about your reservations, provide customer support, send important account and service updates, personalize your experience, ensure platform security, and comply with legal obligations. We may also use aggregated, non-personally identifiable information for analytics and business insights.`,
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, payment processors for transaction processing, insurance providers when required for coverage, law enforcement when legally required, and business partners for legitimate business purposes. All third parties are bound by confidentiality agreements and data protection standards.`,
    },
    {
      title: "4. Data Security",
      content: `We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, secure data centers, regular security audits, and restricted access controls. While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and protect your account credentials.`,
    },
    {
      title: "5. Location Information",
      content: `With your consent, we may collect location information from your device during rentals for safety, navigation, and operational purposes. This includes GPS data for vehicle tracking, pickup and drop-off coordination, and emergency assistance. You can disable location services through your device settings, though this may limit certain features of our service.`,
    },
    {
      title: "6. Cookies and Tracking Technologies",
      content: `We use cookies, web beacons, and similar technologies to enhance your browsing experience, remember your preferences, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings, though disabling certain cookies may affect site functionality. We also use analytics tools to understand user behavior and improve our services.`,
    },
    {
      title: "7. Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Account information is typically retained for the duration of your account plus a reasonable period thereafter. Transaction records may be kept longer for legal and regulatory compliance. You can request deletion of your data subject to legal requirements.`,
    },
    {
      title: "8. Your Privacy Rights",
      content: `You have the right to access, update, or delete your personal information, opt-out of marketing communications, request data portability, object to certain processing activities, and withdraw consent where applicable. To exercise these rights, contact us through the methods provided below. We will respond to your request within a reasonable timeframe as required by applicable law.`,
    },
    {
      title: "9. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer information internationally, we implement appropriate safeguards such as standard contractual clauses or adequacy decisions to ensure your information remains protected according to applicable privacy standards.`,
    },
    {
      title: "10. Children's Privacy",
      content: `Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to remove such information. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      title: "11. Third-Party Links and Services",
      content: `Our platform may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to these external sites or services. We encourage you to review the privacy policies of any third-party sites you visit. We are not responsible for the privacy practices or content of third-party websites or services.`,
    },
    {
      title: "12. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. We will notify you of significant changes via email or through prominent notices on our platform. The updated policy will be effective upon posting unless otherwise specified. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
    },
  ];

  const dataTypes = [
    {
      category: "Personal Information",
      items: [
        "Name, email, phone number",
        "Date of birth",
        "Driver's license details",
        "Government-issued ID",
      ],
      icon: "👤",
    },
    {
      category: "Financial Information",
      items: [
        "Credit/debit card details",
        "Billing address",
        "Payment history",
        "Transaction records",
      ],
      icon: "💳",
    },
    {
      category: "Usage Information",
      items: [
        "Booking history",
        "Vehicle preferences",
        "App usage patterns",
        "Customer service interactions",
      ],
      icon: "📱",
    },
    {
      category: "Device Information",
      items: ["IP address", "Browser type", "Device model", "Operating system"],
      icon: "💻",
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
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
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
            Our Commitment to Your Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At SureRide, we respect your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, share, and safeguard your information when you use our
            car rental platform and services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This policy applies to all information collected through our
            website, mobile application, and any related services, sales,
            marketing, or events. By using SureRide, you consent to the data
            practices described in this policy.
          </p>
        </div>

        {/* Data Collection Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Types of Information We Collect
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{type.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {type.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 flex items-start"
                    >
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policy Sections */}
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

        {/* Your Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Exercise Your Privacy Rights
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Access Your Data
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Request a copy of the personal information we have about you
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Update Information
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Correct or update your personal information at any time
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Delete Your Data
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Request deletion of your personal information (subject to
                    legal requirements)
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Opt-Out</h4>
                  <p className="text-gray-600 text-sm">
                    Unsubscribe from marketing communications and promotional
                    emails
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Data Portability
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Receive your data in a structured, machine-readable format
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary text-xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Object to Processing
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Object to certain types of data processing activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Contact Our Privacy Team</h3>
          <p className="text-lg leading-relaxed mb-6">
            Have questions about this Privacy Policy or want to exercise your
            privacy rights? Our dedicated privacy team is here to help.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Privacy Officer</h4>
              <p>privacy@sureride.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Protection Office</h4>
              <p>+1 234 567890</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-2">Mailing Address</h4>
              <p>
                SureRide Privacy Team
                <br />
                1234 Luxury Drive
                <br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </motion.div>

        {/* GDPR Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-xl"
        >
          <div className="flex">
            <div className="text-green-400 text-2xl mr-4">🛡️</div>
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                GDPR Compliance
              </h4>
              <p className="text-green-700 leading-relaxed">
                SureRide complies with the General Data Protection Regulation
                (GDPR) and other applicable privacy laws. EU residents have
                additional rights under GDPR, including the right to data
                portability and the right to be forgotten. Contact our privacy
                team for more information about exercising these rights.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
