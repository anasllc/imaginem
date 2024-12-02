"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UnsplashImage {
  url: string;
  photographer: string;
  photographerLink: string;
}

// Modal Component
const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
        <p className="text-gray-700 mb-4">
          Forgot your password? No worries! Please reach out to us at{" "}
          <strong>anas@coinwaft.com</strong>. The support team will assist you
          in resetting your password promptly.
        </p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [bgImage, setBgImage] = useState<UnsplashImage | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from reloading the page

    // Perform login logic here
    router.replace("/dashboard");
  };

  const openForgotPasswordModal = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevents the form from submitting when the "Forgot password?" button is clicked
    setIsModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      const UNSPLASH_URL = `https://api.unsplash.com/photos/random?query=technology&orientation=portrait&client_id=${UNSPLASH_ACCESS_KEY}`;

      try {
        const response = await fetch(UNSPLASH_URL);
        if (response.ok) {
          const data = await response.json();
          setBgImage({
            url: data.urls.full,
            photographer: data.user.name,
            photographerLink: data.user.links.html,
          });
        } else {
          console.error(
            "Failed to fetch image from Unsplash:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Background Image Section */}
      <div
        className={`hidden md:flex w-2/3 h-full bg-cover bg-center relative`}
        style={{
          backgroundImage: bgImage ? `url(${bgImage.url})` : "none",
        }}
      >
        {bgImage && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-60 text-xs text-gray-800 px-2 py-1 rounded-md">
            Photo by{" "}
            <a
              href={bgImage.photographerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {bgImage.photographer}
            </a>{" "}
            on Unsplash
          </div>
        )}
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-4xl font-bold mb-6">ImÄginem</h1>
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 focus:ring-orange-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember me
              </label>
            </div>
            <button
              className="text-orange-500 hover:text-orange-600 focus:outline-none"
              onClick={openForgotPasswordModal}
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            LOGIN
          </button>
        </form>
        <footer className="mt-6 text-sm text-gray-400">© Coinwaft 2024</footer>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={closeForgotPasswordModal}
      />
    </div>
  );
};

export default Login;
