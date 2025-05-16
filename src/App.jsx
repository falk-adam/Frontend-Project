import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/other/ProtectedRoute";
import Header from "./components/header/Header";
import Footer from "./components/other/Footer";
import HomePage from "./components/pages/HomePage";
import ListingPage from "./components/pages/ListingPage";
import CreateBookingPage from "./components/pages/CreateBookingPage";
import CreateListingPage from "./components/pages/CreateListingPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import MyBookingsPage from "./components/pages/MyBookingsPage";
import MyListingsPage from "./components/pages/MyListingsPage";
import LoginPage from "./components/pages/LoginPage";
import UserRegistrationPage from "./components/pages/UserRegistrationPage";
import AdminPage from "./components/pages/AdminPage";
import BookingConfirmationPage from "./components/pages/BookingConfirmationPage";

function AppLayout() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <main className="w-full min-h-[calc(100vh-7.5rem)] max-mobile:min-h-[calc(100vh-6.3rem)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:listingId" element={<ListingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/bookings" element={<MyBookingsPage />} />
            {/*Create Booking is accessed via ListingPage*/}
            <Route path="/:listingId/booking" element={<CreateBookingPage />} />
            <Route
              path="/booking_confirmation/:bookingId"
              element={<BookingConfirmationPage />}
            />
          </Route>

          <Route element={<ProtectedRoute equiredRoles={["HOST"]} />}>
            <Route path="/user/listings" element={<MyListingsPage />} />
            {/*Create Listings is accessed via MyListingsPage*/}
            <Route
              path="/user/listings/create"
              element={<CreateListingPage />}
            />
          </Route>
          {/*Probably will not be implemented, but added it here as a placeholder*/}
          <Route element={<ProtectedRoute equiredRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
