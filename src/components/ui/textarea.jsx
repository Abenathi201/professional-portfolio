import React from 'react';

export const Textarea = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      className={`w-full px-4 py-3 bg-[#1a1814] border border-[#c4beb2]/30 text-[#f5f0e6] font-mono text-sm rounded-none focus:outline-none focus:border-[#d4622a] transition-colors resize-none ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
