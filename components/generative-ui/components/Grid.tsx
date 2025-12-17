'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';
import { UIRenderer } from '../UIRenderer';

type GridComponent = Extract<UIComponent, { type: 'grid' }>;

export function Grid({ component, onAction }: GenerativeComponentProps<GridComponent>) {
  const columns = component.columns || 2;
  const gap = component.gap || 'md';

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const colClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]}`}>
      {component.children?.map((child, index) => (
        <div key={index}>
          <UIRenderer components={[child]} onAction={onAction} />
        </div>
      ))}
    </div>
  );
}

