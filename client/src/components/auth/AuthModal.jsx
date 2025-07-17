import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import OTPVerification from "./OTPVerification";

const AuthModal = () => {
  const { showLogin, showRegister, showOTPVerification } = useSelector(
    (state) => state.auth,
  );

  if (showLogin) {
    return <Login />;
  }

  if (showRegister) {
    return <Register />;
  }

  if (showOTPVerification) {
    return <OTPVerification />;
  }

  return null;
};

export default AuthModal;
