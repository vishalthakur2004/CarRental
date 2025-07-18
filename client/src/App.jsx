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
import UserAgreement from "./pages/UserAgreement";
import LegalInfo from "./pages/LegalInfo";
import Insurance from "./pages/Insurance";
import DataUsage from "./pages/DataUsage";
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
        {/* Public Routes - accessible to all */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/car-details/:id"
          element={
            <PublicLayout>
              <CarDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/cars"
          element={
            <PublicLayout>
              <Cars />
            </PublicLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <PublicLayout>
              <AboutUs />
            </PublicLayout>
          }
        />
        <Route
          path="/help-center"
          element={
            <PublicLayout>
              <HelpCenter />
            </PublicLayout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <PublicLayout>
              <UserAgreement />
            </PublicLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PublicLayout>
              <LegalInfo />
            </PublicLayout>
          }
        />
        <Route
          path="/insurance"
          element={
            <PublicLayout>
              <Insurance />
            </PublicLayout>
          }
        />
        <Route
          path="/cookies-policy"
          element={
            <PublicLayout>
              <DataUsage />
            </PublicLayout>
          }
        />

        {/* Protected Routes - require authentication */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Owner Routes - require owner role */}
        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <Layout />
            </OwnerRoute>
          }
        >
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
