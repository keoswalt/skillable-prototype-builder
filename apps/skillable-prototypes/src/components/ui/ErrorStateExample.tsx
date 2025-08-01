import React, { useState } from 'react';
import { ErrorState } from './ErrorState';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error for demonstration
const BuggyComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('This is a simulated error for demonstration purposes');
  }
  return <div className="p-4 bg-green-100 rounded">This component works fine!</div>;
};

export const ErrorStateExample: React.FC = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [showBuggyComponent, setShowBuggyComponent] = useState(false);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    console.log('Retry clicked! Count:', retryCount + 1);
  };

  const simulateNetworkError = () => {
    throw new Error('Network connection failed');
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Error State Examples</h2>
      
      {/* Error Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Error Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Default Error</h4>
            <ErrorState 
              type="default"
              showRetry={true}
              onRetry={handleRetry}
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Network Error</h4>
            <ErrorState 
              type="network"
              showRetry={true}
              onRetry={handleRetry}
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Permission Error</h4>
            <ErrorState 
              type="permission"
              showRetry={false}
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Not Found</h4>
            <ErrorState 
              type="not-found"
              showRetry={true}
              onRetry={handleRetry}
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Server Error</h4>
            <ErrorState 
              type="server"
              showRetry={true}
              onRetry={handleRetry}
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Custom Error</h4>
            <ErrorState 
              title="Custom Error Title"
              message="This is a custom error message with specific details."
              icon="🚨"
              showRetry={true}
              onRetry={handleRetry}
              retryText="Retry Operation"
            />
          </div>
        </div>
      </div>

      {/* Error with Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Error with Details</h3>
        <div className="border rounded-lg p-6">
          <ErrorState 
            title="Detailed Error"
            message="This error includes technical details for debugging."
            error={new Error('Detailed error message with stack trace')}
            showRetry={true}
            onRetry={handleRetry}
            showDetails={true}
          />
        </div>
      </div>

      {/* Error Boundary Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Error Boundary Demo</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowBuggyComponent(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Show Buggy Component
            </button>
            <button
              onClick={() => setShowBuggyComponent(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Hide Buggy Component
            </button>
          </div>
          
          {showBuggyComponent && (
            <div className="border rounded-lg p-6">
              <ErrorBoundary 
                resetKey={retryCount}
                onError={(error, errorInfo) => {
                  console.log('Error caught by boundary:', error, errorInfo);
                }}
              >
                <BuggyComponent shouldThrow={true} />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>

      {/* Custom Fallback */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Custom Fallback UI</h3>
        <div className="border rounded-lg p-6">
          <ErrorBoundary
            fallback={
              <div className="text-center p-8">
                <div className="text-4xl mb-4">😵</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something broke</h3>
                <p className="text-gray-600 mb-4">This is a custom fallback UI</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Reload Page
                </button>
              </div>
            }
          >
            <BuggyComponent shouldThrow={true} />
          </ErrorBoundary>
        </div>
      </div>

      {/* Retry Counter */}
      <div className="text-center text-sm text-gray-600">
        Retry count: {retryCount}
      </div>
    </div>
  );
};

export default ErrorStateExample; 