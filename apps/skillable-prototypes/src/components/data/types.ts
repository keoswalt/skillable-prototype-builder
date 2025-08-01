import { IconName } from '../Icon';

export interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface Action {
  icon: IconName;
  onClick: () => void;
  title: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Strongly typed cell variants
export interface BaseCellData {
  columnKey: string;
}

export interface FavoriteCellData extends BaseCellData {
  type: 'favorite';
  value: string;  // The text to display
  additionalProps: {
    href: string;
    target?: '_blank' | '_self';
  };
}

export interface LabelCellData extends BaseCellData {
  type: 'label';
  value: string;
}

export interface LinkCellData extends BaseCellData {
  type: 'link';
  value: string;
  additionalProps: {
    href: string;
    target?: '_blank' | '_self';
  };
}

export interface DateCellData extends BaseCellData {
  type: 'date';
  value: string; // ISO date string
}

export interface StatusCellData extends BaseCellData {
  type: 'status';
  value: 'Complete' | 'In Development' | string;
}

export interface ActionsCellData extends BaseCellData {
  type: 'actions';
  value: Action[];
}

export type CellData = 
  | FavoriteCellData 
  | LabelCellData 
  | LinkCellData 
  | DateCellData 
  | StatusCellData 
  | ActionsCellData;

export interface Row {
  id: string;
  isFavorited: boolean;  // Single source of truth for favorite state
  cells: CellData[];
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

export const getStatusStyles = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Complete': 'bg-success-main text-success-contrast',
    'In Development': 'bg-softgrey-main text-softgrey-contrast',
  };
  return statusMap[status] || 'bg-softgrey-main text-softgrey-contrast';
};

export const getDefaultSortConfig = (): SortConfig => ({
  key: 'lastModified',
  direction: 'desc'
}); 