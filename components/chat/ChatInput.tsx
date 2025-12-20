'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
  // History toggle props
  hasMessages?: boolean;
  messageCount?: number;
  isHistoryExpanded?: boolean;
  onToggleHistory?: () => void;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading, 
  placeholder,
  hasMessages,
  messageCount = 0,
  isHistoryExpanded,
  onToggleHistory,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSubmit();
      }
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="relative w-full max-w-full">
      {/* Glow effect on focus */}
      <div 
        className={`
          absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-accent
          opacity-0 blur transition-opacity duration-300
          ${isFocused ? 'opacity-30' : ''}
        `}
      />
      
      {/* Main container */}
      <div 
        className={`
          relative flex items-end gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl
          bg-card border transition-all duration-200
          ${isFocused ? 'border-primary/50 shadow-soft-lg' : 'border-border shadow-soft'}
        `}
      >
        {/* History toggle button */}
        {hasMessages && onToggleHistory && (
          <button
            type="button"
            onClick={onToggleHistory}
            className={`
              flex-shrink-0 self-center relative p-1.5 rounded-lg transition-all duration-200
              ${isHistoryExpanded 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
            title={isHistoryExpanded ? 'Hide history' : 'Show history'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Message count badge */}
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                {messageCount > 99 ? '99+' : messageCount}
              </span>
            )}
          </button>
        )}

        {/* Sparkle icon */}
        <div className={`
          flex-shrink-0 self-center transition-all duration-200
          ${isFocused ? 'text-primary scale-110' : 'text-muted-foreground'}
        `}>
          <span className="text-lg sm:text-xl">✨</span>
        </div>

        {/* Textarea */}
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder || "What would you like me to create?"}
            disabled={isLoading}
            rows={1}
            className="
              w-full bg-transparent text-foreground placeholder-muted-foreground/60
              outline-none resize-none text-sm sm:text-base leading-relaxed font-medium
              disabled:opacity-50 border-none focus:ring-0
            "
            style={{ boxShadow: 'none' }}
          />
          
          {/* Hint text - hidden on mobile */}
          <div className={`
            hidden sm:flex items-center gap-2 mt-2 overflow-hidden transition-all duration-200
            ${isFocused && !hasContent ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <span className="text-xs text-muted-foreground/60">Press</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded text-primary border border-border">Enter</kbd>
            <span className="text-xs text-muted-foreground/60">to send</span>
            <span className="text-muted-foreground/30 mx-1">•</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded text-purple-500 border border-border">Shift + Enter</kbd>
            <span className="text-xs text-muted-foreground/60">for new line</span>
          </div>
        </div>

        {/* Send button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !hasContent}
          className={`
            flex-shrink-0 relative group p-2.5 sm:p-3 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center
            transition-all duration-200 ease-out
            ${hasContent && !isLoading
              ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
              : 'bg-muted border border-border text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <svg 
              className={`
                w-5 h-5 transition-all duration-200
                ${hasContent ? 'rotate-[-20deg]' : ''}
              `} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" 
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
