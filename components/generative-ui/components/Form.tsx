'use client';

import { useState } from 'react';
import { GenerativeComponentProps } from '../registry';
import { UIComponent, FormField } from '@/lib/ui-schema';

type FormComponent = Extract<UIComponent, { type: 'form' }>;

function FormFieldInput({ 
  field, 
  value, 
  onChange 
}: { 
  field: FormField; 
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}) {
  const baseInputClass = `
    w-full px-4 py-2.5 rounded-lg
    bg-zinc-800/50 border border-zinc-700
    text-white placeholder-zinc-500
    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
    transition-all duration-200
  `;

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={4}
        className={`${baseInputClass} resize-none`}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        className={baseInputClass}
      >
        <option value="" disabled>Select an option</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-emerald-500/50"
        />
        <span className="text-zinc-300">{field.placeholder || field.label}</span>
      </label>
    );
  }

  return (
    <input
      type={field.type}
      value={value as string}
      onChange={(e) => {
        const val = field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        onChange(val);
      }}
      placeholder={field.placeholder}
      required={field.required}
      className={baseInputClass}
    />
  );
}

export function Form({ component, onAction }: GenerativeComponentProps<FormComponent>) {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>(() => {
    const initial: Record<string, string | number | boolean> = {};
    component.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initial[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initial[field.name] = false;
      } else if (field.type === 'number') {
        initial[field.name] = 0;
      } else {
        initial[field.name] = '';
      }
    });
    return initial;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAction({
      actionId: component.submitAction.id,
      actionType: 'submit',
      componentType: 'form',
      data: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {component.title && (
        <h3 className="text-lg font-semibold text-white mb-4">{component.title}</h3>
      )}
      
      {component.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {field.type !== 'checkbox' && (
            <label className="block text-sm font-medium text-zinc-300">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
          )}
          <FormFieldInput
            field={field}
            value={formData[field.name]}
            onChange={(value) => setFormData((prev) => ({ ...prev, [field.name]: value }))}
          />
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 active:scale-95"
        >
          {component.submitAction.label}
        </button>
        {component.cancelAction && (
          <button
            type="button"
            onClick={() => onAction({
              actionId: component.cancelAction!.id,
              actionType: 'click',
              componentType: 'form',
            })}
            className="px-5 py-2.5 rounded-lg font-medium bg-zinc-700 hover:bg-zinc-600 text-white transition-all duration-200"
          >
            {component.cancelAction.label}
          </button>
        )}
      </div>
    </form>
  );
}

