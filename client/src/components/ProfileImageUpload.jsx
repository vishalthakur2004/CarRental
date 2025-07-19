import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserImage, fetchUserData } from "../store/slices/authSlice";
import { assets } from "../assets/assets";

const ProfileImageUpload = ({ showUserName = true, size = "md" }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSaveImage = async () => {
    if (selectedImage) {
      try {
        await dispatch(updateUserImage(selectedImage)).unwrap();
        await dispatch(fetchUserData());
        setSelectedImage(null);
      } catch (error) {
        console.error("Failed to update image:", error);
      }
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="group relative">
        <label htmlFor="profile-image" className="cursor-pointer">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user?.image || assets.default_avatar
            }
            alt="Profile"
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200 hover:border-primary transition-colors`}
          />
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            disabled={loading}
          />

          <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <img src={assets.edit_icon} alt="Edit" className="w-4 h-4" />
          </div>
        </label>
      </div>

      {selectedImage && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSaveImage}
            disabled={loading}
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dull transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            {loading ? "Saving..." : "Save"}
            {!loading && <img src={assets.check_icon} width={12} alt="" />}
          </button>
          <button
            onClick={handleCancelImage}
            disabled={loading}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      {showUserName && user?.name && (
        <p className="text-sm text-gray-600 mt-1">{user.name}</p>
      )}
    </div>
  );
};

export default ProfileImageUpload;
