import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'progress';
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showProgress?: boolean;
  progressValue?: number;
  skeletonRows?: number;
  skeletonHeight?: 'sm' | 'md' | 'lg';
}

const skeletonHeightClasses = {
  sm: 'h-4',
  md: 'h-6',
  lg: 'h-8'
};

const SkeletonRow: React.FC<{ height: string; className?: string }> = ({ height, className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${height} ${className}`} />
);

const SkeletonLoader: React.FC<{ rows: number; height: string }> = ({ rows, height }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <SkeletonRow key={index} height={height} />
    ))}
  </div>
);

const ProgressLoader: React.FC<{ value: number; message?: string }> = ({ value, message }) => (
  <div className="w-full max-w-md mx-auto">
    {message && <p className="text-sm text-gray-600 mb-2 text-center">{message}</p>}
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
    <p className="text-xs text-gray-500 mt-1 text-center">{Math.round(value)}%</p>
  </div>
);

export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'spinner',
  message = 'Loading...',
  size = 'md',
  className = '',
  showProgress = false,
  progressValue = 0,
  skeletonRows = 3,
  skeletonHeight = 'md'
}) => {
  const renderContent = () => {
    switch (type) {
      case 'skeleton':
        return (
          <div className="space-y-4">
            <SkeletonLoader rows={skeletonRows} height={skeletonHeightClasses[skeletonHeight]} />
          </div>
        );
      case 'progress':
        return <ProgressLoader value={progressValue} message={message} />;
      case 'spinner':
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-3">
            <LoadingSpinner size={size} />
            {message && <p className="text-sm text-gray-600">{message}</p>}
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      {renderContent()}
    </div>
  );
};

export default LoadingState; 