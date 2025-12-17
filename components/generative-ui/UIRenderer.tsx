'use client';

import { UIComponent, InteractionEvent } from '@/lib/ui-schema';
import { ComponentRegistry, GenerativeComponentProps } from './registry';
import {
  Text,
  Card,
  Button,
  Form,
  Table,
  Chart,
  List,
  Tabs,
  Grid,
  Container,
  Image,
  Divider,
  Stat,
  Alert,
  Progress,
  EmptyState,
} from './components';

// Component registry mapping
const componentRegistry: ComponentRegistry = {
  text: Text,
  card: Card,
  button: Button,
  form: Form,
  table: Table,
  chart: Chart,
  list: List,
  tabs: Tabs,
  grid: Grid,
  container: Container,
  image: Image,
  divider: Divider,
  stat: Stat,
  alert: Alert,
  progress: Progress,
  empty: EmptyState,
};

interface UIRendererProps {
  components: UIComponent[];
  onAction: (event: Omit<InteractionEvent, 'timestamp'>) => void;
}

export function UIRenderer({ components, onAction }: UIRendererProps) {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {components.map((component, index) => {
        const Component = componentRegistry[component.type] as React.ComponentType<GenerativeComponentProps>;
        
        if (!Component) {
          console.warn(`Unknown component type: ${component.type}`);
          return null;
        }

        return (
          <div key={index} className="animate-fadeIn">
            <Component component={component} onAction={onAction} />
          </div>
        );
      })}
    </div>
  );
}

// Loading skeleton for when UI is being generated
export function UIRendererSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-zinc-800/50 rounded-lg w-3/4" />
      <div className="h-32 bg-zinc-800/50 rounded-xl" />
      <div className="flex gap-3">
        <div className="h-10 bg-zinc-800/50 rounded-lg w-24" />
        <div className="h-10 bg-zinc-800/50 rounded-lg w-24" />
      </div>
    </div>
  );
}

