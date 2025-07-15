/*************************
 * Tab Configuration System
 * Centralized configuration for dashboard tabs
 *************************/

import { CardType } from './sorting';
import { Filter } from './filtering';
import { SortConfig } from './sorting';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';
import { 
  useLabProfileData, 
  useLabSeriesData, 
  useLabInstanceData, 
  useTemplateData 
} from '@/hooks/useCSVData';
import { 
  transformLabProfileToProfileItem, 
  transformLabSeriesToSeriesItem, 
  transformLabInstanceToInstanceItem,
  transformTemplateToTemplateItem
} from '@/utils/dataTransformers';
import { ProfileItem, SeriesItem, InstanceItem, TemplateItem } from '@/types/dashboard';
import { BaseItem } from '@/types/generic';

// Type for CSV data hooks
type CSVDataHook = () => {
  data: any[] | null;
  loading: boolean;
  error: string | null;
};

// Type for transformation functions - generic for each data type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransformFunction<T = any, R = any> = (...args: any[]) => R;

// Type for card components - generic for each item type
export type CardComponent<T = any> = React.ComponentType<T>;

export interface TabConfiguration<T = any, R = any, C = any> {
  id: string;
  label: string;
  cardType: CardType;
  csvDataHook: CSVDataHook;
  transformFunction: TransformFunction<T, R>;
  cardComponent: CardComponent<C>;
  defaultSortConfig: SortConfig;
  defaultFilterConfig: Filter[];
}

// Tab configuration registry
export const TAB_CONFIGURATIONS: TabConfiguration[] = [
  {
    id: 'lab-instances',
    label: 'Lab Instances',
    cardType: 'instance',
    csvDataHook: useLabInstanceData,
    transformFunction: transformLabInstanceToInstanceItem,
    cardComponent: InstanceCard,
    defaultSortConfig: { field: 'name', direction: 'asc' },
    defaultFilterConfig: [],
  },
  {
    id: 'lab-profiles',
    label: 'Lab Profiles',
    cardType: 'profile',
    csvDataHook: useLabProfileData,
    transformFunction: transformLabProfileToProfileItem,
    cardComponent: ProfileCard,
    defaultSortConfig: { field: 'name', direction: 'asc' },
    defaultFilterConfig: [],
  },
  {
    id: 'lab-series',
    label: 'Lab Series',
    cardType: 'series',
    csvDataHook: useLabSeriesData,
    transformFunction: transformLabSeriesToSeriesItem,
    cardComponent: SeriesCard,
    defaultSortConfig: { field: 'name', direction: 'asc' },
    defaultFilterConfig: [],
  },
  {
    id: 'templates',
    label: 'Templates',
    cardType: 'template',
    csvDataHook: useTemplateData,
    transformFunction: transformTemplateToTemplateItem,
    cardComponent: TemplateCard,
    defaultSortConfig: { field: 'name', direction: 'asc' },
    defaultFilterConfig: [],
  },
];

// Utility functions
export function getTabConfiguration(tabId: string): TabConfiguration | undefined {
  return TAB_CONFIGURATIONS.find(tab => tab.id === tabId);
}

export function getTabConfigurationByIndex(index: number): TabConfiguration | undefined {
  return TAB_CONFIGURATIONS[index];
}

export function getTabConfigurationByCardType(cardType: CardType): TabConfiguration | undefined {
  return TAB_CONFIGURATIONS.find(tab => tab.cardType === cardType);
}

export function getAllTabConfigurations(): TabConfiguration[] {
  return TAB_CONFIGURATIONS;
}

export function getTabIds(): string[] {
  return TAB_CONFIGURATIONS.map(tab => tab.id);
}

export function getTabLabels(): string[] {
  return TAB_CONFIGURATIONS.map(tab => tab.label);
}

export function getCardTypes(): CardType[] {
  return TAB_CONFIGURATIONS.map(tab => tab.cardType);
} 