import React from 'react';

export const RockytLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`relative ${className} text-[#FFFFFF] hover:text-[#C7F6E4] transition-colors duration-300`}>
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
      {/* Rocket Fuselage */}
      <path d="M50 10 C 50 10, 25 40, 25 70 C 25 85, 35 90, 50 90 C 65 90, 75 85, 75 70 C 75 40, 50 10, 50 10 Z" />
      {/* Window */}
      <circle cx="50" cy="55" r="8" fill="currentColor" stroke="none" />
      {/* Fins */}
      <path d="M25 70 L 10 90" />
      <path d="M75 70 L 90 90" />
    </svg>
  </div>
);
