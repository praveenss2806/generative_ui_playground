'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeMap[size]} ${className}`}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#B47EFF" />
        </linearGradient>
      </defs>
      
      {/* Three stacked bars - minimal UI representation */}
      <rect x="6" y="7" width="20" height="4" rx="2" fill="url(#logoGrad)" />
      <rect x="6" y="14" width="14" height="4" rx="2" fill="#4ECDC4" />
      <rect x="6" y="21" width="17" height="4" rx="2" fill="url(#logoGrad)" opacity="0.6" />
    </svg>
  );
}

// Larger version for login page
export function LogoLarge({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 ${className}`}
    >
      <defs>
        <linearGradient id="logoGradLg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#B47EFF" />
        </linearGradient>
      </defs>
      
      {/* Three stacked bars - minimal UI representation */}
      <rect x="6" y="7" width="20" height="4" rx="2" fill="url(#logoGradLg)" />
      <rect x="6" y="14" width="14" height="4" rx="2" fill="#4ECDC4" />
      <rect x="6" y="21" width="17" height="4" rx="2" fill="url(#logoGradLg)" opacity="0.6" />
    </svg>
  );
}

