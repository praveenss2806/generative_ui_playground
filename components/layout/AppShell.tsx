'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Header - fixed height */}
      <header className="flex-shrink-0 z-50 border-b border-zinc-800/30 bg-zinc-950/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Animated logo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-700/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                  <svg className="w-6 h-6 text-emerald-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Title with gradient */}
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                  Generative UI
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </header>

      {/* Main content - fills remaining space */}
      <main className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
    </div>
  );
}

