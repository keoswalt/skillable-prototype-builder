/*************************
 * Pagination Hook
 * Handles pagination calculations and logic
 *************************/

import { useMemo } from 'react';
import { BaseItem } from '@/types/generic';

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

interface PaginationCalculations<T extends BaseItem> {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedData: T[];
  validCurrentPage: number;
}

interface UsePaginationProps<T extends BaseItem> {
  data: T[];
  paginationState: PaginationState;
  updatePagination: (updates: Partial<PaginationState>) => void;
}

export function usePagination<T extends BaseItem>({
  data,
  paginationState,
  updatePagination
}: UsePaginationProps<T>): PaginationCalculations<T> {
  
  const calculations = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / paginationState.pageSize);
    const startIndex = (paginationState.currentPage - 1) * paginationState.pageSize;
    const endIndex = startIndex + paginationState.pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    // Ensure current page is valid
    const validCurrentPage = Math.min(Math.max(1, paginationState.currentPage), totalPages || 1);
    
    // Update pagination if current page is invalid
    if (validCurrentPage !== paginationState.currentPage) {
      updatePagination({ currentPage: validCurrentPage });
    }

    return {
      totalPages,
      startIndex,
      endIndex,
      paginatedData,
      validCurrentPage
    };
  }, [data, paginationState, updatePagination]);

  return calculations;
}

// Enhanced pagination hook for per-tab pagination
interface UsePerTabPaginationProps<T extends BaseItem> {
  data: T[];
  tabId: string;
  getTabPagination: (tabId: string) => PaginationState;
  updateTabPagination: (tabId: string, updates: Partial<PaginationState>) => void;
}

export function usePerTabPagination<T extends BaseItem>({
  data,
  tabId,
  getTabPagination,
  updateTabPagination
}: UsePerTabPaginationProps<T>): PaginationCalculations<T> {
  
  const paginationState = getTabPagination(tabId);
  
  const updatePagination = (updates: Partial<PaginationState>) => {
    updateTabPagination(tabId, updates);
  };

  return usePagination({
    data,
    paginationState,
    updatePagination
  });
} 