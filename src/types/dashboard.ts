/*************************
 * Dashboard Types
 *************************/

import { ChipVariant } from '@/components/info/Chip';

export interface BaseDashboardItem {
  id: number;
  name: string;
  starred: boolean;
}

export interface InstanceItem extends BaseDashboardItem {
  instanceId: string;
  labProfile: string;
  series: string;
  student: string;
  instructionSet: string;
  duration: string;
  lastActivity: string;
  state: string;
}

export interface ProfileItem extends BaseDashboardItem {
  number: string;
  seriesName: string;
  organization: string;
  platform: string;
  created: string;
  modified: string;
  statusLabel: string;
  statusTone: ChipVariant;
  onStarToggle: () => void;
}

export interface SeriesItem extends BaseDashboardItem {
  organization: string;
  labProfiles: string;
  virtualMachines: string;
  apiConsumers: string;
  created: string;
  modified: string;
  onStarToggle: () => void;
}

export interface TemplateItem extends BaseDashboardItem {
  number: string;
  seriesName: string;
  organization: string;
  platform: string;
  created: string;
  modified: string;
  statusLabel: string;
  statusTone: ChipVariant;
  onStarToggle: () => void;
}

export type DashboardItem = InstanceItem | ProfileItem | SeriesItem | TemplateItem;

export interface DashboardState {
  activeTabIndex: number;
  starredItems: Record<string, boolean>;
  sortConfigs: Record<string, any>;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PageSizeOption {
  label: string;
  value: number;
}

export interface PaginationControlsProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: PageSizeOption[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  disabled?: boolean;
} 