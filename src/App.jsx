import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/other/ProtectedRoute";
import Header from "./components/other/Header";
import Footer from "./components/other/Footer";
import HomePage from "./components/pages/HomePage";
import ListingPage from "./components/pages/ListingPage";
import CreateBookingPage from "./components/pages/CreateBookingPage";
import CreateListingPage from "./components/pages/CreateListingPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import LoginPage from "./components/pages/LoginPage";
import UserRegistrationPage from "./components/pages/UserRegistrationPage";

function AppLayout() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideHeader && <Header />}
      <main className="w-full min-h-[calc(100vh-7.5rem)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/booking/:listingId" element={<CreateBookingPage />} />
          </Route>

          <Route element={<ProtectedRoute equiredRoles={["HOST"]} />}>
            <Route path="/listing/create" element={<CreateListingPage />} />
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
