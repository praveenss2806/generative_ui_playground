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
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[85%] px-4 py-3 rounded-2xl
              ${message.role === 'user'
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-100'
                : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-200'
              }
            `}
          >
            {message.role === 'user' ? (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            ) : (
              <p className="text-sm whitespace-pre-wrap">
                {message.chatMessage || (message.ui && message.ui.length > 0 ? '✨ Generated UI below' : message.content)}
              </p>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-zinc-800/50 border border-zinc-700/50 px-4 py-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-zinc-400">Generating UI...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

