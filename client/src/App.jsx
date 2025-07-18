import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import AboutUs from "./pages/AboutUs";
import HelpCenter from "./pages/HelpCenter";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Insurance from "./pages/Insurance";
import CookiesPolicy from "./pages/CookiesPolicy";
import AuthModal from "./components/auth/AuthModal";
import { Toaster } from "react-hot-toast";
import { initializeAuth, fetchUserData } from "./store/slices/authSlice";
import { fetchCars } from "./store/slices/carsSlice";
import {
  ProtectedRoute,
  OwnerRoute,
  PublicLayout,
} from "./components/auth/AuthLayout";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token, showLogin, showRegister, showOTPVerification } = useSelector(
    (state) => state.auth,
  );

  const isOwnerPath = location.pathname.startsWith("/owner");
  const showAuthModal = showLogin || showRegister || showOTPVerification;

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());

    // Fetch cars data on app load
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    // If we have a token, fetch user data
    if (token) {
      dispatch(fetchUserData());
    }
  }, [token, dispatch]);

  return (
    <>
      <Toaster />
      {showAuthModal && <AuthModal />}

      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
