'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type TimelineComponent = Extract<UIComponent, { type: 'timeline' }>;

export function Timeline({ component }: GenerativeComponentProps<TimelineComponent>) {
  const statusColors = {
    completed: 'bg-emerald-500 shadow-emerald-500/30',
    current: 'bg-cyan-500 shadow-cyan-500/30 animate-pulse',
    pending: 'bg-slate-300',
  };

  const lineColors = {
    completed: 'bg-gradient-to-b from-emerald-500 to-emerald-500',
    current: 'bg-gradient-to-b from-cyan-500 to-slate-200',
    pending: 'bg-slate-200',
  };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {component.title}
        </h3>
      )}
      
      <div className="space-y-0">
        {component.items.map((item, index) => (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0 group">
            {/* Vertical line */}
            {index < component.items.length - 1 && (
              <div className={`
                absolute left-[11px] top-7 bottom-0 w-0.5
                ${lineColors[item.status]}
              `} />
            )}
            
            {/* Status dot */}
            <div className="relative flex-shrink-0">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center
                ${statusColors[item.status]}
                shadow-lg
              `}>
                {item.status === 'completed' && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {item.status === 'current' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className={`
              flex-1 pt-0.5 
              ${item.status === 'pending' ? 'opacity-50' : ''}
            `}>
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-medium ${item.status === 'current' ? 'text-cyan-700' : 'text-slate-800'}`}>
                  {item.title}
                </h4>
                {item.time && (
                  <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
