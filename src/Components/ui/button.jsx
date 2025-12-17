import React from 'react';

export const Button = React.forwardRef(({ className = '', children, variant = 'default', ...props }, ref) => {
  const baseStyles = 'px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    default: 'bg-[#d4622a] text-[#1a1814] hover:bg-[#f5f0e6] hover:text-[#1a1814] font-bold',
    outline: 'border border-[#c4beb2] text-[#f5f0e6] hover:bg-[#c4beb2] hover:text-[#1a1814]',
    ghost: 'text-[#f5f0e6] hover:bg-[#c4beb2]/20',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
