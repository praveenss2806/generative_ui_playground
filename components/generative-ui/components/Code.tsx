'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type CodeComponent = Extract<UIComponent, { type: 'code' }>;

export function Code({ component }: GenerativeComponentProps<CodeComponent>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(component.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageColors: Record<string, string> = {
    javascript: 'text-amber-600',
    typescript: 'text-blue-600',
    python: 'text-emerald-600',
    rust: 'text-orange-600',
    go: 'text-cyan-600',
    html: 'text-rose-600',
    css: 'text-violet-600',
    json: 'text-lime-600',
    bash: 'text-slate-600',
    shell: 'text-slate-600',
    sql: 'text-pink-600',
  };

  const langColor = languageColors[component.language?.toLowerCase() || ''] || 'text-slate-500';

  return (
    <div className="space-y-2">
      {component.title && (
        <h4 className="text-sm font-medium text-slate-700">{component.title}</h4>
      )}
      
      <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-soft">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            
            {component.language && (
              <span className={`text-xs font-mono font-medium ${langColor}`}>
                {component.language}
              </span>
            )}
            
            {component.filename && (
              <span className="text-xs text-slate-400 font-mono">
                {component.filename}
              </span>
            )}
          </div>
          
          <button
            onClick={handleCopy}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${copied 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300'
              }
            `}
          >
            {copied ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </button>
        </div>
        
        {/* Code content */}
        <div className="overflow-x-auto bg-slate-900">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            <code className="text-slate-100">
              {component.showLineNumbers ? (
                component.code.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-slate-500 w-8 text-right pr-4 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{line || ' '}</span>
                  </div>
                ))
              ) : (
                component.code
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
