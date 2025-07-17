import React, { useState } from "react";
import { motion } from "motion/react";

const CookiesPolicy = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: true,
  });

  const cookieTypes = [
    {
      category: "Essential Cookies",
      required: true,
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: [
        "Authentication cookies to keep you logged in",
        "Security cookies to protect against fraud",
        "Session cookies for site functionality",
        "Load balancing cookies for performance",
      ],
      duration: "Session or up to 1 year",
      icon: "🔧",
    },
    {
      category: "Analytics Cookies",
      required: false,
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information.",
      examples: [
        "Google Analytics for site usage statistics",
        "Heat mapping tools for user behavior",
        "A/B testing for site optimization",
        "Performance monitoring cookies",
      ],
      duration: "Up to 2 years",
      icon: "📊",
    },
    {
      category: "Marketing Cookies",
      required: false,
      description:
        "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      examples: [
        "Facebook Pixel for ad targeting",
        "Google Ads for remarketing",
        "Social media sharing cookies",
        "Email marketing integration cookies",
      ],
      duration: "Up to 2 years",
      icon: "📢",
    },
    {
      category: "Personalization Cookies",
      required: false,
      description:
        "These cookies remember your preferences and settings to provide a more personalized experience.",
      examples: [
        "Language preference cookies",
        "Theme and display preference cookies",
        "Location-based service cookies",
        "Customized content cookies",
      ],
      duration: "Up to 1 year",
      icon: "🎨",
    },
  ];

  const handlePreferenceChange = (category) => {
    if (category === "essential") return; // Essential cookies cannot be disabled

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const savePreferences = () => {
    // In a real application, this would save the preferences to localStorage and update cookie consent
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    alert("Cookie preferences saved successfully!");
  };

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Learn about how we use cookies to improve your experience on
            SureRide
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
            What Are Cookies?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Cookies are small text files that are stored on your device when you
            visit a website. They help websites remember information about your
            visit, such as your preferred language and other settings. This can
            make your next visit easier and the site more useful to you.
          </p>
          <p className="text-gray-600 leading-relaxed">
            SureRide uses cookies to provide you with a better experience, to
            understand how our site is used, and to personalize content and
            advertisements. This policy explains what cookies we use, why we use
            them, and how you can manage your cookie preferences.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{type.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {type.category}
                    </h3>
                    {type.required && (
                      <span className="ml-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        Required
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {type.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Examples:
                    </h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li
                          key={exampleIndex}
                          className="text-gray-600 flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Duration:
                    </h4>
                    <p className="text-gray-600">{type.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Manage Your Cookie Preferences
          </h2>
          <p className="text-gray-600 mb-6">
            You can control which cookies we use on your device. Essential
            cookies cannot be disabled as they are necessary for the site to
            function properly.
          </p>

          <div className="space-y-4">
            {[
              { key: "essential", label: "Essential Cookies", required: true },
              { key: "analytics", label: "Analytics Cookies", required: false },
              { key: "marketing", label: "Marketing Cookies", required: false },
              {
                key: "personalization",
                label: "Personalization Cookies",
                required: false,
              },
            ].map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {option.label}
                  </h4>
                  {option.required && (
                    <p className="text-sm text-gray-500">
                      Required for site functionality
                    </p>
                  )}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences[option.key]}
                    onChange={() => handlePreferenceChange(option.key)}
                    disabled={option.required}
                    className="sr-only peer"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer transition-colors ${
                      preferences[option.key] ? "bg-primary" : "bg-gray-300"
                    } ${option.required ? "opacity-50" : ""}`}
                  >
                    <div
                      className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                        preferences[option.key]
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={savePreferences}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Third-Party Cookies
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Some cookies on our site are set by third-party services. These help
            us provide enhanced functionality and analyze site usage. Here are
            the main third-party services we use:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                service: "Google Analytics",
                purpose: "Website analytics and performance monitoring",
                cookies: "_ga, _ga_*, _gid",
                link: "https://policies.google.com/privacy",
              },
              {
                service: "Google Ads",
                purpose: "Advertising and remarketing campaigns",
                cookies: "_gcl_au, _gcl_dc",
                link: "https://policies.google.com/technologies/ads",
              },
              {
                service: "Facebook Pixel",
                purpose: "Social media advertising and analytics",
                cookies: "_fbp, _fbc",
                link: "https://www.facebook.com/privacy/explanation",
              },
              {
                service: "Hotjar",
                purpose: "User behavior analytics and feedback",
                cookies: "_hjid, _hjSession*",
                link: "https://www.hotjar.com/legal/policies/privacy",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {item.service}
                </h4>
                <p className="text-gray-600 text-sm mb-2">{item.purpose}</p>
                <p className="text-gray-500 text-xs mb-2">
                  Cookies: {item.cookies}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  Privacy Policy →
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to Control Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            How to Control Cookies in Your Browser
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Most web browsers allow you to control cookies through their
            settings preferences. However, limiting cookies may impact your
            experience of our website.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                browser: "Google Chrome",
                instructions:
                  "Settings → Privacy and security → Cookies and other site data",
              },
              {
                browser: "Mozilla Firefox",
                instructions:
                  "Settings → Privacy & Security → Cookies and Site Data",
              },
              {
                browser: "Safari",
                instructions: "Preferences → Privacy → Manage Website Data",
              },
              {
                browser: "Microsoft Edge",
                instructions:
                  "Settings → Site permissions → Cookies and site data",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {item.browser}
                </h4>
                <p className="text-gray-600 text-sm">{item.instructions}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Questions About Our Cookie Policy?
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            If you have any questions about our use of cookies or this policy,
            please don't hesitate to contact us.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p>privacy@sureride.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Phone</h4>
              <p>+1 234 567890</p>
            </div>
          </div>
        </motion.div>

        {/* Cookie Banner Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl"
        >
          <div className="flex">
            <div className="text-blue-400 text-2xl mr-4">🍪</div>
            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                Cookie Consent Banner
              </h4>
              <p className="text-blue-700 leading-relaxed">
                When you first visit our website, you'll see a cookie consent
                banner that allows you to accept or customize your cookie
                preferences. You can change these preferences at any time by
                clicking the "Cookie Settings" link in our footer or returning
                to this page.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiesPolicy;
