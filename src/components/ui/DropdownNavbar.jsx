import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";

export default function DropdownNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const [error, setError] = React.useState("");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  const handleLogout = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await logout();
      navigate("/pokedex-tailwind/");
    } catch (err) {
      console.log("Error during logging out from header ", err);
      setError("Error during logging out from header");
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Navbar Button */}
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        <div ref={dropdownRef} className="relative">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            {/* Navigation Links */}
            <li>
              <a
                href="/pokedex-tailwind/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </a>
            </li>
            {/* Dropdown Menu */}
            {currentUser ? (
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Dropdown{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown Items */}
                <div
                  className={`absolute left-0 z-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <a
                        href="/pokedex-tailwind/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/pokedex-tailwind/update-profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Button onClick={handleLogout}>Log out</Button>
                  </div>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
