import React from 'react';
import { Icon, Icons } from '../Icon';

interface TableFooterProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalRows: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
  };
}

export const TableFooter: React.FC<TableFooterProps> = ({
  pagination: {
    currentPage,
    totalPages,
    rowsPerPage,
    totalRows,
    onPageChange,
    onRowsPerPageChange
  }
}) => {
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-_components-divider">
      <div className="flex items-center space-x-2">
        <span className="text-body-xs text-_components-text-primary">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="
            border border-_components-divider rounded-[5px] px-1 py-1 text-body-xs text-_components-text-primary
            focus:ring-2 focus:ring-primary-main focus:border-primary-main
          "
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-body-xs text-_components-text-primary">
          {startRow}-{endRow} of {totalRows}
        </span>
        <div className="flex space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="
              p-1 hover:bg-softgrey-light rounded-[5px] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Previous page"
          >
            <Icon 
              icon={Icons.chevronLeft} 
              size={16}
              className="text-_components-text-primary" 
            />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
              p-1 hover:bg-softgrey-light rounded-[5px] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Next page"
          >
            <Icon 
              icon={Icons.chevronRight} 
              size={16}
              className="text-_components-text-primary" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFooter; 