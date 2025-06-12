import React from 'react';
import { Icon, Icons } from '../Icon';
import * as Types from './types';
import { formatDate, getStatusStyles } from './utils';

interface TableContentProps {
  columns: Types.Column[];
  data: Types.Row[];
  sortConfig: Types.SortConfig;
  onSort: (columnId: string) => void;
  onToggleFavorite: (rowId: string) => void;
}

interface TableCellProps {
  cellData: Types.CellData;
  rowId: string;
  isFavorited: boolean;
  onToggleFavorite: (rowId: string) => void;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ 
  cellData, 
  rowId, 
  isFavorited, 
  onToggleFavorite, 
  className = '' 
}) => {
  const renderCellContent = () => {
    switch (cellData.type) {
      case 'favorite':
        return (
          <div className="flex items-center justify-start space-x-2">
            <button
              onClick={() => onToggleFavorite(rowId)}
              className="hover:bg-softgrey-light rounded-[5px] transition-colors"
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Icon 
                icon={Icons.star} 
                size={16}
                className={isFavorited ? 'text-warning-main fill-current' : 'text-hardgrey-main hover:text-warning-main transition-colors'} 
              />
            </button>
            <a 
            href={cellData.additionalProps.href} 
            target={cellData.additionalProps.target}
            className="text-primary-main hover:text-primary-dark hover:underline"
          >
            {cellData.value}
          </a>
          </div>
        );
      
      case 'link':
        return (
          <a 
            href={cellData.additionalProps.href} 
            target={cellData.additionalProps.target}
            className="text-primary-main hover:text-primary-dark hover:underline"
          >
            {cellData.value}
          </a>
        );
      
      case 'date':
        return (
          <span className="text-hardgrey-main">
            {formatDate(cellData.value)}
          </span>
        );
      
      case 'status':
        return (
          <span className={`px-2 py-1 rounded-full text-body-xs font-medium ${
            getStatusStyles(cellData.value)
          }`}>
            {cellData.value}
          </span>
        );
      
      case 'actions':
        return (
          <div className="flex space-x-1">
            {cellData.value.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="p-1 hover:bg-softgrey-light rounded-[5px] transition-colors"
                title={action.title}
              >
                <Icon 
                  icon={Icons[action.icon]} 
                  size={16}
                  className="text-hardgrey-main hover:text-primary-main transition-colors" 
                />
              </button>
            ))}
          </div>
        );
      
      case 'label':
        return <span className="text-hardgrey-main">{cellData.value}</span>;
      
      default:
        const _exhaustiveCheck: never = cellData;
        return null;
    }
  };

  return (
    <td className={`px-4 py-4 whitespace-nowrap ${className}`}>
      {renderCellContent()}
    </td>
  );
};

export const TableContent: React.FC<TableContentProps> = ({
  columns,
  data,
  sortConfig,
  onSort,
  onToggleFavorite,
}) => {
  const getSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) {
      return <Icon icon={Icons.chevronDown} size={16} className="text-hardgrey-main" />;
    }
    return (
      <Icon 
        icon={sortConfig.direction === 'asc' ? Icons.chevronUp : Icons.chevronDown}
        size={16}
        className="text-primary-main" 
      />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-_components-divider">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={`
                  px-4 py-4 text-left text-body-xs font-primary text-_components-text-primary transition-colors
                  ${column.sortable ? 'cursor-pointer' : ''}
                `}
                onClick={() => column.sortable && onSort(column.id)}
                style={{ width: column.width }}
              >
                <div className="flex items-center space-x-1">
                  <span className='text-nowrap'>{column.label}</span>
                  {column.sortable && getSortIcon(column.id)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-_components-divider">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="transition-colors"
            >
              {row.cells.map((cell: Types.CellData, cellIndex: number) => (
                <TableCell
                  key={`${row.id}-${cellIndex}`}
                  cellData={cell}
                  rowId={row.id}
                  isFavorited={row.isFavorited}
                  onToggleFavorite={onToggleFavorite}
                  className={cellIndex === 0 ? "font-medium" : ""}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent; 