import React, { useState } from 'react';
import { EmptyState } from './EmptyState';

export const EmptyStateExample: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'default' | 'search' | 'filter' | 'data' | 'permission' | 'custom'>('default');

  const handleAddItem = () => {
    console.log('Add item clicked');
  };

  const handleClearFilters = () => {
    console.log('Clear filters clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Empty State Examples</h2>
      
      {/* Type Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Select Empty State Type</h3>
        <div className="flex flex-wrap gap-2">
          {(['default', 'search', 'filter', 'data', 'permission', 'custom'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Empty State Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Default</h4>
            <EmptyState 
              type="default"
              actions={
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Item
                </button>
              }
            />
          </div>

          {/* Search */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Search Results</h4>
            <EmptyState 
              type="search"
              actions={
                <>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </>
              }
            />
          </div>

          {/* Filter */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Filtered Results</h4>
            <EmptyState 
              type="filter"
              actions={
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              }
            />
          </div>

          {/* Data */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">No Data</h4>
            <EmptyState 
              type="data"
              actions={
                <>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={handleContactSupport}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Contact Support
                  </button>
                </>
              }
            />
          </div>

          {/* Permission */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">No Permission</h4>
            <EmptyState 
              type="permission"
              actions={
                <button
                  onClick={handleContactSupport}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Request Access
                </button>
              }
            />
          </div>

          {/* Custom */}
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Custom</h4>
            <EmptyState 
              title="Welcome to the Dashboard!"
              message="This is a custom empty state with personalized messaging and actions."
              icon="🎉"
              actions={
                <>
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => console.log('Learn more clicked')}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Learn More
                  </button>
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* Size Variations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Size Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Small</h4>
            <EmptyState 
              type="default"
              size="sm"
              actions={
                <button
                  onClick={handleAddItem}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              }
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Medium</h4>
            <EmptyState 
              type="default"
              size="md"
              actions={
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Item
                </button>
              }
            />
          </div>
          
          <div className="border rounded-lg p-6">
            <h4 className="font-medium mb-4">Large</h4>
            <EmptyState 
              type="default"
              size="lg"
              actions={
                <button
                  onClick={handleAddItem}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
                >
                  Add New Item
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Without Illustration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Without Illustration</h3>
        <div className="border rounded-lg p-6">
          <EmptyState 
            title="Minimal Empty State"
            message="This empty state doesn't include an illustration for a cleaner look."
            showIllustration={false}
            actions={
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Item
              </button>
            }
          />
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Interactive Demo</h3>
        <div className="border rounded-lg p-6">
          <EmptyState 
            type={selectedType}
            actions={
              <button
                onClick={() => console.log(`${selectedType} action clicked`)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {selectedType === 'default' && 'Add Item'}
                {selectedType === 'search' && 'Clear Search'}
                {selectedType === 'filter' && 'Clear Filters'}
                {selectedType === 'data' && 'Refresh Data'}
                {selectedType === 'permission' && 'Request Access'}
                {selectedType === 'custom' && 'Custom Action'}
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyStateExample; 