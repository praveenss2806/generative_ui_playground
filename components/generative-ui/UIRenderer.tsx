'use client';

import { UIComponent, InteractionEvent, Action } from '@/lib/ui-schema';
import { cn } from '@/lib/utils';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Loader2, AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

type ActionHandler = (event: Omit<InteractionEvent, 'timestamp'>) => void;

interface UIRendererProps {
  components: UIComponent[];
  onAction: ActionHandler;
}

// Helper to render a component recursively
function renderComponent(
  component: UIComponent,
  onAction: ActionHandler,
  index: number
): React.ReactNode {
  switch (component.type) {
    case 'text':
      return <TextRenderer key={index} component={component} />;
    case 'button':
      return <ButtonRenderer key={index} component={component} onAction={onAction} />;
    case 'card':
      return <CardRenderer key={index} component={component} onAction={onAction} />;
    case 'alert':
      return <AlertRenderer key={index} component={component} />;
    case 'progress':
      return <ProgressRenderer key={index} component={component} />;
    case 'tabs':
      return <TabsRenderer key={index} component={component} onAction={onAction} />;
    case 'table':
      return <TableRenderer key={index} component={component} onAction={onAction} />;
    case 'divider':
      return <DividerRenderer key={index} component={component} />;
    case 'form':
      return <FormRenderer key={index} component={component} onAction={onAction} />;
    case 'chart':
      return <ChartRenderer key={index} component={component} />;
    case 'list':
      return <ListRenderer key={index} component={component} onAction={onAction} />;
    case 'grid':
      return <GridRenderer key={index} component={component} onAction={onAction} />;
    case 'container':
      return <ContainerRenderer key={index} component={component} onAction={onAction} />;
    case 'image':
      return <ImageRenderer key={index} component={component} />;
    case 'stat':
      return <StatRenderer key={index} component={component} />;
    case 'empty':
      return <EmptyRenderer key={index} component={component} onAction={onAction} />;
    default:
      console.warn('Unknown component type:', (component as UIComponent).type);
      return null;
  }
}

// Text Renderer
function TextRenderer({ component }: { component: Extract<UIComponent, { type: 'text' }> }) {
  const variantClasses = {
    heading: 'text-2xl font-bold text-foreground',
    subheading: 'text-lg font-semibold text-foreground',
    body: 'text-base text-muted-foreground',
    caption: 'text-sm text-muted-foreground',
    code: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded',
  };

  const variant = component.variant || 'body';
  const Tag = variant === 'heading' ? 'h2' : variant === 'subheading' ? 'h3' : 'p';

  return <Tag className={variantClasses[variant]}>{component.content}</Tag>;
}

// Button Renderer
function ButtonRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'button' }>;
  onAction: ActionHandler;
}) {
  const isDisabled = component.disabled || component.loading;

  return (
    <Button
      variant={component.variant || 'default'}
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          onAction({
            actionId: component.action.id,
            actionType: component.action.type,
            componentType: 'button',
          });
        }
      }}
    >
      {component.loading && <Loader2 className="animate-spin" />}
      {component.label}
    </Button>
  );
}

