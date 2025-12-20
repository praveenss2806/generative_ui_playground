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

// Text Renderer - Playful version
function TextRenderer({ component }: { component: Extract<UIComponent, { type: 'text' }> }) {
  const variantClasses = {
    heading: 'text-2xl font-extrabold text-white',
    subheading: 'text-lg font-bold text-white/90',
    body: 'text-base text-[#A0A0C0]',
    caption: 'text-sm text-[#A0A0C0]/70',
    code: 'font-mono text-sm bg-[#B47EFF]/20 text-[#B47EFF] px-2 py-1 rounded-lg border border-[#B47EFF]/30',
  };

  const variant = component.variant || 'body';
  const Tag = variant === 'heading' ? 'h2' : variant === 'subheading' ? 'h3' : 'p';

  return (
    <Tag className={cn(variantClasses[variant], variant === 'heading' && 'gradient-text')}>
      {component.content}
    </Tag>
  );
}

// Button Renderer - Playful version
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
      className="font-bold"
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

// Card Renderer - Playful version
function CardRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'card' }>;
  onAction: ActionHandler;
}) {
  return (
    <Card className={cn(
      'overflow-hidden',
      component.variant === 'elevated' && 'shadow-playful-lg'
    )}>
      {(component.title || component.subtitle) && (
        <CardHeader className="border-b border-[#B47EFF]/10">
          {component.title && (
            <CardTitle className="text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#B47EFF]" />
              {component.title}
            </CardTitle>
          )}
          {component.subtitle && <CardDescription className="text-[#A0A0C0]">{component.subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="pt-4">
        {component.content && <p className="text-[#A0A0C0]">{component.content}</p>}
        {component.children && (
          <div className="space-y-4">
            {component.children.map((child, idx) => renderComponent(child, onAction, idx))}
          </div>
        )}
      </CardContent>
      {component.actions && component.actions.length > 0 && (
        <CardFooter className="gap-2 border-t border-[#B47EFF]/10 pt-4">
          {component.actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant || 'default'}
              className="font-bold"
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

// Alert Renderer - Playful version with vibrant colors
function AlertRenderer({ component }: { component: Extract<UIComponent, { type: 'alert' }> }) {
  const icons = {
    default: <Info className="h-5 w-5" />,
    destructive: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
  };

  const variantStyles = {
    default: 'bg-[#4ECDC4]/10 border-[#4ECDC4]/30 text-[#4ECDC4] [&>svg]:text-[#4ECDC4]',
    destructive: 'bg-[#FF6B9D]/10 border-[#FF6B9D]/30 text-[#FF6B9D] [&>svg]:text-[#FF6B9D]',
    success: 'bg-[#95E879]/10 border-[#95E879]/30 text-[#95E879] [&>svg]:text-[#95E879]',
    warning: 'bg-[#FFE66D]/10 border-[#FFE66D]/30 text-[#FFE66D] [&>svg]:text-[#FFE66D]',
  };

  return (
    <Alert className={cn('border-2 rounded-xl', variantStyles[component.variant])}>
      {icons[component.variant]}
      {component.title && <AlertTitle className="font-bold">{component.title}</AlertTitle>}
      <AlertDescription className="opacity-90">{component.message}</AlertDescription>
    </Alert>
  );
}

// Progress Renderer - Playful gradient version
function ProgressRenderer({ component }: { component: Extract<UIComponent, { type: 'progress' }> }) {
  const variantStyles = {
    default: '[&>div]:bg-gradient-to-r [&>div]:from-[#FF6B9D] [&>div]:to-[#B47EFF]',
    success: '[&>div]:bg-gradient-to-r [&>div]:from-[#95E879] [&>div]:to-[#4ECDC4]',
    warning: '[&>div]:bg-gradient-to-r [&>div]:from-[#FFE66D] [&>div]:to-[#FF8C69]',
    error: '[&>div]:bg-gradient-to-r [&>div]:from-[#FF6B9D] [&>div]:to-[#FF6B6B]',
  };

  return (
    <div className="space-y-2">
      {(component.label || component.showValue) && (
        <div className="flex justify-between text-sm">
          {component.label && <span className="text-[#A0A0C0] font-medium">{component.label}</span>}
          {component.showValue && <span className="font-bold text-white">{component.value}%</span>}
        </div>
      )}
      <Progress 
        value={component.value} 
        className={cn(
          'h-3 rounded-full bg-[#252542]',
          variantStyles[component.variant || 'default']
        )} 
      />
    </div>
  );
}

// Tabs Renderer - Playful version
function TabsRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'tabs' }>;
  onAction: ActionHandler;
}) {
  return (
    <Tabs defaultValue={component.defaultTab || component.tabs[0]?.id} className="w-full">
      <TabsList className="bg-[#252542] border-2 border-[#B47EFF]/20 p-1 rounded-xl">
        {component.tabs.map((tab, idx) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B9D] data-[state=active]:to-[#B47EFF] data-[state=active]:text-white rounded-lg font-bold"
          >
            <span className="mr-2">{['📊', '📝', '⚙️', '📈', '👤'][idx % 5]}</span>
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

// Table Renderer - Playful version
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
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📋</span>
          {component.title}
        </h3>
      )}
      <div className="rounded-xl border-2 border-[#B47EFF]/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#252542] border-b-2 border-[#B47EFF]/20 hover:bg-[#252542]">
              {component.columns.map((col) => (
                <TableHead key={col.key} style={{ width: col.width }} className="text-[#A0A0C0] font-bold">
                  {col.header}
                </TableHead>
              ))}
              {component.actions && component.actions.length > 0 && (
                <TableHead className="text-right text-[#A0A0C0] font-bold">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {component.data.map((row, rowIdx) => (
              <TableRow key={rowIdx} className="border-b border-[#B47EFF]/10 hover:bg-[#B47EFF]/5">
                {component.columns.map((col) => (
                  <TableCell key={col.key} className="text-white/90 font-medium">
                    {String(row[col.key] ?? '')}
                  </TableCell>
                ))}
                {component.actions && component.actions.length > 0 && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {component.actions.map((action) => (
                        <Button
                          key={action.id}
                          variant={action.variant || 'ghost'}
                          size="sm"
                          className="font-bold"
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
  );
}

// Divider/Separator Renderer - Playful gradient version
function DividerRenderer({ component }: { component: Extract<UIComponent, { type: 'divider' }> }) {
  if (component.label) {
    return (
      <div className="relative my-6">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#B47EFF]/30 to-transparent" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A2E] px-4 text-sm text-[#A0A0C0] font-medium">
          {component.label}
        </span>
      </div>
    );
  }
  return <div className="my-6 h-[2px] bg-gradient-to-r from-transparent via-[#B47EFF]/30 to-transparent" />;
}

// Form Renderer - Playful version
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {component.title && (
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📝</span>
          {component.title}
        </h3>
      )}
      {component.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-white font-semibold flex items-center gap-1">
            {field.label}
            {field.required && <span className="text-[#FF6B9D]">*</span>}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="bg-[#252542] border-2 border-[#B47EFF]/20 focus:border-[#FF6B9D] rounded-xl text-white placeholder:text-[#A0A0C0]/50"
            />
          ) : field.type === 'select' ? (
            <Select
              value={formData[field.name] as string}
              onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
            >
              <SelectTrigger className="bg-[#252542] border-2 border-[#B47EFF]/20 focus:border-[#FF6B9D] rounded-xl text-white">
                <SelectValue placeholder={field.placeholder || 'Select...'} />
              </SelectTrigger>
              <SelectContent className="bg-[#252542] border-2 border-[#B47EFF]/20 rounded-xl">
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-white focus:bg-[#B47EFF]/20">
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
                className="border-2 border-[#B47EFF]/30 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FF6B9D] data-[state=checked]:to-[#B47EFF]"
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
              className="bg-[#252542] border-2 border-[#B47EFF]/20 focus:border-[#FF6B9D] rounded-xl text-white placeholder:text-[#A0A0C0]/50"
            />
          )}
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant={component.submitAction.variant || 'default'} className="font-bold">
          {component.submitAction.label}
        </Button>
        {component.cancelAction && (
          <Button
            type="button"
            variant={component.cancelAction.variant || 'outline'}
            className="font-bold"
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

// Chart Renderer - Playful colors
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
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📊</span>
          {component.title}
        </h3>
      )}
      <div className="p-4 rounded-xl bg-[#252542]/50 border-2 border-[#B47EFF]/20">
        <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-0">
          {component.chartType === 'bar' ? (
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" stroke="#B47EFF20" />
              <XAxis dataKey="name" stroke="#A0A0C0" />
              <YAxis stroke="#A0A0C0" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={8}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          ) : component.chartType === 'line' ? (
            <LineChart data={chartData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" stroke="#B47EFF20" />
              <XAxis dataKey="name" stroke="#A0A0C0" />
              <YAxis stroke="#A0A0C0" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="value" stroke="#FF6B9D" strokeWidth={3} dot={{ fill: '#FF6B9D', strokeWidth: 2 }} />
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
                outerRadius={100}
                strokeWidth={3}
                stroke="#1A1A2E"
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

// List Renderer - Playful version
function ListRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'list' }>;
  onAction: ActionHandler;
}) {
  const variantClasses = {
    default: 'space-y-2',
    divided: 'divide-y divide-[#B47EFF]/10',
    cards: 'space-y-3',
  };

  return (
    <div className="space-y-4">
      {component.title && (
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
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
              component.variant === 'cards' && 'bg-[#252542]/50 border-2 border-[#B47EFF]/20 p-4 hover:border-[#FF6B9D]/30',
              component.variant !== 'cards' && 'hover:bg-[#B47EFF]/5'
            )}
          >
            <div className="flex items-center gap-4">
              {item.icon ? (
                <span className="text-2xl">{item.icon}</span>
              ) : (
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: PLAYFUL_COLORS[idx % PLAYFUL_COLORS.length] }}
                />
              )}
              <div>
                <p className="font-bold text-white">{item.title}</p>
                {item.subtitle && (
                  <p className="text-sm text-[#A0A0C0]">{item.subtitle}</p>
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
                    className="font-bold"
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
  const gapClasses = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
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

// Image Renderer - Playful border
function ImageRenderer({ component }: { component: Extract<UIComponent, { type: 'image' }> }) {
  return (
    <div className={cn(
      'overflow-hidden',
      component.rounded && 'rounded-2xl border-2 border-[#B47EFF]/20'
    )}>
      <img
        src={component.src}
        alt={component.alt}
        width={component.width}
        height={component.height}
        className="max-w-full"
      />
    </div>
  );
}

// Stat Renderer - Playful colorful version
function StatRenderer({ component }: { component: Extract<UIComponent, { type: 'stat' }> }) {
  const changeColors = {
    positive: 'text-[#95E879]',
    negative: 'text-[#FF6B9D]',
    neutral: 'text-[#A0A0C0]',
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          {component.icon && (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B9D]/20 to-[#B47EFF]/20 flex items-center justify-center border-2 border-[#B47EFF]/20">
              <span className="text-3xl">{component.icon}</span>
            </div>
          )}
          <div>
            <p className="text-sm text-[#A0A0C0] font-medium">{component.label}</p>
            <p className="text-3xl font-extrabold text-white">{component.value}</p>
            {component.change && (
              <p className={cn('text-sm font-bold', changeColors[component.changeType || 'neutral'])}>
                {component.change}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Empty State Renderer - Playful version
function EmptyRenderer({
  component,
  onAction,
}: {
  component: Extract<UIComponent, { type: 'empty' }>;
  onAction: ActionHandler;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {component.icon && (
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF6B9D]/20 to-[#B47EFF]/20 flex items-center justify-center border-2 border-[#B47EFF]/20 mb-6">
          <span className="text-5xl">{component.icon}</span>
        </div>
      )}
      <h3 className="text-xl font-extrabold text-white">{component.title}</h3>
      {component.description && (
        <p className="text-[#A0A0C0] mt-2 max-w-sm">{component.description}</p>
      )}
      {component.action && (
        <Button
          className="mt-6 font-bold"
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
    <div className="space-y-6 min-w-0">
      {components.map((component, index) => (
        <div 
          key={index} 
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {renderComponent(component, onAction, index)}
        </div>
      ))}
    </div>
  );
}

// Loading skeleton - Playful version
export function UIRendererSkeleton() {
  return (
    <div className="space-y-6">
      {/* Animated header skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-48 rounded-lg bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20 animate-pulse" />
          <div className="h-4 w-32 rounded-lg bg-[#B47EFF]/10 animate-pulse" />
        </div>
      </div>
      
      {/* Card skeleton */}
      <div className="rounded-2xl border-2 border-[#B47EFF]/20 p-6 space-y-4 bg-[#252542]/30">
        <div className="h-5 w-3/4 rounded-lg bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20 animate-pulse" />
        <div className="h-24 rounded-xl bg-[#B47EFF]/10 animate-pulse" />
        <div className="flex gap-3">
          <div className="h-10 w-24 rounded-xl bg-gradient-to-r from-[#FF6B9D]/30 to-[#B47EFF]/30 animate-pulse" />
          <div className="h-10 w-24 rounded-xl bg-[#B47EFF]/20 animate-pulse" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-[#B47EFF]/20 p-4 bg-[#252542]/30 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="h-4 w-16 rounded bg-[#B47EFF]/20 mb-2" />
            <div className="h-8 w-20 rounded bg-gradient-to-r from-[#FF6B9D]/20 to-[#B47EFF]/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
