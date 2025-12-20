'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ value, onChange, onSubmit, isLoading, placeholder }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
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
    <div className="relative">
      {/* Rainbow glow effect on focus */}
      <div 
        className={`
          absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF6B9D] via-[#B47EFF] via-[#4ECDC4] to-[#FFE66D]
          opacity-0 blur-md transition-opacity duration-500 animate-gradient-x
          ${isFocused ? 'opacity-60' : ''}
        `}
      />
      
      {/* Main container */}
      <div 
        className={`
          relative flex items-end gap-4 p-4 rounded-2xl
          bg-[#252542]/95 backdrop-blur-xl border-2 transition-all duration-300
          ${isFocused ? 'border-[#FF6B9D]/50' : 'border-[#B47EFF]/20'}
        `}
      >
        {/* Left sparkle icon */}
        <div className={`
          flex-shrink-0 self-center transition-all duration-300
          ${isFocused ? 'text-[#FF6B9D] scale-110' : 'text-[#A0A0C0]'}
        `}>
          <span className="text-xl">✨</span>
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
            placeholder={placeholder || "What would you like me to create? ✨"}
            disabled={isLoading}
            rows={1}
            className="
              w-full bg-transparent text-white placeholder-[#A0A0C0]/60
              outline-none resize-none text-base leading-relaxed font-medium
              disabled:opacity-50
            "
          />
          
          {/* Hint text */}
          <div className={`
            flex items-center gap-2 mt-2 overflow-hidden transition-all duration-300
            ${isFocused && !hasContent ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <span className="text-xs text-[#A0A0C0]/60">Press</span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#1A1A2E] rounded-lg text-[#FF6B9D] border border-[#FF6B9D]/30">Enter</kbd>
            <span className="text-xs text-[#A0A0C0]/60">to send</span>
            <span className="text-[#B47EFF]/50 mx-1">•</span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#1A1A2E] rounded-lg text-[#B47EFF] border border-[#B47EFF]/30">Shift + Enter</kbd>
            <span className="text-xs text-[#A0A0C0]/60">for new line</span>
          </div>
        </div>

        {/* Send button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !hasContent}
          className={`
            flex-shrink-0 relative group p-3 rounded-xl
            transition-all duration-300 ease-out
            ${hasContent && !isLoading
              ? 'bg-gradient-to-r from-[#FF6B9D] to-[#B47EFF] shadow-lg shadow-[#FF6B9D]/30 hover:shadow-[#FF6B9D]/50 hover:scale-110 active:scale-95'
              : 'bg-[#1A1A2E] border-2 border-[#B47EFF]/20 cursor-not-allowed'
            }
          `}
        >
          {/* Button glow */}
          {hasContent && !isLoading && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#B47EFF] blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          )}
          
          {isLoading ? (
            <div className="relative flex items-center gap-1">
              <span className="w-2 h-2 bg-[#FF6B9D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#B47EFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-[#4ECDC4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <svg 
              className={`
                relative w-5 h-5 transition-all duration-300
                ${hasContent ? 'text-white rotate-[-20deg]' : 'text-[#A0A0C0]/50'}
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
