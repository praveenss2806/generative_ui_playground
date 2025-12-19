'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type RatingComponent = Extract<UIComponent, { type: 'rating' }>;

export function Rating({ component, onAction }: GenerativeComponentProps<RatingComponent>) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState(component.value || 0);

  const maxStars = component.max || 5;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;
  const isReadOnly = component.readOnly ?? false;

  const handleClick = (value: number) => {
    if (isReadOnly) return;
    setCurrentValue(value);
    if (component.action) {
      onAction({
        actionId: component.action.id,
        actionType: component.action.type,
        componentType: 'rating',
        data: { value },
      });
    }
  };

  return (
    <div className="space-y-2">
      {component.label && (
        <label className="block text-sm font-medium text-slate-700">{component.label}</label>
      )}
      
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayValue;
          
          return (
            <button
              key={i}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !isReadOnly && setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(null)}
              disabled={isReadOnly}
              className={`
                relative p-0.5 transition-transform duration-150
                ${!isReadOnly ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'}
              `}
            >
              <svg 
                className={`
                  relative w-7 h-7 transition-colors duration-200
                  ${isFilled 
                    ? 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]' 
                    : 'text-slate-300 hover:text-slate-400'
                  }
                `}
                fill={isFilled ? 'currentColor' : 'none'}
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          );
        })}
        
        {component.showValue && (
          <span className="ml-2 text-sm font-medium text-slate-500">
            {currentValue} / {maxStars}
          </span>
        )}
      </div>
    </div>
  );
}
