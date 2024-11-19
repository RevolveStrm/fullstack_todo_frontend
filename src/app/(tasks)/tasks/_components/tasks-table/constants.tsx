import { TaskPriority, TaskStatus } from '@/domains/task';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  LucideIcon,
  Timer,
} from 'lucide-react';

export interface PriorityItem {
  label: string;
  value: TaskPriority;
  icon: LucideIcon;
}

export interface StatusItem {
  label: string;
  value: TaskStatus;
  icon: LucideIcon;
}

export const statuses: StatusItem[] = [
  {
    label: 'Todo',
    value: 'TODO',
    icon: Circle,
  },
  {
    label: 'In progress',
    value: 'IN_PROGRESS',
    icon: Timer,
  },
  {
    label: 'Done',
    value: 'DONE',
    icon: CheckCircle,
  },
  {
    label: 'Canceled',
    value: 'CANCELED',
    icon: CircleOff,
  },
];

export const priorities: PriorityItem[] = [
  {
    label: 'High',
    value: 'HIGH',
    icon: ArrowUp,
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
    icon: ArrowRight,
  },
  {
    label: 'Low',
    value: 'LOW',
    icon: ArrowDown,
  },
];
