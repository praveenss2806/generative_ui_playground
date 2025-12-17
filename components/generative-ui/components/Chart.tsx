'use client';

import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type ChartComponent = Extract<UIComponent, { type: 'chart' }>;

const defaultColors = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
];

export function Chart({ component }: GenerativeComponentProps<ChartComponent>) {
  const data = component.data || [];
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  if (component.chartType === 'bar') {
    return (
      <div className="space-y-4">
        {component.title && (
          <h3 className="text-lg font-semibold text-white">{component.title}</h3>
        )}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300">{item.label}</span>
                <span className="text-zinc-400">{item.value}</span>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color || defaultColors[index % defaultColors.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {(component.xLabel || component.yLabel) && (
          <div className="flex justify-between text-xs text-zinc-500 pt-2">
            {component.yLabel && <span>{component.yLabel}</span>}
            {component.xLabel && <span>{component.xLabel}</span>}
          </div>
        )}
      </div>
    );
  }

  if (component.chartType === 'pie' || component.chartType === 'doughnut') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let cumulativePercent = 0;

    const segments = data.map((item, index) => {
      const percent = (item.value / total) * 100;
      const startPercent = cumulativePercent;
      cumulativePercent += percent;
      return {
        ...item,
        percent,
        startPercent,
        color: item.color || defaultColors[index % defaultColors.length],
      };
    });

    // Create conic gradient
    const gradientStops = segments.map((seg) => 
      `${seg.color} ${seg.startPercent}% ${seg.startPercent + seg.percent}%`
    ).join(', ');

    return (
      <div className="space-y-4">
        {component.title && (
          <h3 className="text-lg font-semibold text-white">{component.title}</h3>
        )}
        <div className="flex items-center gap-8">
          <div 
            className="w-40 h-40 rounded-full relative"
            style={{
              background: `conic-gradient(${gradientStops})`,
            }}
          >
            {component.chartType === 'doughnut' && (
              <div className="absolute inset-4 bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">{total}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {segments.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-zinc-300">{item.label}</span>
                <span className="text-sm text-zinc-500">({item.percent.toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Line chart - simplified representation
  if (component.chartType === 'line') {
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1 || 1)) * 100,
      y: 100 - (d.value / maxValue) * 100,
      ...d,
    }));

    const pathD = points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')
      : '';

    return (
      <div className="space-y-4">
        {component.title && (
          <h3 className="text-lg font-semibold text-white">{component.title}</h3>
        )}
        <div className="relative h-48 bg-zinc-900/40 rounded-xl border border-zinc-800 p-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                className="text-zinc-800"
                strokeWidth="0.5"
              />
            ))}
            {/* Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#10b981"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-zinc-500">
          {data.map((d, i) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

