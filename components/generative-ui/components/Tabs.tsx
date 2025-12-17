'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';
import { UIRenderer } from '../UIRenderer';

type TabsComponent = Extract<UIComponent, { type: 'tabs' }>;

export function Tabs({ component, onAction }: GenerativeComponentProps<TabsComponent>) {
  const [activeTab, setActiveTab] = useState(component.defaultTab || component.tabs[0]?.id);

  const activeContent = component.tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-zinc-900/60 rounded-xl border border-zinc-800">
        {component.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === tab.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[100px]">
        {activeContent && (
          <UIRenderer components={[activeContent]} onAction={onAction} />
        )}
      </div>
    </div>
  );
}

