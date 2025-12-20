'use client';

import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-10 h-10 rounded-xl flex items-center justify-center',
        'bg-secondary/50 hover:bg-secondary border border-border',
        'transition-all duration-300 ease-out',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon */}
      <svg
        className={cn(
          'absolute w-5 h-5 transition-all duration-300',
          theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100 text-amber-500' 
            : 'opacity-0 rotate-90 scale-0 text-amber-500'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* Moon Icon */}
      <svg
        className={cn(
          'absolute w-5 h-5 transition-all duration-300',
          theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100 text-indigo-300' 
            : 'opacity-0 -rotate-90 scale-0 text-indigo-300'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

