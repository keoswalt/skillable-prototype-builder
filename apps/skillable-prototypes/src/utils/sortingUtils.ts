/*************************
 * Sorting Utilities
 * Type-specific comparison functions for proper sorting
 *************************/

import { FieldType } from '@/config/sorting';

/**
 * Parse a date string in the format "Month Day, Year" (e.g., "December 27, 2024")
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  
  try {
    return new Date(dateString);
  } catch {
    return null;
  }
}

/**
 * Parse a duration string in the format "H:MM:SS" (e.g., "4:13:47")
 * Returns total seconds for comparison
 */
export function parseDuration(durationString: string): number {
  if (!durationString || typeof durationString !== 'string') {
    return 0;
  }
  
  const parts = durationString.split(':').map(part => parseInt(part, 10));
  
  if (parts.length === 3) {
    // Format: H:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // Format: MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // Format: SS
    return parts[0];
  }
  
  return 0;
}

/**
 * Parse a number string, handling alphanumeric values
 * Returns the numeric part for comparison, or 0 if no numeric part found
 */
export function parseNumber(value: string): number {
  if (!value || typeof value !== 'string') {
    return 0;
  }
  
  // Extract numeric part from alphanumeric strings
  const numericMatch = value.match(/\d+/);
  if (numericMatch) {
    return parseInt(numericMatch[0], 10);
  }
  
  return 0;
}

/**
 * Compare two values based on their field type
 */
export function compareValues(
  a: unknown, 
  b: unknown, 
  fieldType: FieldType, 
  customOrder?: readonly string[]
): number {
  // Handle null/undefined values
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  if (a === null && b === null) return 0;
  
  switch (fieldType) {
    case 'string':
      return String(a).localeCompare(String(b));
      
    case 'number':
      const aNum = typeof a === 'number' ? a : parseNumber(String(a));
      const bNum = typeof b === 'number' ? b : parseNumber(String(b));
      return aNum - bNum;
      
    case 'date':
      const aDate = a instanceof Date ? a : parseDate(String(a));
      const bDate = b instanceof Date ? b : parseDate(String(b));
      
      if (!aDate && !bDate) return 0;
      if (!aDate) return 1;
      if (!bDate) return -1;
      
      return aDate.getTime() - bDate.getTime();
      
    case 'duration':
      const aDuration = parseDuration(String(a));
      const bDuration = parseDuration(String(b));
      return aDuration - bDuration;
      
    case 'custom':
      if (!customOrder) {
        return String(a).localeCompare(String(b));
      }
      
      const aIndex = customOrder.indexOf(String(a));
      const bIndex = customOrder.indexOf(String(b));
      
      // If both values are in the custom order, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only one value is in the custom order, prioritize it
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      
      // If neither value is in the custom order, sort alphabetically
      return String(a).localeCompare(String(b));
      
    default:
      return String(a).localeCompare(String(b));
  }
} 