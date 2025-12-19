'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type AccordionComponent = Extract<UIComponent, { type: 'accordion' }>;

export function Accordion({ component }: GenerativeComponentProps<AccordionComponent>) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    component.items.forEach((item) => {
      if (item.defaultOpen) initial.add(item.id);
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!component.allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          {component.title}
        </h3>
      )}
      
      <div className="space-y-2">
        {component.items.map((item) => {
          const isOpen = openItems.has(item.id);
          
          return (
            <div 
              key={item.id} 
              className={`
                rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-300 shadow-soft
                ${isOpen 
                  ? 'bg-white border-cyan-200' 
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }
              `}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <span className="text-lg">{item.icon}</span>
                  )}
                  <span className={`font-medium transition-colors ${isOpen ? 'text-cyan-700' : 'text-slate-700'}`}>
                    {item.title}
                  </span>
                </div>
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  transition-all duration-300
                  ${isOpen 
                    ? 'bg-cyan-100 text-cyan-600 rotate-180' 
                    : 'bg-slate-100 text-slate-500'
                  }
                `}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`
                overflow-hidden transition-all duration-300
                ${isOpen ? 'max-h-96' : 'max-h-0'}
              `}>
                <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
