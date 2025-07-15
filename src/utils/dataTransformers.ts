/*************************
 * Data Transformers
 * Utilities for converting CSV data to dashboard item formats
 *************************/

import { LabProfileData, LabSeriesData, LabInstanceData, TemplateData } from '@/types/csv';
import { ProfileItem, SeriesItem, InstanceItem, TemplateItem } from '@/types/dashboard';
import { isValidCSVData, isStarredItemsRecord } from '@/utils/typeGuards';
import { DataTransformationError, createErrorResult, createSuccessResult, type Result } from '@/types/errors';

/**
 * Transform LabProfileData from CSV to ProfileItem for dashboard
 */
export function transformLabProfileToProfileItem(
  csvData: LabProfileData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number, itemName?: string) => void
): Result<ProfileItem[], DataTransformationError> {
  // Validate input data
  if (!isValidCSVData(csvData)) {
    return createErrorResult(
      new DataTransformationError('Invalid CSV data provided to transformLabProfileToProfileItem', {
        dataType: 'LabProfileData',
        transformationFunction: 'transformLabProfileToProfileItem',
        inputData: csvData
      })
    );
  }
  
  if (!isStarredItemsRecord(starredItems)) {
    return createErrorResult(
      new DataTransformationError('Invalid starred items record provided to transformLabProfileToProfileItem', {
        dataType: 'Record<string, boolean>',
        transformationFunction: 'transformLabProfileToProfileItem',
        inputData: starredItems
      })
    );
  }

  const transformedData = csvData.map((item, index) => ({
    id: index,
    name: item.lab_profile,
    number: item.number || `profile-${index}`,
    seriesName: item.series,
    organization: item.organization,
    platform: item.platform || 'Unknown',
    created: item.created,
    modified: item.last_modified,
    statusLabel: item.status || 'Active',
    statusTone: 'default' as const,
    starred: starredItems[`profile-${index}`] || false,
    onStarToggle: () => toggleStar('profile', index, item.lab_profile),
  }));

  return createSuccessResult(transformedData);
}

/**
 * Transform LabSeriesData from CSV to SeriesItem for dashboard
 */
export function transformLabSeriesToSeriesItem(
  csvData: LabSeriesData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number, itemName?: string) => void
): Result<SeriesItem[], DataTransformationError> {
  // Validate input data
  if (!isValidCSVData(csvData)) {
    return createErrorResult(
      new DataTransformationError('Invalid CSV data provided to transformLabSeriesToSeriesItem', {
        dataType: 'LabSeriesData',
        transformationFunction: 'transformLabSeriesToSeriesItem',
        inputData: csvData
      })
    );
  }
  
  if (!isStarredItemsRecord(starredItems)) {
    return createErrorResult(
      new DataTransformationError('Invalid starred items record provided to transformLabSeriesToSeriesItem', {
        dataType: 'Record<string, boolean>',
        transformationFunction: 'transformLabSeriesToSeriesItem',
        inputData: starredItems
      })
    );
  }

  const transformedData = csvData.map((item, index) => ({
    id: index,
    name: item.series,
    organization: item.organization,
    labProfiles: item.distinct_lab_profiles || '0',
    virtualMachines: item.distinct_vms || '0',
    apiConsumers: item.distinct_api_consumers || '0',
    created: item.created,
    modified: item.last_modified,
    starred: starredItems[`series-${index}`] || false,
    onStarToggle: () => toggleStar('series', index, item.series),
  }));

  return createSuccessResult(transformedData);
}

/**
 * Transform LabInstanceData from CSV to InstanceItem for dashboard
 */
export function transformLabInstanceToInstanceItem(
  csvData: LabInstanceData[]
): Result<InstanceItem[], DataTransformationError> {
  // Validate input data
  if (!isValidCSVData(csvData)) {
    return createErrorResult(
      new DataTransformationError('Invalid CSV data provided to transformLabInstanceToInstanceItem', {
        dataType: 'LabInstanceData',
        transformationFunction: 'transformLabInstanceToInstanceItem',
        inputData: csvData
      })
    );
  }

  const transformedData: InstanceItem[] = csvData.map((item, index) => ({
    id: index,
    name: item.lab_profile,
    instanceId: item.id,
    labProfile: item.lab_profile,
    series: item.series,
    student: item.student,
    instructionSet: 'Standard', // Default value since not in CSV
    duration: item.duration,
    lastActivity: item.last_activity_time,
    state: item.state_id,
    starred: false as const, // Instance items don't support starring, but property is required by BaseItem
  }));

  return createSuccessResult(transformedData);
}

/**
 * Transform TemplateData from CSV to TemplateItem for dashboard
 */
export function transformTemplateToTemplateItem(
  csvData: TemplateData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number, itemName?: string) => void
): Result<TemplateItem[], DataTransformationError> {
  // Validate input data
  if (!isValidCSVData(csvData)) {
    return createErrorResult(
      new DataTransformationError('Invalid CSV data provided to transformTemplateToTemplateItem', {
        dataType: 'TemplateData',
        transformationFunction: 'transformTemplateToTemplateItem',
        inputData: csvData
      })
    );
  }
  
  if (!isStarredItemsRecord(starredItems)) {
    return createErrorResult(
      new DataTransformationError('Invalid starred items record provided to transformTemplateToTemplateItem', {
        dataType: 'Record<string, boolean>',
        transformationFunction: 'transformTemplateToTemplateItem',
        inputData: starredItems
      })
    );
  }

  const transformedData = csvData.map((item, index) => ({
    id: index,
    name: item.lab_profile,
    number: `template-${index + 1}`, // Generate template number since not in CSV
    seriesName: item.series,
    organization: item.organization,
    platform: item.platform || 'Unknown',
    created: item.created,
    modified: item.last_modified,
    statusLabel: 'Active', // Default status since not in CSV
    statusTone: 'default' as const,
    starred: starredItems[`template-${index}`] || false,
    onStarToggle: () => toggleStar('template', index, item.lab_profile),
  }));

  return createSuccessResult(transformedData);
} 