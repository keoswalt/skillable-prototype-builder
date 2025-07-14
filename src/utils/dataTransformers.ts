/*************************
 * Data Transformers
 * Utilities for converting CSV data to dashboard item formats
 *************************/

import { LabProfileData, LabSeriesData, LabInstanceData, TemplateData } from '@/types/csv';
import { ProfileItem, SeriesItem, InstanceItem, TemplateItem } from '@/types/dashboard';

/**
 * Transform LabProfileData from CSV to ProfileItem for dashboard
 */
export function transformLabProfileToProfileItem(
  csvData: LabProfileData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number) => void
): ProfileItem[] {
  return csvData.map((item, index) => ({
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
    onStarToggle: () => toggleStar('profile', index),
  }));
}

/**
 * Transform LabSeriesData from CSV to SeriesItem for dashboard
 */
export function transformLabSeriesToSeriesItem(
  csvData: LabSeriesData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number) => void
): SeriesItem[] {
  return csvData.map((item, index) => ({
    id: index,
    name: item.series,
    organization: item.organization,
    labProfiles: item.distinct_lab_profiles || '0',
    virtualMachines: item.distinct_vms || '0',
    apiConsumers: item.distinct_api_consumers || '0',
    created: item.created,
    modified: item.last_modified,
    starred: starredItems[`series-${index}`] || false,
    onStarToggle: () => toggleStar('series', index),
  }));
}

/**
 * Transform LabInstanceData from CSV to InstanceItem for dashboard
 */
export function transformLabInstanceToInstanceItem(
  csvData: LabInstanceData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number) => void
): InstanceItem[] {
  return csvData.map((item, index) => ({
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
    starred: starredItems[`instance-${index}`] || false,
    onStarToggle: () => toggleStar('instance', index),
  }));
}

/**
 * Transform TemplateData from CSV to TemplateItem for dashboard
 */
export function transformTemplateToTemplateItem(
  csvData: TemplateData[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number) => void
): TemplateItem[] {
  return csvData.map((item, index) => ({
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
    onStarToggle: () => toggleStar('template', index),
  }));
} 