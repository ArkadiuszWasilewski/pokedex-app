import React from "react";

export default function ButtonNavigation({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
