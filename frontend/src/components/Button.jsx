// src/components/Button.jsx
import React from 'react';

const Button = ({ onClick, children, type = 'button', className = '' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
