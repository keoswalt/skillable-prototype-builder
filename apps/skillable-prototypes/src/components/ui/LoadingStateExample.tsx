import React, { useState, useEffect } from 'react';
import { LoadingState } from './LoadingState';

export const LoadingStateExample: React.FC = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Loading State Examples</h2>
      
      {/* Spinner Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Spinner Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Default Spinner</h4>
            <LoadingState type="spinner" message="Loading data..." />
          </div>
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Large Spinner</h4>
            <LoadingState type="spinner" size="xl" message="Processing..." />
          </div>
        </div>
      </div>

      {/* Skeleton Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Skeleton Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Small Skeleton (3 rows)</h4>
            <LoadingState 
              type="skeleton" 
              skeletonRows={3} 
              skeletonHeight="sm" 
            />
          </div>
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Medium Skeleton (5 rows)</h4>
            <LoadingState 
              type="skeleton" 
              skeletonRows={5} 
              skeletonHeight="md" 
            />
          </div>
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Large Skeleton (4 rows)</h4>
            <LoadingState 
              type="skeleton" 
              skeletonRows={4} 
              skeletonHeight="lg" 
            />
          </div>
        </div>
      </div>

      {/* Progress Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Progress Loading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Animated Progress</h4>
            <LoadingState 
              type="progress" 
              progressValue={progressValue}
              message="Uploading files..." 
            />
          </div>
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Static Progress</h4>
            <LoadingState 
              type="progress" 
              progressValue={65}
              message="Processing data..." 
            />
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Custom Styling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h4 className="font-medium mb-4">Dark Background</h4>
            <LoadingState 
              type="spinner" 
              size="lg"
              message="Loading in dark mode..." 
              className="text-white"
            />
          </div>
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Compact Loading</h4>
            <LoadingState 
              type="spinner" 
              size="sm"
              message="Quick load..." 
              className="p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingStateExample; 