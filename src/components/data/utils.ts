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

// Import the type from types.ts to maintain type safety
import { SortConfig } from './types'; 