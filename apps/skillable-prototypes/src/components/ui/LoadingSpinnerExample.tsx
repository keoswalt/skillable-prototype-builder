import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingSpinnerExample: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Loading Spinner Examples</h2>
      
      {/* Size Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Sizes</h3>
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm text-gray-600">Small</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner size="md" />
            <span className="text-sm text-gray-600">Medium</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner size="lg" />
            <span className="text-sm text-gray-600">Large</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner size="xl" />
            <span className="text-sm text-gray-600">Extra Large</span>
          </div>
        </div>
      </div>

      {/* Color Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Colors</h3>
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner color="primary" size="lg" />
            <span className="text-sm text-gray-600">Primary</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner color="secondary" size="lg" />
            <span className="text-sm text-gray-600">Secondary</span>
          </div>
          <div className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded">
            <LoadingSpinner color="white" size="lg" />
            <span className="text-sm text-white">White</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LoadingSpinner color="gray" size="lg" />
            <span className="text-sm text-gray-600">Gray</span>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Custom Styling</h3>
        <div className="flex items-center space-x-6">
          <LoadingSpinner 
            size="lg" 
            color="primary" 
            className="border-4 border-dashed"
          />
          <span className="text-sm text-gray-600">Dashed Border</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerExample; 