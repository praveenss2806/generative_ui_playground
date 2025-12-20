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
              max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2.5 rounded-2xl font-medium
              ${message.role === 'user'
                ? 'bg-primary/10 border border-primary/20 text-foreground'
                : 'bg-muted border border-border text-foreground'
              }
            `}
          >
            {/* Message icon */}
            <div className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0 mt-0.5">
                {message.role === 'user' ? '👤' : '🤖'}
              </span>
              <div className="min-w-0">
                {message.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                ) : (
                  <p className="text-sm whitespace-pre-wrap break-words">
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
          <div className="bg-muted border border-border px-3 sm:px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm">🎨</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
              </div>
              <span className="text-sm text-muted-foreground font-medium">Creating magic...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
