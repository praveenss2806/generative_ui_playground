'use client';

import { UIComponent } from '@/lib/ui-schema';

interface ParsedMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ui?: UIComponent[];
  chatMessage?: string;
}

interface ChatMessagesProps {
  messages: ParsedMessage[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (messages.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className={`
              max-w-[85%] px-4 py-3 rounded-2xl font-medium
              ${message.role === 'user'
                ? 'bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20 border-2 border-[#FF6B9D]/30 text-white'
                : 'bg-[#252542]/80 border-2 border-[#4ECDC4]/20 text-white'
              }
            `}
          >
            {/* Message icon */}
            <div className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0 mt-0.5">
                {message.role === 'user' ? '👤' : '🤖'}
              </span>
              <div>
                {message.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">
                    {message.chatMessage || (message.ui && message.ui.length > 0 ? '✨ UI generated! Check out the preview above.' : message.content)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start animate-fadeIn">
          <div className="bg-[#252542]/80 border-2 border-[#B47EFF]/20 px-4 py-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm">🎨</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#FF6B9D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 bg-[#B47EFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 bg-[#4ECDC4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-2.5 h-2.5 bg-[#FFE66D] rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
              </div>
              <span className="text-sm text-[#A0A0C0] font-medium">Creating magic...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
