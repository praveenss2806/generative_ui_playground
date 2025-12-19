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
      {/* Glow effect on focus */}
      <div 
        className={`
          absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
          opacity-0 blur-sm transition-opacity duration-500
          ${isFocused ? 'opacity-30' : ''}
        `}
      />
      
      {/* Main container */}
      <div 
        className={`
          relative flex items-end gap-3 p-4 rounded-2xl
          bg-zinc-900/90 backdrop-blur-xl border transition-all duration-300
          ${isFocused ? 'border-zinc-700/80' : 'border-zinc-800/50'}
        `}
      >
        {/* Left icon */}
        <div className={`
          flex-shrink-0 self-center transition-colors duration-300
          ${isFocused ? 'text-emerald-400' : 'text-zinc-600'}
        `}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
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
            placeholder={placeholder || "Describe the UI you want to create..."}
            disabled={isLoading}
            rows={1}
            className="
              w-full bg-transparent text-white placeholder-zinc-500
              outline-none resize-none text-sm leading-relaxed
              disabled:opacity-50 scrollbar-thin scrollbar-thumb-zinc-700
            "
          />
          
          {/* Hint text */}
          <div className={`
            flex items-center gap-2 mt-1.5 overflow-hidden transition-all duration-300
            ${isFocused && !hasContent ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <span className="text-[11px] text-zinc-600">Press</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800/80 rounded text-zinc-500 border border-zinc-700/50">Enter</kbd>
            <span className="text-[11px] text-zinc-600">to send</span>
            <span className="text-zinc-700 mx-1">•</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800/80 rounded text-zinc-500 border border-zinc-700/50">Shift + Enter</kbd>
            <span className="text-[11px] text-zinc-600">for new line</span>
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
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95'
              : 'bg-zinc-800/50 cursor-not-allowed'
            }
          `}
        >
          {/* Button glow */}
          {hasContent && !isLoading && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          )}
          
          {isLoading ? (
            <div className="relative">
              <svg className="w-5 h-5 text-zinc-400 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : (
            <svg 
              className={`
                relative w-5 h-5 transition-all duration-300
                ${hasContent ? 'text-white translate-x-0.5 -translate-y-0.5' : 'text-zinc-600'}
              `} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" 
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

