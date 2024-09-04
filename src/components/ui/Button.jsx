import React from "react";

const Button = ({ onClick, children, custom }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${custom}`}
    >
      {children}
    </button>
  );
};

export default Button;
