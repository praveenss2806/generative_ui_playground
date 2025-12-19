import { z } from 'zod';

// Base action schema for interactive elements
export const ActionSchema = z.object({
  id: z.string().describe('Unique identifier for this action'),
  label: z.string().describe('Display label for the action'),
  type: z.enum(['click', 'submit', 'change', 'navigate']).describe('Type of action'),
  variant: z.enum(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']).optional().describe('Visual variant'),
});

export type Action = z.infer<typeof ActionSchema>;

// Form field schema
export const FormFieldSchema = z.object({
  name: z.string().describe('Field name/key'),
  label: z.string().describe('Display label'),
  type: z.enum(['text', 'email', 'password', 'number', 'textarea', 'select', 'checkbox', 'date']),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).optional().describe('Options for select fields'),
  defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

export type FormField = z.infer<typeof FormFieldSchema>;

// Table column schema
export const TableColumnSchema = z.object({
  key: z.string().describe('Data key for this column'),
  header: z.string().describe('Column header text'),
  width: z.string().optional().describe('Column width (e.g., "200px", "25%")'),
});

export type TableColumn = z.infer<typeof TableColumnSchema>;

// Chart data point schema
export const ChartDataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().optional(),
});

export type ChartDataPoint = z.infer<typeof ChartDataPointSchema>;

// List item schema
export const ListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  icon: z.string().optional(),
  actions: z.array(ActionSchema).optional(),
});

export type ListItem = z.infer<typeof ListItemSchema>;

// Individual component schemas (non-recursive ones first)
export const TextComponentSchema = z.object({
  type: z.literal('text'),
  content: z.string().describe('Text content to display'),
  variant: z.enum(['heading', 'subheading', 'body', 'caption', 'code']).optional(),
});

