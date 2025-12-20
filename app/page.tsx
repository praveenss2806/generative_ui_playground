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
      <div className="flex flex-col h-full relative px-4 sm:px-6 py-4">
        {/* Sandbox Preview Area */}
        <div className="flex-1 min-h-0 flex flex-col">
          {isLoading && !hasUI ? (
            /* Loading State */
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft">
                  <UIRendererSkeleton />
                </div>
              </div>
            </div>
          ) : hasUI ? (
            /* Generated UI Preview */
            <div className="flex-1 min-h-0 flex flex-col animate-fadeIn">
              {/* Sandbox Wrapper for loading border effect */}
              <div className={`flex-1 min-h-0 flex flex-col rounded-2xl ${isLoading ? 'loading-border' : ''}`}>
                {/* Sandbox Container */}
                <div className="flex-1 min-h-0 bg-card border border-border rounded-2xl shadow-soft overflow-hidden flex flex-col">
                  {/* Sandbox Header */}
                  <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg">🎨</span>
                      <h2 className="text-sm font-semibold text-foreground truncate">Generated UI</h2>
                    </div>
                    {isLoading ? (
                      <div className="flex-shrink-0 flex items-center gap-2 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      <span className="flex-shrink-0 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {currentUI.length} component{currentUI.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  {/* Sandbox Content */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
                    <div className="max-w-4xl mx-auto">
                      <UIRenderer components={currentUI} onAction={handleInteraction} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-md w-full">
                {/* Animated icon */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl rotate-6 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-green-500/20 rounded-3xl -rotate-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="relative w-full h-full bg-card rounded-3xl flex items-center justify-center border border-border shadow-soft">
                    <span className="text-5xl sm:text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  <span className="gradient-text">Ready to Create?</span>
                </h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Describe any UI and watch it come to life! Try one of these ideas:
                </p>
                
                {/* Suggestion pills - responsive grid */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.label}
                      onClick={() => {
                        setInput(suggestion.prompt);
                        setTimeout(() => sendMessage(suggestion.prompt), 100);
                      }}
                      className="group flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-medium text-sm 
                        bg-card border border-border text-foreground
                        hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]
                        active:scale-[0.98] transition-all duration-200 animate-fadeIn"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">{suggestion.emoji}</span>
                      <span className="truncate">{suggestion.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Command Bar */}
        <div className="flex-shrink-0 pt-4 pb-safe">
          {/* Expandable Chat History */}
          {isChatExpanded && hasMessages && (
            <div className="mb-3 max-h-[35vh] overflow-y-auto rounded-xl bg-card border border-border shadow-soft-lg animate-slideUp">
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                    <span>💬</span> Chat History
                  </h3>
                  <button
                    onClick={() => setIsChatExpanded(false)}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <ChatMessages messages={messages} isLoading={isLoading} />
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mb-3 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2 animate-bounceIn">
              <span>⚠️</span>
              <span className="break-words">{error}</span>
            </div>
          )}

          {/* Chat Input */}
          <div className="max-w-3xl mx-auto w-full">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={() => sendMessage(input)}
              isLoading={isLoading}
              hasMessages={hasMessages}
              messageCount={messages.length}
              isHistoryExpanded={isChatExpanded}
              onToggleHistory={() => setIsChatExpanded(!isChatExpanded)}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
