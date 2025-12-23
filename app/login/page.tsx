import { SignInButton } from '@/components/auth/SignInButton';
import { LogoLarge } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Note: Redirect for authenticated users is handled by middleware
export default function LoginPage() {

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blobs */}
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl animate-blob"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #B47EFF)' }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl animate-blob"
          style={{ background: 'linear-gradient(135deg, #4ECDC4, #95E879)', animationDelay: '2s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #B47EFF 0%, transparent 70%)' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                             linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Title Area */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple/20 rounded-2xl rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-green/20 rounded-2xl -rotate-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="relative w-full h-full bg-card rounded-2xl flex items-center justify-center border border-border shadow-soft p-3">
              <LogoLarge />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Generative UI Playground</span>
          </h1>
          <p className="text-muted-foreground">
            Generate beautiful interfaces with AI
          </p>
        </div>

        {/* Sign In Card */}
        <div 
          className="bg-card border border-border rounded-3xl p-8 shadow-soft-lg animate-slideUp"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">Welcome</h2>
            <p className="text-sm text-muted-foreground">Sign in to start creating</p>
          </div>

          <SignInButton className="w-full" />
        </div>

      </div>
    </div>
  );
}

