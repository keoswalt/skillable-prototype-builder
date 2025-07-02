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
  ChevronLeft,
  ChevronUp,
  GraduationCap,
  Plus,
  Trash,
  Edit,
  Check,
  AlertCircle,
  Info,
  SaveAll,
  Star,
  Eye,
  ExternalLink,
  SquarePlus,
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
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  
  // Actions
  settings: Settings,
  add: Plus,
  delete: Trash,
  edit: Edit,
  check: Check,
  star: Star,
  saveAll: SaveAll,
  externalLink: ExternalLink,
  eye: Eye,
  squarePlus: SquarePlus,
  // UI Elements
  search: Search,
  user: User,
  bell: Bell,
  gradCap: GraduationCap,
  
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