import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTP,
  resendOTP,
  setShowOTPVerification,
  setShowRegister,
} from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, otpData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Calculate time left for OTP expiry
  useEffect(() => {
    if (otpData.expiresAt) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeRemaining = Math.max(
          0,
          Math.floor((otpData.expiresAt - now) / 1000),
        );
        setTimeLeft(timeRemaining);
        setCanResend(timeRemaining === 0);

        if (timeRemaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpData.expiresAt]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter a complete 6-digit OTP");
      return;
    }

    const result = await dispatch(
      verifyOTP({
        email: otpData.email,
        otp: otpString,
        tempToken: otpData.tempToken,
      }),
    );

    if (verifyOTP.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    await dispatch(resendOTP({ email: otpData.email }));
  };

  const handleBack = () => {
    dispatch(setShowOTPVerification(false));
    dispatch(setShowRegister(true));
  };

  const handleClose = () => {
    dispatch(setShowOTPVerification(false));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 m-auto items-center p-8 py-12 w-80 sm:w-[400px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <div className="text-center">
          <p className="text-2xl font-medium">
            <span className="text-primary">OTP</span> Verification
          </p>
          <p className="text-gray-500 mt-2">Enter the 6-digit code sent to</p>
          <p className="text-primary font-medium">{otpData.email}</p>
        </div>

        {error && (
          <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-gray-500">
              OTP expires in:{" "}
              <span className="font-medium text-primary">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p className="text-red-500 font-medium">OTP has expired</p>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            type="submit"
            disabled={loading || timeLeft === 0}
            className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend || loading}
            className="bg-gray-100 hover:bg-gray-200 transition-all text-gray-700 w-full py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <p>
          Wrong email?{" "}
          <span
            onClick={handleBack}
            className="text-primary cursor-pointer hover:underline"
          >
            Go back to registration
          </span>
        </p>

        <div className="text-xs text-gray-500 text-center">
          <p>
            Didn't receive the code? Check your spam folder or try resending.
          </p>
          <p className="mt-1">For support, contact: carrental5862@gmail.com</p>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
