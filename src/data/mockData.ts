/*************************
 * Mock Data
 *************************/

import { ChipVariant } from '@/components/info/Chip';
import { InstanceItem, ProfileItem, SeriesItem, TemplateItem } from '@/types/dashboard';

export function generateMockInstances(): InstanceItem[] {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: `Lab Profile ${String.fromCharCode(65 + i)} (User ${i + 1})`,
    instanceId: `10${i}3453`,
    labProfile: `Profile ${String.fromCharCode(65 + i)}`,
    series: `Series ${String.fromCharCode(65 + i)}`,
    student: `User ${String.fromCharCode(65 + i)}`,
    instructionSet: "Base instruction set (en)",
    duration: `${(i % 3) + 1}:${((i * 7) % 60).toString().padStart(2, '0')}`,
    lastActivity: `June ${(i % 30) + 1}, 2025`,
    state: i % 2 === 0 ? "Running" : "Off",
    starred: false, // Instance items don't support starring
  }));
}

export function generateMockProfiles(starredItems: Record<string, boolean>, toggleStar: (itemType: string, itemId: number) => void): ProfileItem[] {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: `Lab Profile ${String.fromCharCode(65 + i)}`,
    number: `KO_00${i + 1}`,
    seriesName: `Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    platform: i % 2 === 0 ? "Azure" : "AWS",
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 3) % 30) + 1}, 2025`,
    statusLabel: i % 3 === 0 ? "In Development" : i % 3 === 1 ? "Active" : "Draft",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`profile-${i}`] || false,
    onStarToggle: () => toggleStar('profile', i),
  }));
}

export function generateMockSeries(starredItems: Record<string, boolean>, toggleStar: (itemType: string, itemId: number) => void): SeriesItem[] {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: `Lab Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    labProfiles: `${i + 3} Profiles`,
    virtualMachines: `${i + 2} VMs`,
    apiConsumers: `${i} Consumers`,
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 5) % 30) + 1}, 2025`,
    starred: starredItems[`series-${i}`] || false,
    onStarToggle: () => toggleStar('series', i),
  }));
}

export function generateMockTemplates(starredItems: Record<string, boolean>, toggleStar: (itemType: string, itemId: number) => void): TemplateItem[] {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: `Template ${String.fromCharCode(65 + i)}`,
    number: `TEMP_00${i + 1}`,
    seriesName: `Template Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    platform: i % 2 === 0 ? "Azure" : "AWS",
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 7) % 30) + 1}, 2025`,
    statusLabel: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Draft" : "Archived",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`template-${i}`] || false,
    onStarToggle: () => toggleStar('template', i),
  }));
} 