// Card Renderer
function CardRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'card' }>;
  onAction: ActionHandler;
}) {
  return (
    <Card className={cn(component.variant === 'elevated' && 'shadow-lg')}>
      {(component.title || component.subtitle) && (
        <CardHeader>
          {component.title && <CardTitle>{component.title}</CardTitle>}
          {component.subtitle && <CardDescription>{component.subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {component.content && <p className="text-muted-foreground">{component.content}</p>}
        {component.children && (
          <div className="space-y-4">
            {component.children.map((child, idx) => renderComponent(child, onAction, idx))}
          </div>
        )}
      </CardContent>
      {component.actions && component.actions.length > 0 && (
        <CardFooter className="gap-2">
          {component.actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'default'}
              onClick={() =>
                onAction({
                  actionId: action.id,
                  actionType: action.type,
                  componentType: 'card',
                })
              }
            >
              {action.label}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}

// Alert Renderer
function AlertRenderer({ component }: { component: Extract<UIComponent, { type: 'alert' }> }) {
  const icons = {
    default: <Info className="h-4 w-4" />,
    destructive: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
  };

  const variantStyles = {
    default: '',
    destructive: '',
    success: 'border-green-500/50 text-green-600 [&>svg]:text-green-600',
    warning: 'border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600',
  };

  const shadcnVariant = component.variant === 'destructive' ? 'destructive' : 'default';

  return (
    <Alert variant={shadcnVariant} className={variantStyles[component.variant]}>
      {icons[component.variant]}
      {component.title && <AlertTitle>{component.title}</AlertTitle>}
      <AlertDescription>{component.message}</AlertDescription>
    </Alert>
  );
}

// Progress Renderer
function ProgressRenderer({ component }: { component: Extract<UIComponent, { type: 'progress' }> }) {
  const variantStyles = {
    default: '',
    success: '[&>div]:bg-green-500',
    warning: '[&>div]:bg-yellow-500',
    error: '[&>div]:bg-red-500',
  };

  return (
    <div className="space-y-2">
      {(component.label || component.showValue) && (
        <div className="flex justify-between text-sm">
          {component.label && <span className="text-muted-foreground">{component.label}</span>}
          {component.showValue && <span className="font-medium">{component.value}%</span>}
        </div>
      )}
      <Progress value={component.value} className={variantStyles[component.variant || 'default']} />
    </div>
  );
}

// Tabs Renderer
function TabsRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'tabs' }>;
  onAction: ActionHandler;
}) {
  return (
    <Tabs defaultValue={component.defaultTab || component.tabs[0]?.id}>
      <TabsList>
        {component.tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {component.tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {renderComponent(tab.content, onAction, 0)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Table Renderer
function TableRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'table' }>;
  onAction: ActionHandler;
}) {
  return (
    <div className="space-y-4">
      {component.title && <h3 className="text-lg font-semibold">{component.title}</h3>}
      <Table>
        <TableHeader>
          <TableRow>
            {component.columns.map((col) => (
              <TableHead key={col.key} style={{ width: col.width }}>
                {col.header}
              </TableHead>
            ))}
            {component.actions && component.actions.length > 0 && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {component.data.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {component.columns.map((col) => (
                <TableCell key={col.key}>{String(row[col.key] ?? '')}</TableCell>
              ))}
              {component.actions && component.actions.length > 0 && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {component.actions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        onClick={() =>
                          onAction({
                            actionId: action.id,
                            actionType: action.type,
                            componentType: 'table',
                            data: { rowIndex: rowIdx, rowData: row },
                          })
                        }
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Divider/Separator Renderer
function DividerRenderer({ component }: { component: Extract<UIComponent, { type: 'divider' }> }) {
  if (component.label) {
    return (
      <div className="relative my-4">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          {component.label}
        </span>
      </div>
    );
  }
  return <Separator className="my-4" />;
}

// Form Renderer
function FormRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'form' }>;
  onAction: ActionHandler;
}) {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>(() => {
    const initial: Record<string, string | number | boolean> = {};
    component.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initial[field.name] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initial[field.name] = false;
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
      actionType: component.submitAction.type,
      componentType: 'form',
      data: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {component.title && <h3 className="text-lg font-semibold">{component.title}</h3>}
      {component.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          ) : field.type === 'select' ? (
            <Select
              value={formData[field.name] as string}
              onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || 'Select...'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'checkbox' ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.name}
                checked={formData[field.name] as boolean}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, [field.name]: checked === true })
                }
              />
            </div>
          ) : (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <Button type="submit" variant={component.submitAction.variant || 'default'}>
          {component.submitAction.label}
        </Button>
        {component.cancelAction && (
          <Button
            type="button"
            variant={component.cancelAction.variant || 'outline'}
            onClick={() =>
              onAction({
                actionId: component.cancelAction!.id,
                actionType: component.cancelAction!.type,
                componentType: 'form',
              })
            }
          >
            {component.cancelAction.label}
          </Button>
        )}
      </div>
    </form>
  );
}

// Chart Renderer
function ChartRenderer({ component }: { component: Extract<UIComponent, { type: 'chart' }> }) {
  const chartConfig: ChartConfig = {};
  const chartData = component.data.map((point, idx) => {
    const key = `data${idx}`;
    chartConfig[key] = {
      label: point.label,
      color: point.color || `hsl(var(--chart-${(idx % 5) + 1}))`,
    };
    return {
      name: point.label,
      value: point.value,
      fill: point.color || `hsl(var(--chart-${(idx % 5) + 1}))`,
    };
  });

  // Add a 'value' entry for the chart config
  chartConfig.value = { label: 'Value' };

  return (
    <div className="space-y-4">
      {component.title && <h3 className="text-lg font-semibold">{component.title}</h3>}
      <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-0">
        {component.chartType === 'bar' ? (
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={4}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        ) : component.chartType === 'line' ? (
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} />
          </LineChart>
        ) : (
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={component.chartType === 'doughnut' ? 60 : 0}
              outerRadius={80}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        )}
      </ChartContainer>
    </div>
  );
}

// List Renderer
function ListRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'list' }>;
  onAction: ActionHandler;
}) {
  const variantClasses = {
    default: 'space-y-2',
    divided: 'divide-y',
    cards: 'space-y-3',
  };

  return (
    <div className="space-y-4">
      {component.title && <h3 className="text-lg font-semibold">{component.title}</h3>}
      <div className={variantClasses[component.variant || 'default']}>
        {component.items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center justify-between py-2',
              component.variant === 'cards' && 'rounded-lg border p-4'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <div>
                <p className="font-medium">{item.title}</p>
                {item.subtitle && (
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                )}
              </div>
            </div>
            {item.actions && item.actions.length > 0 && (
              <div className="flex gap-2">
                {item.actions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant || 'ghost'}
                    size="sm"
                    onClick={() =>
                      onAction({
                        actionId: action.id,
                        actionType: action.type,
                        componentType: 'list',
                        data: { itemId: item.id },
                      })
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Grid Renderer
function GridRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'grid' }>;
  onAction: ActionHandler;
}) {
  const gapClasses = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
  const columns = component.columns || 2;

  return (
    <div
      className={cn('grid', gapClasses[component.gap || 'md'])}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {component.children.map((child, idx) => renderComponent(child, onAction, idx))}
    </div>
  );
}

// Container Renderer
function ContainerRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'container' }>;
  onAction: ActionHandler;
}) {
  const directionClasses = { row: 'flex-row', column: 'flex-col' };
  const gapClasses = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
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
    <div
      className={cn(
        'flex',
        directionClasses[component.direction || 'column'],
        gapClasses[component.gap || 'md'],
        alignClasses[component.align || 'stretch'],
        justifyClasses[component.justify || 'start']
      )}
    >
      {component.children.map((child, idx) => renderComponent(child, onAction, idx))}
    </div>
  );
}

// Image Renderer
function ImageRenderer({ component }: { component: Extract<UIComponent, { type: 'image' }> }) {
  return (
    <img
      src={component.src}
      alt={component.alt}
      width={component.width}
      height={component.height}
      className={cn('max-w-full', component.rounded && 'rounded-lg')}
    />
  );
}

// Stat Renderer
function StatRenderer({ component }: { component: Extract<UIComponent, { type: 'stat' }> }) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          {component.icon && <span className="text-2xl">{component.icon}</span>}
          <div>
            <p className="text-sm text-muted-foreground">{component.label}</p>
            <p className="text-2xl font-bold">{component.value}</p>
            {component.change && (
              <p className={cn('text-sm', changeColors[component.changeType || 'neutral'])}>
                {component.change}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Empty State Renderer
function EmptyRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'empty' }>;
  onAction: ActionHandler;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {component.icon && <span className="text-4xl mb-4">{component.icon}</span>}
      <h3 className="text-lg font-semibold">{component.title}</h3>
      {component.description && (
        <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
      )}
      {component.action && (
        <Button
          className="mt-4"
          variant={component.action.variant || 'default'}
          onClick={() =>
            onAction({
              actionId: component.action!.id,
              actionType: component.action!.type,
              componentType: 'empty',
            })
          }
        >
          {component.action.label}
        </Button>
      )}
    </div>
  );
}

// Main UIRenderer component
export function UIRenderer({ components, onAction }: UIRendererProps) {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 min-w-0">
      {components.map((component, index) => (
        <div key={index} className="animate-in fade-in-0 duration-300">
          {renderComponent(component, onAction, index)}
          </div>
      ))}
    </div>
  );
}

// Loading skeleton for when UI is being generated
export function UIRendererSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded-lg w-3/4" />
      <div className="h-32 bg-muted rounded-xl" />
      <div className="flex gap-3">
        <div className="h-10 bg-muted rounded-lg w-24" />
        <div className="h-10 bg-muted rounded-lg w-24" />
      </div>
    </div>
  );
}
