import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Picture
              </h2>
              <ProfileImageUpload size="lg" showUserName={false} />
              <p className="text-sm text-gray-500 mt-4 text-center">
                Click on your profile picture to upload a new image
              </p>
            </div>

            {/* User Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">{user?.name}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-800 font-medium">{user?.email}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Account Type
                  </label>
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        user?.role === "owner"
                          ? assets.carIconColored
                          : assets.user_icon
                      }
                      alt=""
                      className="w-5 h-5"
                    />
                    <span className="text-gray-800 font-medium capitalize">
                      {user?.role === "owner" ? "Car Owner" : "User"}
                    </span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Account Status
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      {user?.isVerified ? "Verified" : "Pending Verification"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
