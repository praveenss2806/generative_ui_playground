'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type BadgeComponent = Extract<UIComponent, { type: 'badge' }>;

export function Badge({ component }: GenerativeComponentProps<BadgeComponent>) {
  const variantClasses = {
    default: 'bg-slate-100 border-slate-200 text-slate-600',
    primary: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    secondary: 'bg-violet-50 border-violet-200 text-violet-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variant = component.variant || 'default';
  const size = component.size || 'md';

  return (
    <span className={`
      inline-flex items-center gap-1.5 font-medium rounded-full border
      ${variantClasses[variant]}
      ${sizeClasses[size]}
    `}>
      {component.icon && <span className="text-sm">{component.icon}</span>}
      {component.label}
      {component.dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'warning' ? 'bg-amber-500' :
          variant === 'error' ? 'bg-red-500' :
          variant === 'primary' ? 'bg-cyan-500' :
          variant === 'secondary' ? 'bg-violet-500' :
          'bg-slate-400'
        } animate-pulse`} />
      )}
    </span>
  );
}
