import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

// Public Pages
import HomePage from '../pages/Home';

// Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import VerifyOtpPage from '../features/auth/pages/VerifyOtpPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';

// Bus Search & Booking Pages
import BusSearchPage from '../pages/BusSearch/BusSearchPage';
import BusBookingPage from '../pages/BusSearch/BusBookingPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import PaymentComponent from '../pages/Checkout/PaymentComponent';
import BookingSuccessPage from '../pages/Checkout/BookingSuccessPage';

// Train Booking Pages
import TrainSearchPage from '../pages/TrainSearch/TrainSearchPage';
import TrainCheckoutPage from '../pages/TrainBooking/TrainCheckoutPage';
import PnrStatusPage from '../pages/TrainBooking/PnrStatusPage';

// Flight Booking Pages
import FlightSearchPage from '../pages/FlightSearch/FlightSearchPage';
import FlightCheckoutPage from '../pages/FlightBooking/FlightCheckoutPage';

// Admin Pages
import AdminLayout from '../layouts/AdminLayout';
import AdminOverviewPage from '../pages/Admin/Dashboard/AdminOverviewPage';
import RevenuePage from '../pages/Admin/Dashboard/RevenuePage';
import RefundsPage from '../pages/Admin/Dashboard/RefundsPage';
import AdminFleetPage from '../pages/Admin/Dashboard/AdminFleetPage';
import AdminOperatorsPage from '../pages/Admin/Dashboard/AdminOperatorsPage';
import AdminUsersPage from '../pages/Admin/Dashboard/AdminUsersPage';
import AdminCouponsPage from '../pages/Admin/Dashboard/AdminCouponsPage';
import AdminNotificationsPage from '../pages/Admin/Dashboard/AdminNotificationsPage';
import AdminSupportPage from '../pages/Admin/Dashboard/AdminSupportPage';
import AdminReportsPage from '../pages/Admin/Dashboard/AdminReportsPage';
import AdminDriversPage from '../pages/Admin/Dashboard/AdminDriversPage';
import AdminSettingsPage from '../pages/Admin/Dashboard/AdminSettingsPage';
import AdminCMSPage from '../pages/Admin/Dashboard/AdminCMSPage';

// Operator Pages
import OperatorLayout from '../layouts/OperatorLayout';
import OperatorOverviewPage from '../pages/Operator/OperatorOverviewPage';
import OperatorBookingsPage from '../pages/Operator/OperatorBookingsPage';
import OperatorRevenuePage from '../pages/Operator/OperatorRevenuePage';
import OperatorBusesPage from '../pages/Operator/OperatorBusesPage';
import OperatorRoutesPage from '../pages/Operator/OperatorRoutesPage';
import OperatorTripsPage from '../pages/Operator/OperatorTripsPage';
import OperatorDriversPage from '../pages/Operator/OperatorDriversPage';
import OperatorSeatManagementPage from '../pages/Operator/OperatorSeatManagementPage';
import OperatorNotificationsPage from '../pages/Operator/OperatorNotificationsPage';
import OperatorReportsPage from '../pages/Operator/OperatorReportsPage';

// Dashboard Pages
import CustomerDashboard from '../pages/Dashboard/CustomerDashboard';
import OperatorDashboard from '../pages/Dashboard/OperatorDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

// Placeholder for pages not yet built
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with MainLayout (Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        
        {/* Bus Routes */}
        <Route path="/bus/search" element={<BusSearchPage />} />
        <Route path="/bus/select/:tripId" element={<BusBookingPage />} />
        
        {/* Train Routes */}
        <Route path="/train/search" element={<TrainSearchPage />} />
        <Route path="/pnr-status" element={<PnrStatusPage />} />

        {/* Flight Routes */}
        <Route path="/flight/search" element={<FlightSearchPage />} />
      </Route>

      {/* Auth Routes (Immersive, no navbar) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Booking Flow (Protected) */}
      <Route element={<MainLayout />}>
        <Route path="/bus/booking/:tripId" element={<ProtectedRoute />}>
          <Route index element={<CheckoutPage />} />
        </Route>
        <Route path="/train/booking/:tripId" element={<ProtectedRoute />}>
          <Route index element={<TrainCheckoutPage />} />
        </Route>
        <Route path="/flight/checkout/:tripId" element={<ProtectedRoute />}>
          <Route index element={<FlightCheckoutPage />} />
        </Route>
      </Route>
      <Route path="/payment" element={<PaymentComponent />} />
      <Route path="/booking-success" element={<BookingSuccessPage />} />

      {/* Admin Panel (Separate Layout) */}
      <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/revenue" element={<RevenuePage />} />
          <Route path="/admin/refunds" element={<RefundsPage />} />
          <Route path="/admin/buses" element={<AdminFleetPage />} />
          <Route path="/admin/flights" element={<AdminFleetPage />} />
          <Route path="/admin/trains" element={<AdminFleetPage />} />
          <Route path="/admin/drivers" element={<AdminDriversPage />} />
          <Route path="/admin/operators" element={<AdminOperatorsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/coupons" element={<AdminCouponsPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/support" element={<AdminSupportPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/cms" element={<AdminCMSPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Customer Dashboard (Protected) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<CustomerDashboard />} />
        </Route>
      </Route>



      {/* Operator Dashboard (Role: OPERATOR) */}
      <Route element={<ProtectedRoute allowedRoles={['OPERATOR']} />}>
        <Route element={<OperatorLayout />}>
          <Route path="/operator" element={<OperatorOverviewPage />} />
          <Route path="/operator/bookings" element={<OperatorBookingsPage />} />
          <Route path="/operator/revenue" element={<OperatorRevenuePage />} />
          <Route path="/operator/buses" element={<OperatorBusesPage />} />
          <Route path="/operator/routes" element={<OperatorRoutesPage />} />
          <Route path="/operator/trips" element={<OperatorTripsPage />} />
          <Route path="/operator/drivers" element={<OperatorDriversPage />} />
          <Route path="/operator/seats" element={<OperatorSeatManagementPage />} />
          <Route path="/operator/notifications" element={<OperatorNotificationsPage />} />
          <Route path="/operator/reports" element={<OperatorReportsPage />} />
        </Route>
      </Route>

      {/* Driver Dashboard (Role: DRIVER) */}
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['DRIVER']} />}>
        <Route index element={<PlaceholderPage title="Driver Dashboard" />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
