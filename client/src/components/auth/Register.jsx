import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  setShowRegister,
  setShowLogin,
} from "../../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    await dispatch(registerUser({ name, email, password }));
  };

  const handleShowLogin = () => {
    dispatch(setShowRegister(false));
    dispatch(setShowLogin(true));
  };

  const handleClose = () => {
    dispatch(setShowRegister(false));
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> Sign Up
        </p>

        {error && (
          <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="w-full">
          <p>Full Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your full name"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password (min 6 characters)"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
            minLength={6}
          />
        </div>

        <div className="w-full">
          <p>Confirm Password</p>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        <p>
          Already have an account?{" "}
          <span
            onClick={handleShowLogin}
            className="text-primary cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy. You will receive an OTP for verification.
        </p>
      </form>
    </div>
  );
};

export default Register;
