"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaUserAlt,
  FaCogs,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Added icons for menu items

interface NavbarProps {
  userName: string; // Prop to pass the user's name dynamically
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Refs to detect click outside of dropdown and avatar
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // Toggle dropdown visibility on avatar click
  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown if clicked outside
  const handleClickOutside = (e: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      avatarRef.current &&
      !avatarRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Attach event listener for clicks outside when the dropdown is open
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className="w-full h-[3.5rem] mx-auto bg-white py-2">
      <div className="max-w-[90%] mx-auto h-full flex justify-between items-center">
        <div>
          <p>
            ImAg<span className="underline">inem</span>
          </p>
        </div>

        <div>
          <ul className="capitalize flex gap-7">
            <li>
              <Link href="/dashboard">Home</Link>
            </li>
            <li>
              <Link href="/image-generation">Image Generation</Link>
            </li>
            <li>
              <Link href="/image-optimizer">Image Optimizer</Link>
            </li>
            <li>
              <Link href="/socials-images">Socials Image</Link>
            </li>
            <li>
              <Link href="/guide">Guide</Link>
            </li>
          </ul>
        </div>

        {/* Avatar with Dropdown */}
        <div className="relative">
          <button
            ref={avatarRef}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white"
            onClick={toggleDropdown} // Open/close dropdown on click
          >
            <FaUserCircle size={24} />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
            >
              <div className="p-3 text-gray-700">Hi {userName}</div>
              <ul className="text-sm">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <FaUserAlt className="mr-2" />
                    Profile
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <FaCogs className="mr-2" />
                    Settings
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/manage"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <FaUserCog className="mr-2" />
                    Manage
                  </Link>
                </li>
                <li>
                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Example of passing userName dynamically to the Navbar component
const MyApp = () => {
  const userName = "John Doe"; // Replace with dynamic user data

  return <Navbar userName={userName} />;
};

export default MyApp;
