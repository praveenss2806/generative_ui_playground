import type { Metadata } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { SessionProvider } from "@/components/auth/SessionProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "UI Playground - Generate Interfaces with AI",
  description: "A playful generative UI playground powered by Gemini. Create dynamic interfaces using natural language.",
};

export const viewport = {
  viewportFit: 'cover' as const,
};

// Inline script to prevent flash of wrong theme (defaults to dark)
const themeScript = `
  (function() {
    const stored = localStorage.getItem('ui-playground-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    // Default to dark theme unless explicitly set to light or system prefers light
    if (stored === 'light' || (!stored && prefersLight)) {
      // Light mode - don't add dark class
    } else {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${nunito.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
