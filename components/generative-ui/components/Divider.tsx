'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type DividerComponent = Extract<UIComponent, { type: 'divider' }>;

export function Divider({ component }: GenerativeComponentProps<DividerComponent>) {
  if (component.label) {
    return (
      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-zinc-700" />
        <span className="px-4 text-sm text-zinc-500 bg-transparent">{component.label}</span>
        <div className="flex-grow border-t border-zinc-700" />
      </div>
    );
  }

  return <hr className="border-zinc-700 my-4" />;
}

