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
  Pencil,
  Check,
  AlertCircle,
  Info,
  SaveAll,
  Star,
  Eye,
  ExternalLink,
  SquarePlus,
  Bold,
  Italic,
  Strikethrough,
  Heading,
  MessageSquare,
  Link,
  FileText,
  List,
  ListOrdered,
  ListChecks,
  ListFilter,
  Code,
  Table,
  Indent,
  Outdent,
  Layout,
  Upload,
  Brain,
  Bot,
  Sparkles,
  Type,
  TextCursorInput,
  FilePlus,
  BookOpen,
  Camera,
  HelpCircle,
  Sun,
  Moon,
  LogOut,
  Play,
  MoreHorizontal,
  Bug,
  CreditCard,
  StickyNote,
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
  pencil: Pencil,
  check: Check,
  star: Star,
  saveAll: SaveAll,
  externalLink: ExternalLink,
  eye: Eye,
  squarePlus: SquarePlus,
  logout: LogOut,
  play: Play,
  more: MoreHorizontal,
  // UI Elements
  search: Search,
  user: User,
  bell: Bell,
  gradCap: GraduationCap,
  circleQuestionMark: HelpCircle,
  // Theme
  sun: Sun,
  moon: Moon,
  // Status/Feedback
  alert: AlertCircle,
  info: Info,
  bug: Bug,
  creditCard: CreditCard,
  note: StickyNote,
  // Formatting / Editor
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  heading: Heading,
  comment: MessageSquare,
  link: Link,
  fileText: FileText,
  list: List,
  listOrdered: ListOrdered,
  listChecks: ListChecks,
  listFilter: ListFilter,
  code: Code,
  table: Table,
  indent: Indent,
  outdent: Outdent,
  layout: Layout,
  upload: Upload,
  ai: Brain,
  bot: Bot,
  sparkles: Sparkles,
  type: Type,
  input: TextCursorInput,
  filePlus: FilePlus,
  book: BookOpen,
  camera: Camera,
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