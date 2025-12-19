'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type AvatarComponent = Extract<UIComponent, { type: 'avatar' }>;

export function Avatar({ component }: GenerativeComponentProps<AvatarComponent>) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };

  const statusSizes = {
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2',
  };

  const size = component.size || 'md';

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate color from name
  const getColorFromName = (name: string) => {
    const colors = [
      'from-cyan-400 to-blue-500',
      'from-violet-400 to-purple-500',
      'from-fuchsia-400 to-pink-500',
      'from-rose-400 to-red-500',
      'from-amber-400 to-orange-500',
      'from-emerald-400 to-teal-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="relative inline-flex">
      {component.src ? (
        <img
          src={component.src}
          alt={component.name}
          className={`
            ${sizeClasses[size]} 
            rounded-full object-cover 
            border-2 border-white
            ring-2 ring-slate-100
            shadow-soft
          `}
        />
      ) : (
        <div className={`
          ${sizeClasses[size]} 
          rounded-full 
          bg-gradient-to-br ${getColorFromName(component.name)}
          flex items-center justify-center font-semibold text-white
          border-2 border-white
          ring-2 ring-slate-100
          shadow-soft
        `}>
          {getInitials(component.name)}
        </div>
      )}
      
      {component.status && (
        <span className={`
          absolute bottom-0 right-0 
          ${statusSizes[size]} 
          ${statusColors[component.status]}
          rounded-full border-white
          ${component.status === 'online' ? 'animate-pulse' : ''}
        `} />
      )}
    </div>
  );
}
