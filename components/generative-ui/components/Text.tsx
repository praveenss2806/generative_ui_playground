'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type TextComponent = Extract<UIComponent, { type: 'text' }>;

export function Text({ component }: GenerativeComponentProps<TextComponent>) {
  const variantClasses = {
    heading: 'text-2xl font-bold text-white',
    subheading: 'text-lg font-semibold text-zinc-200',
    body: 'text-base text-zinc-300',
    caption: 'text-sm text-zinc-400',
    code: 'font-mono text-sm bg-zinc-800/50 px-2 py-1 rounded text-emerald-400',
  };

  const className = variantClasses[component.variant || 'body'];

  if (component.variant === 'heading') {
    return <h2 className={className}>{component.content}</h2>;
  }

  if (component.variant === 'subheading') {
    return <h3 className={className}>{component.content}</h3>;
  }

  if (component.variant === 'code') {
    return <code className={className}>{component.content}</code>;
  }

  return <p className={className}>{component.content}</p>;
}

