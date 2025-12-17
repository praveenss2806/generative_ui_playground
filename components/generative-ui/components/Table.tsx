'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent } from '@/lib/ui-schema';

type TableComponent = Extract<UIComponent, { type: 'table' }>;

export function Table({ component, onAction }: GenerativeComponentProps<TableComponent>) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  
  const data = component.data || [];
  const totalPages = component.pagination ? Math.ceil(data.length / pageSize) : 1;
  const displayData = component.pagination 
    ? data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : data;

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-lg font-semibold text-white">{component.title}</h3>
      )}
      
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              {component.columns.map((column) => (
                <th 
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-4 py-3 text-left text-sm font-semibold text-zinc-300"
                >
                  {column.header}
                </th>
              ))}
              {component.actions && component.actions.length > 0 && (
                <th className="px-4 py-3 text-right text-sm font-semibold text-zinc-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {displayData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-zinc-800/30 transition-colors duration-150"
              >
                {component.columns.map((column) => (
                  <td 
                    key={column.key}
                    className="px-4 py-3 text-sm text-zinc-300"
                  >
                    {row[column.key]?.toString() ?? '-'}
                  </td>
                ))}
                {component.actions && component.actions.length > 0 && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {component.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => onAction({
                            actionId: action.id,
                            actionType: action.type,
                            componentType: 'table',
                            data: { rowIndex, rowData: row },
                          })}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-colors duration-150"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {displayData.length === 0 && (
          <div className="px-4 py-8 text-center text-zinc-500">
            No data available
          </div>
        )}
      </div>

      {component.pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-zinc-500">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1.5 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1.5 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

