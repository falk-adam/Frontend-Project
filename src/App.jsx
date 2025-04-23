import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/other/Header";
import Footer from "./components/other/Footer";
import HomePage from "./components/pages/HomePage";
import ListingPage from "./components/pages/ListingPage";
import CreateBookingPage from "./components/pages/CreateBookingPage";
import CreateListingPage from "./components/pages/CreateListingPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import LoginPage from "./components/pages/LoginPage";
import UserRegistrationPage from "./components/pages/UserRegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex w-full min-h-[calc(100vh-8.5rem)] p-10 bg-gray-300 my-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
          <Route path="/booking/:listingId" element={<CreateBookingPage />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />
          <Route path="/listing/create" element={<CreateListingPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
