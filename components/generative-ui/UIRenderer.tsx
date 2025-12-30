'use client';

import { UIComponent, InteractionEvent } from '@/lib/ui-schema';
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

// Playful color palette for charts and accents
const PLAYFUL_COLORS = [
  '#FF6B9D', // Pink
  '#4ECDC4', // Blue/Teal
  '#FFE66D', // Yellow
  '#B47EFF', // Purple
  '#95E879', // Green
  '#FF8C69', // Orange
];

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
    heading: 'text-xl sm:text-2xl font-bold text-foreground',
    subheading: 'text-base sm:text-lg font-semibold text-foreground/90',
    body: 'text-sm sm:text-base text-muted-foreground',
    caption: 'text-xs sm:text-sm text-muted-foreground/70',
    code: 'font-mono text-xs sm:text-sm bg-secondary text-primary px-2 py-1 rounded-lg border border-border',
  };

  const variant = component.variant || 'body';
  const Tag = variant === 'heading' ? 'h2' : variant === 'subheading' ? 'h3' : 'p';

  // Use accent dot for headings instead of gradient text (avoids coloring emojis)
  if (variant === 'heading') {
    return (
      <Tag className={cn(variantClasses[variant], 'break-words flex items-center gap-2')}>
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-500 flex-shrink-0" />
        {component.content}
      </Tag>
    );
  }

  return (
    <Tag className={cn(variantClasses[variant], 'break-words')}>
      {component.content}
    </Tag>
  );
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
      className="font-semibold"
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
  const hasHeader = component.title || component.subtitle;
  const hasFooter = component.actions && component.actions.length > 0;

  return (
    <Card className={cn(component.variant === 'elevated' && 'shadow-soft-lg')}>
      {hasHeader && (
        <CardHeader className={hasFooter || component.content || component.children ? 'border-b border-border pb-4' : ''}>
          {component.title && (
            <CardTitle className="text-foreground font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-purple-500 flex-shrink-0" />
              <span className="truncate">{component.title}</span>
            </CardTitle>
          )}
          {component.subtitle && <CardDescription className="text-muted-foreground truncate">{component.subtitle}</CardDescription>}
        </CardHeader>
      )}
      {(component.content || component.children) && (
        <CardContent className={cn(!hasHeader && 'pt-4 sm:pt-6', !hasFooter && '')}>
          {component.content && <p className="text-muted-foreground text-sm break-words">{component.content}</p>}
          {component.children && (
            <div className="space-y-4 min-w-0">
              {component.children.map((child, idx) => renderComponent(child, onAction, idx))}
            </div>
          )}
        </CardContent>
      )}
      {hasFooter && (
        <CardFooter className="gap-2 flex-wrap border-t border-border pt-4">
          {component.actions!.map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'default'}
              className="font-semibold"
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
    default: 'bg-accent/10 border-accent/30 text-accent [&>svg]:text-accent',
    destructive: 'bg-destructive/10 border-destructive/30 text-destructive [&>svg]:text-destructive',
    success: 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 [&>svg]:text-green-500',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-500',
  };

  return (
    <Alert className={cn('border rounded-xl', variantStyles[component.variant])}>
      {icons[component.variant]}
      {component.title && <AlertTitle className="font-semibold">{component.title}</AlertTitle>}
      <AlertDescription className="opacity-90 text-sm">{component.message}</AlertDescription>
    </Alert>
  );
}

// Progress Renderer
function ProgressRenderer({ component }: { component: Extract<UIComponent, { type: 'progress' }> }) {
  const variantStyles = {
    default: '[&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-purple-500',
    success: '[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-accent',
    warning: '[&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:to-orange-500',
    error: '[&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-destructive',
  };

  return (
    <div className="space-y-2">
      {(component.label || component.showValue) && (
        <div className="flex justify-between text-sm">
          {component.label && <span className="text-muted-foreground font-medium truncate">{component.label}</span>}
          {component.showValue && <span className="font-semibold text-foreground">{component.value}%</span>}
        </div>
      )}
      <Progress 
        value={component.value} 
        className={cn(
          'h-2.5 rounded-full bg-secondary',
          variantStyles[component.variant || 'default']
        )} 
      />
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
    <Tabs defaultValue={component.defaultTab || component.tabs[0]?.id} className="w-full">
      <TabsList className="bg-muted border border-border p-1 rounded-xl w-full sm:w-auto overflow-x-auto flex-nowrap">
        {component.tabs.map((tab, idx) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft rounded-lg font-medium text-sm whitespace-nowrap"
          >
            <span className="mr-1.5">{['📊', '📝', '⚙️', '📈', '👤'][idx % 5]}</span>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {component.tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          {renderComponent(tab.content, onAction, 0)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Table Renderer - with horizontal scroll for mobile
function TableRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'table' }>;
  onAction: ActionHandler;
}) {
  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <span>📋</span>
          {component.title}
        </h3>
      )}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="rounded-xl border border-border overflow-hidden min-w-[500px] sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
                {component.columns.map((col) => (
                  <TableHead key={col.key} style={{ width: col.width }} className="text-muted-foreground font-semibold text-xs sm:text-sm">
                    {col.header}
                  </TableHead>
                ))}
                {component.actions && component.actions.length > 0 && (
                  <TableHead className="text-right text-muted-foreground font-semibold text-xs sm:text-sm">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {component.data.map((row, rowIdx) => (
                <TableRow key={rowIdx} className="border-b border-border hover:bg-muted/30">
                  {component.columns.map((col) => (
                    <TableCell key={col.key} className="text-foreground/90 font-medium text-xs sm:text-sm">
                      {String(row[col.key] ?? '')}
                    </TableCell>
                  ))}
                  {component.actions && component.actions.length > 0 && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 flex-wrap">
                        {component.actions.map((action) => (
                          <Button
                            key={action.id}
                            variant={action.variant || 'ghost'}
                            size="sm"
                            className="font-medium text-xs"
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
      </div>
    </div>
  );
}

// Divider/Separator Renderer
function DividerRenderer({ component }: { component: Extract<UIComponent, { type: 'divider' }> }) {
  if (component.label) {
    return (
      <div className="relative my-6">
        <Separator className="bg-border" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground font-medium">
          {component.label}
        </span>
      </div>
    );
  }
  return <Separator className="my-6 bg-border" />;
}

// Form Renderer - responsive layout
function FormRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'form' }>;
  onAction: ActionHandler;
}) {
  // Guard against malformed form components missing a submit action
  if (!component.submitAction) {
    console.warn('Form component missing submitAction');
    return null;
  }

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
      {component.title && (
        <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
          <span>📝</span>
          {component.title}
        </h3>
      )}
      {component.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-foreground font-medium text-sm flex items-center gap-1">
            {field.label}
            {field.required && <span className="text-primary">*</span>}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="bg-card border border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground/50 w-full"
            />
          ) : field.type === 'select' ? (
            <Select
              value={formData[field.name] as string}
              onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
            >
              <SelectTrigger className="bg-card border border-border focus:border-primary rounded-xl text-foreground w-full">
                <SelectValue placeholder={field.placeholder || 'Select...'} />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border rounded-xl">
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-muted">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'checkbox' ? (
            <div className="flex items-center space-x-3">
              <Checkbox
                id={field.name}
                checked={formData[field.name] as boolean}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, [field.name]: checked === true })
                }
                className="border border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
              className="bg-card border border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground/50 w-full"
            />
          )}
        </div>
      ))}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button type="submit" variant={component.submitAction.variant || 'default'} className="font-semibold w-full sm:w-auto">
          {component.submitAction.label}
        </Button>
        {component.cancelAction && (
          <Button
            type="button"
            variant={component.cancelAction.variant || 'outline'}
            className="font-semibold w-full sm:w-auto"
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

// Chart Renderer - responsive height
function ChartRenderer({ component }: { component: Extract<UIComponent, { type: 'chart' }> }) {
  const chartConfig: ChartConfig = {};
  const chartData = component.data.map((point, idx) => {
    const key = `data${idx}`;
    const color = point.color || PLAYFUL_COLORS[idx % PLAYFUL_COLORS.length];
    chartConfig[key] = {
      label: point.label,
      color: color,
    };
    return {
      name: point.label,
      value: point.value,
      fill: color,
    };
  });

  // Add a 'value' entry for the chart config
  chartConfig.value = { label: 'Value' };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <span>📊</span>
          {component.title}
        </h3>
      )}
      <div className="p-3 sm:p-4 rounded-xl bg-card border border-border">
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[280px] w-full min-w-0">
          {component.chartType === 'bar' ? (
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-muted-foreground text-xs" />
              <YAxis className="text-muted-foreground text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={6}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          ) : component.chartType === 'line' ? (
            <LineChart data={chartData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-muted-foreground text-xs" />
              <YAxis className="text-muted-foreground text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke="#FF6B9D" strokeWidth={2} dot={{ fill: '#FF6B9D', strokeWidth: 2 }} />
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
                innerRadius={component.chartType === 'doughnut' ? 50 : 0}
                outerRadius={80}
                strokeWidth={2}
                className="stroke-background"
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
    divided: 'divide-y divide-border',
    cards: 'space-y-3',
  };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <span>📋</span>
          {component.title}
        </h3>
      )}
      <div className={variantClasses[component.variant || 'default']}>
        {component.items.map((item, idx) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center justify-between py-3 px-2 rounded-xl transition-colors duration-200',
              component.variant === 'cards' && 'bg-card border border-border p-4 hover:border-primary/30',
              component.variant !== 'cards' && 'hover:bg-muted/50'
            )}
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {item.icon ? (
                <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
              ) : (
                <div 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: PLAYFUL_COLORS[idx % PLAYFUL_COLORS.length] }}
                />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm sm:text-base truncate">{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.subtitle}</p>
                )}
              </div>
            </div>
            {item.actions && item.actions.length > 0 && (
              <div className="flex gap-2 flex-shrink-0 ml-2">
                {item.actions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant || 'ghost'}
                    size="sm"
                    className="font-medium text-xs"
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

// Grid Renderer - responsive columns
function GridRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'grid' }>;
  onAction: ActionHandler;
}) {
  const gapClasses = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
  const columns = component.columns || 2;
  
  // Responsive column classes
  const getColumnClasses = (cols: number) => {
    if (cols >= 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    if (cols === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (cols === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1';
  };

  return (
    <div
      className={cn('grid', gapClasses[component.gap || 'md'], getColumnClasses(columns))}
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
  const gapClasses = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
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
        'flex flex-wrap',
        directionClasses[component.direction || 'column'],
        gapClasses[component.gap || 'md'],
        alignClasses[component.align || 'stretch'],
        justifyClasses[component.justify || 'start']
      )}
    >
      {component.children.map((child, idx) => (
        <div key={idx} className="min-w-0">
          {renderComponent(child, onAction, idx)}
        </div>
      ))}
    </div>
  );
}

// Image Renderer
function ImageRenderer({ component }: { component: Extract<UIComponent, { type: 'image' }> }) {
  return (
    <div className={cn(
      'overflow-hidden',
      component.rounded && 'rounded-2xl border border-border'
    )}>
      <img
        src={component.src}
        alt={component.alt}
        width={component.width}
        height={component.height}
        className="max-w-full h-auto"
      />
    </div>
  );
}

// Stat Renderer
function StatRenderer({ component }: { component: Extract<UIComponent, { type: 'stat' }> }) {
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-primary',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center gap-3 sm:gap-4">
          {component.icon && (
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
              <span className="text-2xl sm:text-3xl">{component.icon}</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{component.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{component.value}</p>
            {component.change && (
              <p className={cn('text-xs sm:text-sm font-semibold', changeColors[component.changeType || 'neutral'])}>
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
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
      {component.icon && (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-5 sm:mb-6">
          <span className="text-4xl sm:text-5xl">{component.icon}</span>
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-foreground">{component.title}</h3>
      {component.description && (
        <p className="text-muted-foreground mt-2 max-w-sm text-sm sm:text-base">{component.description}</p>
      )}
      {component.action && (
        <Button
          className="mt-5 sm:mt-6 font-semibold"
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
    <div className="space-y-5 sm:space-y-6 min-w-0 w-full">
      {components.map((component, index) => (
        <div 
          key={index} 
          className="animate-fadeIn min-w-0"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {renderComponent(component, onAction, index)}
        </div>
      ))}
    </div>
  );
}

// Loading skeleton
export function UIRendererSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-5 sm:h-6 w-40 sm:w-48 rounded-lg bg-muted animate-pulse" />
          <div className="h-3 sm:h-4 w-28 sm:w-32 rounded-lg bg-muted/60 animate-pulse" />
        </div>
      </div>
      
      {/* Card skeleton */}
      <div className="rounded-xl border border-border p-4 sm:p-6 space-y-4 bg-card">
        <div className="h-4 sm:h-5 w-3/4 rounded-lg bg-muted animate-pulse" />
        <div className="h-20 sm:h-24 rounded-xl bg-muted/60 animate-pulse" />
        <div className="flex gap-3 flex-wrap">
          <div className="h-9 sm:h-10 w-20 sm:w-24 rounded-xl bg-primary/20 animate-pulse" />
          <div className="h-9 sm:h-10 w-20 sm:w-24 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>

      {/* Stats skeleton - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border p-4 bg-card animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="h-3 sm:h-4 w-16 rounded bg-muted/60 mb-2" />
            <div className="h-7 sm:h-8 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
