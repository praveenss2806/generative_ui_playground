'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { UIComponent, InteractionEvent } from '@/lib/ui-schema';
import { formatInteraction, parseUIResponse } from '@/lib/interaction-handler';

export interface GenerativeUIState {
  components: UIComponent[];
  isLoading: boolean;
  error: string | null;
}

export function useGenerativeUI() {
  const [currentUI, setCurrentUI] = useState<UIComponent[]>([]);
  const [pendingInteraction, setPendingInteraction] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Parse messages to extract UI components and chat messages
  const parsedMessages = useMemo(() => {
    return messages.map((msg) => {
      const textContent = msg.parts
        .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
        .map((part) => part.text)
        .join('');

      if (msg.role === 'assistant') {
        const parsed = parseUIResponse(textContent);
        return {
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: textContent,
          ui: parsed?.ui as UIComponent[] | undefined,
          chatMessage: parsed?.message,
        };
      }
      return {
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: textContent,
        ui: undefined,
        chatMessage: textContent,
      };
    });
  }, [messages]);

  // Update currentUI when messages change and we're done loading
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const textContent = lastMessage.parts
          .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
          .map((part) => part.text)
          .join('');
        
        const parsed = parseUIResponse(textContent);
        if (parsed?.ui) {
          setCurrentUI(parsed.ui as UIComponent[]);
        }
        setPendingInteraction(null);
      }
    }
  }, [messages, isLoading]);

  // Handle user interactions with the generated UI
  const handleInteraction = useCallback((event: Omit<InteractionEvent, 'timestamp'>) => {
    const fullEvent: InteractionEvent = {
      ...event,
      timestamp: Date.now(),
    };
    
    // Format the interaction as context for the LLM
    const interactionContext = formatInteraction(fullEvent);
    setPendingInteraction(interactionContext);
    
    // Send the interaction to the LLM
    sendMessage({ text: interactionContext });
  }, [sendMessage]);

  // Send a chat message
  const handleSendMessage = useCallback((message: string) => {
    if (!message.trim()) return;
    
    sendMessage({ text: message });
    setInput('');
  }, [sendMessage]);

  // Get the latest UI state (from the most recent assistant message)
  const latestUI = useMemo(() => {
    for (let i = parsedMessages.length - 1; i >= 0; i--) {
      const msg = parsedMessages[i];
      if (msg.role === 'assistant' && msg.ui && msg.ui.length > 0) {
        return msg.ui;
      }
    }
    return currentUI;
  }, [parsedMessages, currentUI]);

  return {
    // Chat state
    messages: parsedMessages,
    input,
    setInput,
    sendMessage: handleSendMessage,
    isLoading,
    error: error?.message || null,
    
    // UI state
    currentUI: latestUI,
    handleInteraction,
    pendingInteraction,
  };
}