export const ButtonComponentSchema = z.object({
  type: z.literal('button'),
  label: z.string(),
  action: ActionSchema,
  variant: z.enum(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']).optional(),
  disabled: z.boolean().optional(),
  loading: z.boolean().optional(),
});

export const FormComponentSchema = z.object({
  type: z.literal('form'),
  title: z.string().optional(),
  fields: z.array(FormFieldSchema),
  submitAction: ActionSchema,
  cancelAction: ActionSchema.optional(),
});

export const TableComponentSchema = z.object({
  type: z.literal('table'),
  title: z.string().optional(),
  columns: z.array(TableColumnSchema),
  data: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
  actions: z.array(ActionSchema).optional().describe('Row-level actions'),
  pagination: z.boolean().optional(),
});

export const ChartComponentSchema = z.object({
  type: z.literal('chart'),
  title: z.string().optional(),
  chartType: z.enum(['bar', 'line', 'pie', 'doughnut']),
  data: z.array(ChartDataPointSchema),
  xLabel: z.string().optional(),
  yLabel: z.string().optional(),
});

export const ListComponentSchema = z.object({
  type: z.literal('list'),
  title: z.string().optional(),
  items: z.array(ListItemSchema),
  variant: z.enum(['default', 'divided', 'cards']).optional(),
});

export const ImageComponentSchema = z.object({
  type: z.literal('image'),
  src: z.string().describe('Image URL'),
  alt: z.string().describe('Alt text for accessibility'),
  width: z.number().optional(),
  height: z.number().optional(),
  rounded: z.boolean().optional(),
});

export const DividerComponentSchema = z.object({
  type: z.literal('divider'),
  label: z.string().optional().describe('Optional label in the middle of divider'),
});

export const StatComponentSchema = z.object({
  type: z.literal('stat'),
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.string().optional().describe('e.g., "+12%" or "-5%"'),
  changeType: z.enum(['positive', 'negative', 'neutral']).optional(),
  icon: z.string().optional(),
});

export const AlertComponentSchema = z.object({
  type: z.literal('alert'),
  message: z.string(),
  variant: z.enum(['default', 'destructive', 'success', 'warning']),
  title: z.string().optional(),
  dismissible: z.boolean().optional(),
});

export const ProgressComponentSchema = z.object({
  type: z.literal('progress'),
  value: z.number().min(0).max(100),
  label: z.string().optional(),
  showValue: z.boolean().optional(),
  variant: z.enum(['default', 'success', 'warning', 'error']).optional(),
});

export const EmptyStateComponentSchema = z.object({
  type: z.literal('empty'),
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  action: ActionSchema.optional(),
});

// Define the base UIComponent type manually to handle recursion
type TextComponent = z.infer<typeof TextComponentSchema>;
type ButtonComponent = z.infer<typeof ButtonComponentSchema>;
type FormComponent = z.infer<typeof FormComponentSchema>;
type TableComponent = z.infer<typeof TableComponentSchema>;
type ChartComponent = z.infer<typeof ChartComponentSchema>;
type ListComponent = z.infer<typeof ListComponentSchema>;
type ImageComponent = z.infer<typeof ImageComponentSchema>;
type DividerComponent = z.infer<typeof DividerComponentSchema>;
type StatComponent = z.infer<typeof StatComponentSchema>;
type AlertComponent = z.infer<typeof AlertComponentSchema>;
type ProgressComponent = z.infer<typeof ProgressComponentSchema>;
type EmptyStateComponent = z.infer<typeof EmptyStateComponentSchema>;

// Recursive component types
type CardComponent = {
  type: 'card';
  title?: string;
  subtitle?: string;
  content?: string;
  children?: UIComponent[];
  actions?: Action[];
  variant?: 'default' | 'outlined' | 'elevated';
};

type TabsComponent = {
  type: 'tabs';
  tabs: Array<{
    id: string;
    label: string;
    content: UIComponent;
  }>;
  defaultTab?: string;
};

type GridComponent = {
  type: 'grid';
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  children: UIComponent[];
};

type ContainerComponent = {
  type: 'container';
  children: UIComponent[];
  direction?: 'row' | 'column';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
};

// Union type of all components
export type UIComponent =
  | TextComponent
  | ButtonComponent
  | FormComponent
  | TableComponent
  | ChartComponent
  | ListComponent
  | ImageComponent
  | DividerComponent
  | StatComponent
  | AlertComponent
  | ProgressComponent
  | EmptyStateComponent
  | CardComponent
  | TabsComponent
  | GridComponent
  | ContainerComponent;

// Create the recursive schemas using z.lazy
const BaseUIComponentSchema: z.ZodType<UIComponent> = z.lazy(() =>
  z.union([
    TextComponentSchema,
    ButtonComponentSchema,
    FormComponentSchema,
    TableComponentSchema,
    ChartComponentSchema,
    ListComponentSchema,
    ImageComponentSchema,
    DividerComponentSchema,
    StatComponentSchema,
    AlertComponentSchema,
    ProgressComponentSchema,
    EmptyStateComponentSchema,
    // Recursive schemas defined inline
    z.object({
      type: z.literal('card'),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      content: z.string().optional(),
      children: z.array(z.lazy(() => BaseUIComponentSchema)).optional(),
      actions: z.array(ActionSchema).optional(),
      variant: z.enum(['default', 'outlined', 'elevated']).optional(),
    }),
    z.object({
      type: z.literal('tabs'),
      tabs: z.array(z.object({
        id: z.string(),
        label: z.string(),
        content: z.lazy(() => BaseUIComponentSchema),
      })),
      defaultTab: z.string().optional(),
    }),
    z.object({
      type: z.literal('grid'),
      columns: z.number().min(1).max(6).optional(),
      gap: z.enum(['sm', 'md', 'lg']).optional(),
      children: z.array(z.lazy(() => BaseUIComponentSchema)),
    }),
    z.object({
      type: z.literal('container'),
      children: z.array(z.lazy(() => BaseUIComponentSchema)),
      direction: z.enum(['row', 'column']).optional(),
      gap: z.enum(['sm', 'md', 'lg']).optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
      justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
    }),
  ])
);

export const UIComponentSchema = BaseUIComponentSchema;

// The complete UI response from the LLM
export const GeneratedUISchema = z.object({
  ui: z.array(UIComponentSchema).describe('Array of UI components to render'),
  message: z.string().optional().describe('Optional message to display in chat'),
});

export type GeneratedUI = z.infer<typeof GeneratedUISchema>;

// Interaction event sent back to LLM
export interface InteractionEvent {
  actionId: string;
  actionType: Action['type'];
  componentType: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

// Conversation message type
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ui?: UIComponent[];
  timestamp: number;
}
