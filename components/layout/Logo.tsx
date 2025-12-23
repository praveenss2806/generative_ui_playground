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
          <stop offset="50%" stopColor="#B47EFF" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
      </defs>
      
      {/* Layered UI cards representing generative interface */}
      {/* Back card */}
      <rect x="8" y="6" width="16" height="12" rx="2" fill="#4ECDC4" opacity="0.5" transform="rotate(-8 16 12)" />
      
      {/* Middle card */}
      <rect x="7" y="10" width="16" height="12" rx="2" fill="#B47EFF" opacity="0.7" transform="rotate(4 15 16)" />
      
      {/* Front card with gradient */}
      <rect x="6" y="13" width="18" height="13" rx="3" fill="url(#logoGrad)" />
      
      {/* Sparkle accent */}
      <path d="M24 6 L25 8 L27 9 L25 10 L24 12 L23 10 L21 9 L23 8 Z" fill="#FFE66D" />
      <circle cx="20" cy="5" r="1" fill="#FFE66D" opacity="0.6" />
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
          <stop offset="50%" stopColor="#B47EFF" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
      </defs>
      
      {/* Layered UI cards representing generative interface */}
      {/* Back card */}
      <rect x="8" y="6" width="16" height="12" rx="2" fill="#4ECDC4" opacity="0.5" transform="rotate(-8 16 12)" />
      
      {/* Middle card */}
      <rect x="7" y="10" width="16" height="12" rx="2" fill="#B47EFF" opacity="0.7" transform="rotate(4 15 16)" />
      
      {/* Front card with gradient */}
      <rect x="6" y="13" width="18" height="13" rx="3" fill="url(#logoGradLg)" />
      
      {/* Sparkle accent */}
      <path d="M24 6 L25 8 L27 9 L25 10 L24 12 L23 10 L21 9 L23 8 Z" fill="#FFE66D" />
      <circle cx="20" cy="5" r="1" fill="#FFE66D" opacity="0.6" />
    </svg>
  );
}

