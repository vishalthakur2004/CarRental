import React, { useState } from "react";
import Title from "../components/Title";
import { motion } from "motion/react";

const CookiesPolicy = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    functional: true,
  });

  const cookieTypes = [
    {
      type: "Essential Cookies",
      required: true,
      description:
        "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.",
      examples: [
        "Authentication and security cookies",
        "Session management cookies",
        "Load balancing cookies",
        "Shopping cart cookies",
      ],
      duration: "Session or up to 1 year",
    },
    {
      type: "Analytics Cookies",
      required: false,
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website performance.",
      examples: [
        "Google Analytics cookies",
        "Page view tracking cookies",
        "User behavior analysis cookies",
        "Performance monitoring cookies",
      ],
      duration: "Up to 2 years",
    },
    {
      type: "Marketing Cookies",
      required: false,
      description:
        "These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.",
      examples: [
        "Advertising personalization cookies",
        "Retargeting cookies",
        "Social media integration cookies",
        "Third-party advertising cookies",
      ],
      duration: "Up to 13 months",
    },
    {
      type: "Functional Cookies",
      required: false,
      description:
        "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers.",
      examples: [
        "Language preference cookies",
        "Region selection cookies",
        "Accessibility preference cookies",
        "User interface customization cookies",
      ],
      duration: "Up to 1 year",
    },
  ];

  const cookieDetails = [
    {
      name: "_ga",
      purpose: "Google Analytics - Distinguishes unique users",
      type: "Analytics",
      expiry: "2 years",
      domain: ".carrental.com",
    },
    {
      name: "_gid",
      purpose: "Google Analytics - Distinguishes unique users",
      type: "Analytics",
      expiry: "24 hours",
      domain: ".carrental.com",
    },
    {
      name: "session_id",
      purpose: "Maintains user session state",
      type: "Essential",
      expiry: "Session",
      domain: "carrental.com",
    },
    {
      name: "auth_token",
      purpose: "User authentication and security",
      type: "Essential",
      expiry: "30 days",
      domain: "carrental.com",
    },
    {
      name: "lang_pref",
      purpose: "Remembers language preference",
      type: "Functional",
      expiry: "1 year",
      domain: "carrental.com",
    },
    {
      name: "marketing_consent",
      purpose: "Tracks marketing consent preferences",
      type: "Marketing",
      expiry: "1 year",
      domain: "carrental.com",
    },
  ];

  const handlePreferenceChange = (type) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage or send to server
    console.log("Saving cookie preferences:", preferences);
    alert("Cookie preferences saved successfully!");
  };

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
          title="Cookie Policy"
          subTitle="Learn about how we use cookies and manage your preferences"
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
            <h3 className="font-semibold text-lg mb-2">What are Cookies?</h3>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              experience by remembering your preferences, analyzing website
              traffic, and delivering personalized content.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-700 leading-relaxed mb-6"
          >
            This Cookie Policy explains what cookies are, how we use them, and
            how you can manage your cookie preferences. By continuing to use our
            website, you consent to our use of cookies in accordance with this
            policy.
          </motion.p>
        </motion.div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 bg-primary/5 rounded-2xl p-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Manage Your Cookie Preferences
          </motion.h2>

          <div className="space-y-6">
            {[
              { key: "essential", label: "Essential Cookies", required: true },
              {
                key: "functional",
                label: "Functional Cookies",
                required: false,
              },
              { key: "analytics", label: "Analytics Cookies", required: false },
              { key: "marketing", label: "Marketing Cookies", required: false },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-white rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-600">
                    {item.required
                      ? "Required for website functionality"
                      : "Optional - can be disabled"}
                  </p>
                </div>
                <div className="flex items-center">
                  {item.required ? (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      Always Active
                    </span>
                  ) : (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[item.key]}
                        onChange={() => handlePreferenceChange(item.key)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6 flex gap-4"
          >
            <button
              onClick={savePreferences}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dull transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={() =>
                setPreferences({
                  essential: true,
                  analytics: false,
                  marketing: false,
                  functional: false,
                })
              }
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reject All Optional
            </button>
          </motion.div>
        </motion.div>

        {/* Types of Cookies */}
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
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            Types of Cookies We Use
          </motion.h2>

          <div className="space-y-8">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cookie.type}
                  </h3>
                  {cookie.required && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Required
                    </span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {cookie.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Examples:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Duration:
                    </h4>
                    <p className="text-sm text-gray-600">{cookie.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cookie Details Table */}
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
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            Detailed Cookie Information
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cookie Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cookieDetails.map((cookie, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cookie.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {cookie.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          cookie.type === "Essential"
                            ? "bg-red-100 text-red-800"
                            : cookie.type === "Analytics"
                              ? "bg-blue-100 text-blue-800"
                              : cookie.type === "Marketing"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {cookie.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cookie.expiry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cookie.domain}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* How to Control Cookies */}
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
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            How to Control Cookies
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <h3 className="font-semibold mb-4">Browser Settings</h3>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                Most web browsers allow you to control cookies through their
                settings. You can usually find these options in the "Privacy" or
                "Security" section of your browser's settings.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>��� Chrome: Settings → Privacy and security → Cookies</li>
                <li>• Firefox: Settings → Privacy & Security → Cookies</li>
                <li>• Safari: Preferences → Privacy → Cookies</li>
                <li>• Edge: Settings → Privacy, search, and services</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <h3 className="font-semibold mb-4">Third-Party Opt-Outs</h3>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                You can also opt out of certain third-party cookies directly
                through the companies that provide them:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Google Analytics: Google Analytics Opt-out</li>
                <li>• Facebook Pixel: Facebook Ad Preferences</li>
                <li>• NAI Opt-out: Network Advertising Initiative</li>
                <li>• DAA Opt-out: Digital Advertising Alliance</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold mb-4"
          >
            Questions About Cookies?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-700 mb-4"
          >
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us:
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700"
          >
            <p>Email: carrental5862@gmail.com</p>
            <p>Phone: +91 98765 43210</p>
            <p className="mt-2 text-sm">Last updated: January 1, 2024</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
