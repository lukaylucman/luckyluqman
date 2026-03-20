/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from "./components/Background";
import WelcomeScreen from "./Pages/WelcomeScreen";
import AdminLogin from "./components/AdminLogin";
import { AdminProvider } from "./context/AdminContext";

const LandingPage = ({ showWelcome, setShowWelcome }: { showWelcome: boolean, setShowWelcome: (val: boolean) => void }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {!showWelcome && (
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col gap-12 sm:gap-16 pb-16">
            <Hero />
            <About />
            <Portfolio />
            <Contact />
          </main>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex justify-end pb-10">
            <AdminLogin />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HelmetProvider>
      <AdminProvider>
        <div className="min-h-screen relative bg-[#030014] selection:bg-purple-500/30 text-white">
          <div className="pointer-events-none">
            <AnimatedBackground />
          </div>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    showWelcome={showWelcome}
                    setShowWelcome={setShowWelcome}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </AdminProvider>
    </HelmetProvider>
  );
}
