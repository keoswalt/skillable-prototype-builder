import React, { useMemo, useState } from 'react';
import { Icon, IconName, Icons } from '../Icon';
import * as Types from './types';
import TabNavigation from './TabNavigation';
import TableContent from './TableContent';
import TableFooter from './TableFooter';
import { formatDate, getStatusStyles, getDefaultSortConfig } from './utils';

// Type guard functions
const isDateCell = (cell: Types.CellData): cell is Types.DateCellData => {
  return cell.type === 'date';
};

const isLabelCell = (cell: Types.CellData): cell is Types.LabelCellData => {
  return cell.type === 'label';
};

interface DataTableProps {
  tabs: Array<{
    id: string;
    label: string;
    isActive?: boolean;
  }>;
  columns: Types.Column[];
  initialData: Types.Row[];
  onTabChange: (tabId: string) => void;
  onMenuClick: () => void;
  pagination: {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalRows: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
  };
}

// Helper function for getting comparable values
const getCellSortValue = (cell: Types.CellData | undefined): string | number => {
  if (!cell) return '';
  
  if (isDateCell(cell)) {
    return new Date(cell.value).getTime();
  }
  
  if (isLabelCell(cell)) {
    return cell.value.toLowerCase();
  }
  
  // For other cell types, convert to string for basic comparison
  return String(cell.value).toLowerCase();
};

// Component Implementation
export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(({
  tabs,
  columns,
  initialData,
  pagination,
  onTabChange,
  onMenuClick,
}, ref) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);
  const [data, setData] = useState<Types.Row[]>(initialData);
  const [sortConfig, setSortConfig] = useState<Types.SortConfig>(getDefaultSortConfig());

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // First priority: favorites at top
      if (a.isFavorited !== b.isFavorited) {
        return a.isFavorited ? -1 : 1;
      }
      
      // Second priority: actual sorting column
      const aCell = a.cells.find(cell => cell.columnKey === sortConfig.key);
      const bCell = b.cells.find(cell => cell.columnKey === sortConfig.key);
      
      const aValue = getCellSortValue(aCell);
      const bValue = getCellSortValue(bCell);
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // String comparison for all other types
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const handleSort = (columnId: string) => {
    setSortConfig(prevConfig => ({
      key: columnId,
      direction: prevConfig.key === columnId && prevConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc'
    }));
  };

  const handleToggleFavorite = (rowId: string) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId 
          ? { ...row, isFavorited: !row.isFavorited }
          : row
      )
    );
  };

  return (
    <div ref={ref} className="bg-_components-background-default border rounded-lg shadow">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onMenuClick={onMenuClick}
      />
      <TableContent
        columns={columns}
        data={sortedData}
        sortConfig={sortConfig}
        onSort={handleSort}
        onToggleFavorite={handleToggleFavorite}
      />
      <TableFooter pagination={pagination} />
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable; 