'use client';

import { ReactNode } from 'react';
import { UserMenu } from '@/components/auth/UserMenu';
import { Logo } from '@/components/layout/Logo';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-dvh flex flex-col bg-background text-foreground overflow-hidden">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F6FF] via-[#FFF5F0] to-[#FFF0F5] dark:from-[#1A1A2E] dark:via-[#1E1E35] dark:to-[#1A1A2E]" />

        {/* Subtle decorative blobs - more visible in dark mode */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 dark:opacity-30"
          style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #B47EFF 100%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 dark:opacity-25"
          style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #95E879 100%)' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                             linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Slim Header */}
      <header className="flex-shrink-0 z-50 relative h-12 sm:h-14">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border" />
        <div className="relative h-full max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Logo */}
              <div className="relative group cursor-pointer flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B9D] via-[#B47EFF] to-[#4ECDC4] rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-card flex items-center justify-center border border-border overflow-hidden p-1">
                  <Logo size="md" />
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-base sm:text-lg font-bold truncate">
                  <span className="gradient-text">Generative UI Playground</span>
                </h1>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* User Menu */}
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 min-h-0 w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
