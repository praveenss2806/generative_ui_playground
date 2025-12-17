'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type ListComponent = Extract<UIComponent, { type: 'list' }>;

export function List({ component, onAction }: GenerativeComponentProps<ListComponent>) {
  const variant = component.variant || 'default';

  const variantClasses = {
    default: 'space-y-2',
    divided: 'divide-y divide-zinc-800',
    cards: 'space-y-3',
  };

  const itemClasses = {
    default: 'py-2',
    divided: 'py-3 first:pt-0 last:pb-0',
    cards: 'p-4 bg-zinc-900/40 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors duration-150',
  };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-lg font-semibold text-white">{component.title}</h3>
      )}
      <div className={variantClasses[variant]}>
        {component.items.map((item) => (
          <div key={item.id} className={`flex items-center justify-between ${itemClasses[variant]}`}>
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-xl">{item.icon}</span>
              )}
              <div>
                <p className="text-zinc-200 font-medium">{item.title}</p>
                {item.subtitle && (
                  <p className="text-sm text-zinc-500">{item.subtitle}</p>
                )}
              </div>
            </div>
            {item.actions && item.actions.length > 0 && (
              <div className="flex gap-2">
                {item.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onAction({
                      actionId: action.id,
                      actionType: action.type,
                      componentType: 'list',
                      data: { itemId: item.id },
                    })}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors duration-150"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {component.items.length === 0 && (
          <p className="text-zinc-500 text-center py-4">No items to display</p>
        )}
      </div>
    </div>
  );
}

