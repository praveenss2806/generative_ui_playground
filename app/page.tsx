'use client';

import { useState } from 'react';
import { useGenerativeUI } from '@/hooks/useGenerativeUI';
import { AppShell } from '@/components/layout/AppShell';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { UIRenderer, UIRendererSkeleton } from '@/components/generative-ui/UIRenderer';

export default function Home() {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    error,
    currentUI,
    handleInteraction,
  } = useGenerativeUI();

  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const hasUI = currentUI && currentUI.length > 0;
  const hasMessages = messages.length > 0;

  const suggestions = [
    { label: 'Dashboard', emoji: '📊', prompt: 'Create a sales dashboard with charts and stats' },
    { label: 'Contact Form', emoji: '📝', prompt: 'Build a contact form with name, email, and message' },
    { label: 'Todo App', emoji: '✅', prompt: 'Create an interactive todo list' },
    { label: 'Pricing Table', emoji: '💰', prompt: 'Show a pricing comparison table' },
    { label: 'Profile Card', emoji: '👤', prompt: 'Design a user profile card' },
    { label: 'Data Table', emoji: '📋', prompt: 'Create a data table with user information' },
  ];

  return (
    <AppShell>
      <div className="flex flex-col h-full relative">
        {/* Main Preview Area */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-32">
          {isLoading && !hasUI ? (
            <div className="h-full flex items-center justify-center p-6">
              <div className="w-full max-w-2xl">
                <UIRendererSkeleton />
              </div>
            </div>
          ) : hasUI ? (
            <div className="p-6 animate-fadeIn">
              {/* Component count badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <h2 className="text-lg font-bold text-white">Generated UI</h2>
                </div>
                <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20 text-[#FF6B9D] rounded-full border border-[#FF6B9D]/30">
                  {currentUI.length} component{currentUI.length !== 1 ? 's' : ''}
                </span>
              </div>
              <UIRenderer components={currentUI} onAction={handleInteraction} />
            </div>
          ) : (
            /* Fun Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="max-w-md">
                {/* Animated icon */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D]/30 to-[#B47EFF]/30 rounded-3xl rotate-6 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/30 to-[#95E879]/30 rounded-3xl -rotate-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="relative w-full h-full bg-[#252542] rounded-3xl flex items-center justify-center border-2 border-[#B47EFF]/30">
                    <span className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-extrabold mb-3">
                  <span className="gradient-text">Ready to Create?</span>
                </h2>
                <p className="text-[#A0A0C0] mb-8 text-lg">
                  Describe any UI and watch it come to life! Try one of these ideas:
                </p>
                
                {/* Suggestion pills */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.label}
                      onClick={() => {
                        setInput(suggestion.prompt);
                        setTimeout(() => sendMessage(suggestion.prompt), 100);
                      }}
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm 
                        bg-[#252542]/80 border-2 border-[#B47EFF]/20 text-white
                        hover:border-[#FF6B9D]/50 hover:bg-[#252542] hover:scale-105 hover:shadow-lg hover:shadow-[#FF6B9D]/20
                        transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{suggestion.emoji}</span>
                      <span>{suggestion.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Command Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40">
          {/* Expandable Chat History */}
          {isChatExpanded && hasMessages && (
            <div 
              className="mx-4 mb-2 max-h-[40vh] overflow-y-auto rounded-2xl bg-[#1A1A2E]/95 backdrop-blur-xl border-2 border-[#B47EFF]/20 shadow-2xl animate-slideUp"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#A0A0C0] flex items-center gap-2">
                    <span>💬</span> Chat History
                  </h3>
                  <button
                    onClick={() => setIsChatExpanded(false)}
                    className="p-1 rounded-lg hover:bg-[#252542] text-[#A0A0C0] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <ChatMessages messages={messages} isLoading={isLoading} />
              </div>
            </div>
          )}

          {/* Command Bar Container */}
          <div className="p-4 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/95 to-transparent pt-8">
            <div className="max-w-4xl mx-auto">
              {/* Error display */}
              {error && (
                <div className="mb-3 px-4 py-2 rounded-xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-[#FF6B6B] text-sm flex items-center gap-2 animate-bounceIn">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Toggle history button */}
              {hasMessages && (
                <button
                  onClick={() => setIsChatExpanded(!isChatExpanded)}
                  className="mb-3 mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                    bg-[#252542]/80 border border-[#B47EFF]/20 text-[#A0A0C0] hover:text-white hover:border-[#B47EFF]/40
                    transition-all duration-200"
                >
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isChatExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span>{isChatExpanded ? 'Hide' : 'Show'} chat history ({messages.length})</span>
                </button>
              )}

              {/* Chat Input */}
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={() => sendMessage(input)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
