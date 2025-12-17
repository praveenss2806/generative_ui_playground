'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type ButtonComponent = Extract<UIComponent, { type: 'button' }>;

export function Button({ component, onAction }: GenerativeComponentProps<ButtonComponent>) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30',
    secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-900/30',
    ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-300 border border-zinc-700',
  };

  const variant = component.variant || 'primary';
  const isDisabled = component.disabled || component.loading;

  return (
    <button
      onClick={() => {
        if (!isDisabled) {
          onAction({
            actionId: component.action.id,
            actionType: component.action.type,
            componentType: 'button',
          });
        }
      }}
      disabled={isDisabled}
      className={`
        px-5 py-2.5 rounded-lg font-medium transition-all duration-200
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        inline-flex items-center gap-2
      `}
    >
      {component.loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {component.label}
    </button>
  );
}

