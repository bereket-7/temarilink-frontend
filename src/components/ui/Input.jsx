import React from 'react';

const Input = ({ 
  label, 
  error, 
  helperText, 
  className = '', 
  containerClassName = '', 
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors';
  const errorClasses = 'border-red-300 focus:ring-red-500 focus:border-red-500';
  const normalClasses = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  
  const inputClasses = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
