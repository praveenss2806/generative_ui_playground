'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type EmptyStateComponent = Extract<UIComponent, { type: 'empty' }>;

export function EmptyState({ component, onAction }: GenerativeComponentProps<EmptyStateComponent>) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {component.icon && (
        <span className="text-5xl mb-4">{component.icon}</span>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{component.title}</h3>
      {component.description && (
        <p className="text-zinc-400 mb-6 max-w-sm">{component.description}</p>
      )}
      {component.action && (
        <button
          onClick={() => onAction({
            actionId: component.action!.id,
            actionType: component.action!.type,
            componentType: 'empty',
          })}
          className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 active:scale-95"
        >
          {component.action.label}
        </button>
      )}
    </div>
  );
}

