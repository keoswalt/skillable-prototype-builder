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
} from 'lucide-react';

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