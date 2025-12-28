'use client';

import { ReactNode } from 'react';
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
              <a
                href="https://github.com/praveenss2806/generative_ui_playground"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors"
                aria-label="GitHub repository"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.486 2 12.017c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.109-1.464-1.109-1.464-.908-.62.069-.608.069-.608 1.004.071 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.503.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.679.922.679 1.859 0 1.342-.012 2.425-.012 2.754 0 .269.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/praveen-sivakumar-s/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors"
                aria-label="LinkedIn profile"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.268 2.372 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.116 20.452H3.558V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
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
