/*************************
 * Pagination Hook
 * Handles pagination calculations and logic
 *************************/

import { useMemo } from 'react';

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

interface PaginationCalculations {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedData: unknown[];
  validCurrentPage: number;
}

interface UsePaginationProps {
  data: unknown[];
  paginationState: PaginationState;
  updatePagination: (updates: Partial<PaginationState>) => void;
}

export function usePagination({
  data,
  paginationState,
  updatePagination
}: UsePaginationProps): PaginationCalculations {
  
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