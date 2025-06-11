import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash,
  Edit,
  Check,
  AlertCircle,
  Info,
  LucideIcon,
  LucideProps
} from 'lucide-react';
import { forwardRef } from 'react';

// Icon registry
export const Icons = {
  // Navigation
  home: Home,
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  
  // Actions
  settings: Settings,
  add: Plus,
  delete: Trash,
  edit: Edit,
  check: Check,
  
  // UI Elements
  search: Search,
  user: User,
  bell: Bell,
  
  // Status/Feedback
  alert: AlertCircle,
  info: Info,
} as const;

// Type for icon names
export type IconName = keyof typeof Icons;

// Icon component props
interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, ...props }, ref) => {
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon'; 