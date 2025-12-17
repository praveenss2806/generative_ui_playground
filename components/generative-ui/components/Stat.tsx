'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type StatComponent = Extract<UIComponent, { type: 'stat' }>;

export function Stat({ component }: GenerativeComponentProps<StatComponent>) {
  const changeColors = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    neutral: 'text-zinc-400',
  };

  const changeColor = component.changeType ? changeColors[component.changeType] : 'text-zinc-400';

  return (
    <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
      <div className="flex items-center gap-3">
        {component.icon && (
          <span className="text-2xl">{component.icon}</span>
        )}
        <div className="flex-1">
          <p className="text-sm text-zinc-500 mb-1">{component.label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{component.value}</span>
            {component.change && (
              <span className={`text-sm font-medium ${changeColor}`}>
                {component.change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

