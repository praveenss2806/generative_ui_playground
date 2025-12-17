'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type ProgressComponent = Extract<UIComponent, { type: 'progress' }>;

export function Progress({ component }: GenerativeComponentProps<ProgressComponent>) {
  const variantColors = {
    default: 'bg-emerald-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  const color = variantColors[component.variant || 'default'];
  const value = Math.min(100, Math.max(0, component.value));

  return (
    <div className="space-y-2">
      {(component.label || component.showValue) && (
        <div className="flex justify-between text-sm">
          {component.label && <span className="text-zinc-300">{component.label}</span>}
          {component.showValue && <span className="text-zinc-400">{value}%</span>}
        </div>
      )}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

