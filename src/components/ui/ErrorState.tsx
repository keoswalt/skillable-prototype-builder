import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  type?: 'default' | 'network' | 'permission' | 'not-found' | 'server';
  showRetry?: boolean;
  onRetry?: () => void;
  retryText?: string;
  showDetails?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const errorTypeConfig = {
  default: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
    icon: '⚠️'
  },
  network: {
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    icon: '🌐'
  },
  permission: {
    title: 'Access Denied',
    message: 'You don\'t have permission to access this resource.',
    icon: '🔒'
  },
  'not-found': {
    title: 'Not Found',
    message: 'The requested resource could not be found.',
    icon: '🔍'
  },
  server: {
    title: 'Server Error',
    message: 'The server encountered an error. Please try again later.',
    icon: '🖥️'
  }
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  error,
  type = 'default',
  showRetry = true,
  onRetry,
  retryText = 'Try Again',
  showDetails = false,
  className = '',
  icon
}) => {
  const config = errorTypeConfig[type];
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayIcon = icon || config.icon;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - reload the page
      window.location.reload();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {/* Error Icon */}
      <div className="text-6xl mb-4" role="img" aria-label="Error">
        {displayIcon}
      </div>

      {/* Error Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {displayTitle}
      </h2>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 max-w-md">
        {displayMessage}
      </p>

      {/* Retry Button */}
      {showRetry && (
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {retryText}
        </button>
      )}

      {/* Error Details (Optional) */}
      {showDetails && error && (
        <details className="mt-6 text-left max-w-md">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            Show Error Details
          </summary>
          <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-700 overflow-auto">
            {typeof error === 'string' ? error : error.message}
            {error instanceof Error && error.stack && (
              <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
            )}
          </div>
        </details>
      )}
    </div>
  );
};

export default ErrorState; 