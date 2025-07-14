/*************************
 * Tab Management Hook
 * Manages tab-specific data loading and transformation
 *************************/

import { useMemo } from 'react';
import { 
  getTabConfigurationByIndex, 
  getTabConfigurationByCardType,
  type TabConfiguration 
} from '@/config/tabs';
import { CardType } from '@/config/sorting';
import { ProfileItem, SeriesItem, InstanceItem, TemplateItem } from '@/types/dashboard';

interface UseTabManagementProps {
  activeTabIndex: number;
  starredItems: Record<string, boolean>;
  toggleStar: (itemType: string, itemId: number) => void;
}

interface TabData {
  configuration: TabConfiguration;
  transformedData: ProfileItem[] | SeriesItem[] | InstanceItem[] | TemplateItem[];
  loading: boolean;
  error: string | null;
}

export function useTabManagement({
  activeTabIndex,
  starredItems,
  toggleStar
}: UseTabManagementProps): TabData {
  
  const tabData = useMemo(() => {
    // Get current tab configuration
    const configuration = getTabConfigurationByIndex(activeTabIndex);
    
    if (!configuration) {
      return {
        configuration: null as any,
        transformedData: [],
        loading: false,
        error: 'Invalid tab configuration'
      };
    }

    // Get CSV data using the tab's data hook
    const csvDataHook = configuration.csvDataHook;
    const { data: csvData, loading, error } = csvDataHook({
      cache: true,
      clean: true
    });

    // Transform data using the tab's transformation function
    let transformedData: ProfileItem[] | SeriesItem[] | InstanceItem[] | TemplateItem[] = [];
    
    if (csvData && csvData.length > 0) {
      transformedData = configuration.transformFunction(csvData, starredItems, toggleStar);
    }

    return {
      configuration,
      transformedData,
      loading,
      error
    };
  }, [activeTabIndex, starredItems, toggleStar]);

  return tabData;
}

// Utility function to get tab configuration by card type
export function useTabConfigurationByCardType(cardType: CardType): TabConfiguration | undefined {
  return useMemo(() => {
    return getTabConfigurationByCardType(cardType);
  }, [cardType]);
} 