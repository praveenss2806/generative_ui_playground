import { InteractionEvent } from './ui-schema';

// Format an interaction event as a context string for the LLM
export function formatInteraction(event: InteractionEvent): string {
  const dataStr = event.data && Object.keys(event.data).length > 0
    ? ` with data: ${JSON.stringify(event.data)}`
    : '';
  
  return `[User ${event.actionType} action "${event.actionId}" on ${event.componentType}${dataStr}]`;
}

// Create a complete interaction event with timestamp
export function createInteraction(
  actionId: string,
  actionType: InteractionEvent['actionType'],
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

// Parse the LLM response to extract UI components
export function parseUIResponse(response: string): { ui: unknown[]; message?: string } | null {
  try {
    // Try to find JSON in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate structure
    if (parsed.ui && Array.isArray(parsed.ui)) {
      return {
        ui: parsed.ui,
        message: parsed.message,
      };
    }
    
    return null;
  } catch {
    console.error('Failed to parse UI response');
    return null;
  }
}

