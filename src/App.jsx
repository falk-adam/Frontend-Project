import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/other/Header";
import Footer from "./components/other/Footer";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex w-full min-h-[calc(100vh-8.5rem)] p-10 bg-gray-300 my-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
