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

  return (
    <div 
      className={`
        relative flex items-end gap-3 p-3 rounded-2xl
        bg-zinc-900/80 border transition-all duration-300
        ${isFocused ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'border-zinc-800'}
      `}
    >
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
          flex-1 bg-transparent text-white placeholder-zinc-500
          outline-none resize-none text-sm leading-relaxed
          disabled:opacity-50
        "
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="
          flex-shrink-0 p-2.5 rounded-xl
          bg-gradient-to-r from-emerald-600 to-teal-600
          hover:from-emerald-500 hover:to-teal-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 active:scale-95
          shadow-lg shadow-emerald-900/30
        "
      >
        {isLoading ? (
          <svg className="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </button>
    </div>
  );
}

