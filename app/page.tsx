'use client';

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

  const hasUI = currentUI && currentUI.length > 0;
  const hasMessages = messages.length > 0;

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Chat Panel */}
        <div className="flex flex-col min-h-0">
          <div className="flex-shrink-0 flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </h2>
            {error && (
              <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                {error}
              </span>
            )}
          </div>

          {/* Messages area - scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-4 mb-4">
            {!hasMessages && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Start Creating</h3>
                <p className="text-sm text-zinc-500 max-w-xs">
                  Describe the UI you want to generate. Try &quot;Create a task manager&quot; or &quot;Show me a dashboard&quot;.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {['Create a contact form', 'Show me a dashboard', 'Build a todo list'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        setTimeout(() => sendMessage(suggestion), 100);
                      }}
                      className="px-3 py-1.5 text-xs bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 rounded-full border border-zinc-700 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ChatMessages messages={messages} isLoading={isLoading} />
            )}
          </div>

          {/* Chat input - fixed at bottom */}
          <div className="flex-shrink-0">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={() => sendMessage(input)}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Generated UI Panel */}
        <div className="flex flex-col min-h-0">
          <div className="flex-shrink-0 flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Generated UI
            </h2>
            {hasUI && (
              <span className="text-xs text-zinc-500">
                {currentUI.length} component{currentUI.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Generated UI area - scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6">
            {isLoading && !hasUI ? (
              <UIRendererSkeleton />
            ) : hasUI ? (
              <UIRenderer components={currentUI} onAction={handleInteraction} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-400 mb-2">No UI Generated</h3>
                <p className="text-sm text-zinc-600 max-w-xs">
                  Your generated interfaces will appear here. Start by sending a message in the chat.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
