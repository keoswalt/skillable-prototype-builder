/*************************
 * Data Transformation Hook
 * Handles transformation of CSV data to dashboard item formats
 *************************/

import { useMemo } from 'react';
import { LabProfileData, LabSeriesData, LabInstanceData, TemplateData } from '@/types/csv';
import { ProfileItem, SeriesItem, InstanceItem, TemplateItem } from '@/types/dashboard';
import { 
  transformLabProfileToProfileItem, 
  transformLabSeriesToSeriesItem, 
  transformLabInstanceToInstanceItem,
  transformTemplateToTemplateItem
} from '@/utils/dataTransformers';
// DataTransformationError is not used in this file, removed to fix linter

interface UseDataTransformationProps {
  csvProfiles: LabProfileData[] | null;
  csvSeries: LabSeriesData[] | null;
  csvInstances: LabInstanceData[] | null;
  csvTemplates: TemplateData[] | null;
  starredItems: Record<string, boolean>;
  toggleStar: (itemType: string, itemId: number) => void;
}

interface TransformedData {
  profiles: ProfileItem[];
  series: SeriesItem[];
  instances: InstanceItem[];
  templates: TemplateItem[];
}

export function useDataTransformation({
  csvProfiles,
  csvSeries,
  csvInstances,
  csvTemplates,
  starredItems,
  toggleStar
}: UseDataTransformationProps): TransformedData {
  
  const transformedData = useMemo(() => {
    const profiles = csvProfiles && csvProfiles.length > 0 
      ? transformLabProfileToProfileItem(csvProfiles, starredItems, toggleStar)
      : { success: true, data: [] as ProfileItem[] };

    const series = csvSeries && csvSeries.length > 0
      ? transformLabSeriesToSeriesItem(csvSeries, starredItems, toggleStar)
      : { success: true, data: [] as SeriesItem[] };

    const instances = csvInstances && csvInstances.length > 0
      ? transformLabInstanceToInstanceItem(csvInstances)
      : { success: true, data: [] as InstanceItem[] };

    const templates = csvTemplates && csvTemplates.length > 0
      ? transformTemplateToTemplateItem(csvTemplates, starredItems, toggleStar)
      : { success: true, data: [] as TemplateItem[] };

    return {
      profiles: profiles.success ? profiles.data : [],
      series: series.success ? series.data : [],
      instances: instances.success ? instances.data : [],
      templates: templates.success ? templates.data : []
    };
  }, [csvProfiles, csvSeries, csvInstances, csvTemplates, starredItems, toggleStar]);

  return transformedData;
} 