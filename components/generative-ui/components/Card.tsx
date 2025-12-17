'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';
import { UIRenderer } from '../UIRenderer';

type CardComponent = Extract<UIComponent, { type: 'card' }>;

export function Card({ component, onAction }: GenerativeComponentProps<CardComponent>) {
  const variantClasses = {
    default: 'bg-zinc-900/60 border border-zinc-800/50',
    outlined: 'bg-transparent border-2 border-zinc-700',
    elevated: 'bg-zinc-900/80 shadow-xl shadow-black/20 border border-zinc-700/30',
  };

  const variant = component.variant || 'default';

  return (
    <div className={`rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 ${variantClasses[variant]}`}>
      {component.title && (
        <h3 className="text-lg font-semibold text-white mb-1">{component.title}</h3>
      )}
      {component.subtitle && (
        <p className="text-sm text-zinc-400 mb-3">{component.subtitle}</p>
      )}
      {component.content && (
        <p className="text-zinc-300 mb-4">{component.content}</p>
      )}
      {component.children && component.children.length > 0 && (
        <div className="space-y-3">
          <UIRenderer components={component.children} onAction={onAction} />
        </div>
      )}
      {component.actions && component.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-800">
          {component.actions.map((action) => {
            const buttonVariants = {
              primary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
              secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white',
              danger: 'bg-red-600 hover:bg-red-500 text-white',
              ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-300',
            };
            const buttonClass = buttonVariants[action.variant || 'secondary'];
            
            return (
              <button
                key={action.id}
                onClick={() => onAction({
                  actionId: action.id,
                  actionType: action.type,
                  componentType: 'card',
                })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${buttonClass}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

