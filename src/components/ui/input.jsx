import React from 'react';

export const Input = React.forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-3 bg-[#1a1814] border border-[#c4beb2]/30 text-[#f5f0e6] font-mono text-sm rounded-none focus:outline-none focus:border-[#d4622a] transition-colors ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
