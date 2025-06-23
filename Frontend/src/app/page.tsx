"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SignInModal from "@/components/SignInModal";
import LogInModal from "@/components/LogInModal";
import ApiService from "@/services/api";

export default function Home() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const userData = await ApiService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        // User is not logged in
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleSignupSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      setUser(null);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 w-screen flex items-center px-8 py-4 mt-7 shadow-md z-50 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Left: Logo */}
        <div className="flex-1">
          <h1
            className="font-bold"
            style={{
              color: "#111827",
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
            }}
          >
            Speak Football
          </h1>
        </div>

        {/* Center: Links */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            {/* Add your navigation links here */}
          </div>
        </div>

        {/* Right: Auth Button */}
        <div className="flex-1 flex justify-end">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-600">Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-all duration-200"
                style={{
                  backgroundColor: "#5D6C8A",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-all duration-200"
              style={{
                backgroundColor: "#5D6C8A",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
              }}
              onClick={() => setLogInOpen(true)}
            >
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modals */}
      <SignInModal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSwitchToLogIn={() => {
          setSignInOpen(false);
          setLogInOpen(true);
        }}
        onSignupSuccess={handleSignupSuccess}
      />
      <LogInModal
        open={logInOpen}
        onClose={() => setLogInOpen(false)}
        onSwitchToSignUp={() => {
          setLogInOpen(false);
          setSignInOpen(true);
        }}
        onForgotPassword={() => {
          // Handle forgot password
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Hero Section */}
      <section
        className="relative h-[100vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/art.gif')",
          filter: "saturate(0.5)",
        }}
      >
        {/* Content inside hero */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white px-6">
          <h2
            className="text-6xl font-bold mb-4 text-left"
            style={{
              color: "#000000",
              marginTop: "-200px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Find the latest football event around you
          </h2>
          <p
            className="mb-8 max-w-xl text-left"
            style={{
              color: "#000000",
              whiteSpace: "nowrap",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              marginLeft: "2.5px",
            }}
          >
            Explore football related events, screening, activities -- all in one place
          </p>
        </div>
      </section>
    </main>
  );
}