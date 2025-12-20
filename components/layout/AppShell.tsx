'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen flex flex-col bg-[#1A1A2E] text-white overflow-hidden">
      {/* Animated colorful background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#252542] to-[#1A1A2E]" />
        
        {/* Animated gradient blobs */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-blob opacity-50"
          style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #B47EFF 100%)' }}
        />
        <div 
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-blob opacity-40"
          style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #95E879 100%)', animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[-20%] left-[20%] w-[550px] h-[550px] rounded-full blur-[100px] animate-blob opacity-40"
          style={{ background: 'linear-gradient(135deg, #FFE66D 0%, #FF8C69 100%)', animationDelay: '4s' }}
        />
        <div 
          className="absolute bottom-[30%] right-[30%] w-[400px] h-[400px] rounded-full blur-[80px] animate-blob opacity-30"
          style={{ background: 'linear-gradient(135deg, #B47EFF 0%, #FF6B9D 100%)', animationDelay: '6s' }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-[15%] left-[10%] w-6 h-6 bg-[#FF6B9D] rounded-lg rotate-45 animate-float opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[25%] right-[15%] w-4 h-4 bg-[#4ECDC4] rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[8%] w-5 h-5 bg-[#FFE66D] rounded-lg animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[45%] right-[8%] w-8 h-8 bg-[#B47EFF] rounded-xl rotate-12 animate-float opacity-40" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[20%] left-[25%] w-3 h-3 bg-[#95E879] rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[35%] right-[25%] w-6 h-6 bg-[#FF8C69] rounded-lg rotate-[-12deg] animate-float opacity-50" style={{ animationDelay: '1.5s' }} />
        
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 107, 157, 0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Header - slim and playful */}
      <header className="flex-shrink-0 z-50 relative">
        <div className="absolute inset-0 bg-[#1A1A2E]/80 backdrop-blur-xl" />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              {/* Playful animated logo */}
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FF6B9D] via-[#B47EFF] to-[#4ECDC4] rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-all duration-500 animate-gradient-x" />
                <div className="relative w-10 h-10 rounded-xl bg-[#252542] flex items-center justify-center border-2 border-[#FF6B9D]/30 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D]/20 via-[#B47EFF]/10 to-transparent" />
                  <span className="text-xl relative z-10">🎨</span>
                </div>
              </div>
              
              {/* Title with playful gradient */}
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight">
                  <span className="gradient-text">UI Playground</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-[#FF6B9D] to-[#B47EFF] text-white rounded-full uppercase tracking-wider">
                  Beta
                </span>
              </div>
            </div>

            {/* Right side - decorative elements */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#252542]/80 border border-[#B47EFF]/20">
                <span className="text-sm">✨</span>
                <span className="text-xs text-[#A0A0C0]">Powered by Gemini</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Colorful gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B9D] via-[#B47EFF] via-[#4ECDC4] to-[#95E879] opacity-60" />
      </header>

      {/* Main content - fills remaining space */}
      <main className="flex-1 min-h-0 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
    </div>
  );
}
