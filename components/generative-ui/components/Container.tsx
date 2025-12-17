'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';
import { UIRenderer } from '../UIRenderer';

type ContainerComponent = Extract<UIComponent, { type: 'container' }>;

export function Container({ component, onAction }: GenerativeComponentProps<ContainerComponent>) {
  const direction = component.direction || 'column';
  const gap = component.gap || 'md';
  const align = component.align || 'stretch';
  const justify = component.justify || 'start';

  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div className={`flex ${directionClasses[direction]} ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]}`}>
      {component.children?.map((child, index) => (
        <div key={index} className={direction === 'row' ? '' : 'w-full'}>
          <UIRenderer components={[child]} onAction={onAction} />
        </div>
      ))}
    </div>
  );
}

