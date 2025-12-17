import { ComponentType } from 'react';
import { UIComponent, Action, InteractionEvent } from '@/lib/ui-schema';

// Props that all generative UI components receive
export interface GenerativeComponentProps<T extends UIComponent = UIComponent> {
  component: T;
  onAction: (event: Omit<InteractionEvent, 'timestamp'>) => void;
}

// Component registry type
export type ComponentRegistry = {
  [K in UIComponent['type']]: ComponentType<GenerativeComponentProps<Extract<UIComponent, { type: K }>>>;
};

// Helper to create an interaction event
export function createInteractionEvent(
  actionId: string,
  actionType: Action['type'],
  componentType: string,
  data?: Record<string, unknown>
): InteractionEvent {
  return {
    actionId,
    actionType,
    componentType,
    data,
    timestamp: Date.now(),
  };
}

// Helper to format interaction for LLM context
export function formatInteractionForLLM(event: InteractionEvent): string {
  const dataStr = event.data ? ` with data: ${JSON.stringify(event.data)}` : '';
  return `[User ${event.actionType} action "${event.actionId}" on ${event.componentType}${dataStr}]`;
}

