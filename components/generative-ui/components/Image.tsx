'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type ImageComponent = Extract<UIComponent, { type: 'image' }>;

export function Image({ component }: GenerativeComponentProps<ImageComponent>) {
  return (
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={component.src}
        alt={component.alt}
        width={component.width}
        height={component.height}
        className={`max-w-full h-auto ${component.rounded ? 'rounded-xl' : ''}`}
        loading="lazy"
      />
    </div>
  );
}

