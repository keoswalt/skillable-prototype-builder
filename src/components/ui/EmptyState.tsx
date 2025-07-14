import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  type?: 'default' | 'search' | 'filter' | 'data' | 'permission' | 'custom';
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  showIllustration?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const emptyStateConfig = {
  default: {
    title: 'No items found',
    message: 'There are no items to display at the moment.',
    icon: '📭'
  },
  search: {
    title: 'No search results',
    message: 'Try adjusting your search terms or filters to find what you\'re looking for.',
    icon: '🔍'
  },
  filter: {
    title: 'No filtered results',
    message: 'No items match your current filters. Try adjusting your filter criteria.',
    icon: '🎛️'
  },
  data: {
    title: 'No data available',
    message: 'There is no data to display. Data may be loading or unavailable.',
    icon: '📊'
  },
  permission: {
    title: 'No access',
    message: 'You don\'t have permission to view this content.',
    icon: '🚫'
  },
  custom: {
    title: '',
    message: '',
    icon: '📋'
  }
};

const sizeClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

const iconSizes = {
  sm: 'text-4xl',
  md: 'text-5xl',
  lg: 'text-6xl'
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  type = 'default',
  icon,
  actions,
  showIllustration = true,
  className = '',
  size = 'md'
}) => {
  const config = emptyStateConfig[type];
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayIcon = icon || config.icon;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${sizeClasses[size]} ${className}`}>
      {/* Illustration/Icon */}
      {showIllustration && (
        <div className={`${iconSizes[size]} mb-4`} role="img" aria-label="Empty state">
          {displayIcon}
        </div>
      )}

      {/* Title */}
      {displayTitle && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {displayTitle}
        </h3>
      )}

      {/* Message */}
      {displayMessage && (
        <p className="text-gray-600 mb-6 max-w-md">
          {displayMessage}
        </p>
      )}

      {/* Actions */}
      {actions && (
        <div className="flex flex-col sm:flex-row gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 