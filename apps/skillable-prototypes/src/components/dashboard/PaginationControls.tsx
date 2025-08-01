/*************************
 * Pagination Controls Component
 *************************/

import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs';
import { Icon, Icons } from '@/components/Icon';
import { PaginationControlsProps, PageSizeOption } from '@/types/dashboard';

const DEFAULT_PAGE_SIZE_OPTIONS: PageSizeOption[] = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

export function PaginationControls({
  currentPage,
  pageSize,
  totalItems,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePreviousPage = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  return (
    <div className="flex items-center justify-end mt-6 text-body-sm text-_components-text-secondary">
      <div className="flex items-center gap-4">
        <DropdownSelect 
          label="Items per page:"
          options={pageSizeOptions.map(option => ({ label: option.label, value: option.value.toString() }))}
          value={pageSize.toString()}
          onChange={handlePageSizeChange}
          orientation="horizontal"
          disabled={disabled}
          size="small"
          maxWidth="xs"
        />
        <span>
          {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems}` : '0 items'}
        </span>
        <div className="flex gap-1">
          <Button 
            variant="icon" 
            size="small"
            onClick={handlePreviousPage}
            disabled={currentPage <= 1 || disabled}
            aria-label="Previous page"
          >
            <Icon icon={Icons.chevronLeft} className="text-primary-main" />
          </Button>
          <Button 
            variant="icon" 
            size="small"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || disabled}
            aria-label="Next page"
          >
            <Icon icon={Icons.chevronRight} className="text-primary-main" />
          </Button>
        </div>
      </div>
    </div>
  );
} 