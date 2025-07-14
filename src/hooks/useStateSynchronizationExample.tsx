/*************************
 * State Synchronization Example
 * Demonstrates the useStateSynchronization hook features
 *************************/

'use client';

import { useState } from 'react';
import { useStateSynchronization } from './useStateSynchronization';
import { useSorting } from './useSorting';
import { useFiltering } from './useFiltering';
import { useDashboardState } from './useDashboardState';
import { CardType } from '@/config/sorting';
import { BaseItem } from '@/types/generic';

// Mock data for demonstration
const mockData: BaseItem[] = [
  { id: 1, name: 'Item 1', starred: false },
  { id: 2, name: 'Item 2', starred: true },
  { id: 3, name: 'Item 3', starred: false },
];

export function useStateSynchronizationExample() {
  const [selectedCardType, setSelectedCardType] = useState<CardType>('instance');
  const [data, setData] = useState<BaseItem[]>(mockData);

  // Use the state synchronization hook
  const {
    validateCurrentState,
    getSynchronizedState,
    resetState,
    autoSynchronize,
    needsSynchronization,
    getStateFixes,
  } = useStateSynchronization({
    cardType: selectedCardType,
    data,
  });

  // Get other hooks for demonstration
  const { validateAllSortConfigs, resetAllSortConfigs } = useSorting();
  const { validateAllFilterConfigs, clearAllFilters } = useFiltering();
  const { resetAllTabPagination } = useDashboardState();

  const handleValidateState = () => {
    const state = validateCurrentState();
    console.log('Current State Validation:', state);
    alert(`State is ${state.isValid ? 'valid' : 'invalid'}. Check console for details.`);
  };

  const handleGetSynchronizedState = () => {
    const state = getSynchronizedState();
    console.log('Synchronized State:', state);
    alert('Synchronized state retrieved. Check console for details.');
  };

  const handleAutoSynchronize = () => {
    const state = autoSynchronize();
    console.log('Auto-synchronized State:', state);
    alert('State auto-synchronized. Check console for details.');
  };

  const handleResetState = () => {
    resetState();
    alert('State reset to defaults for current card type.');
  };

  const handleResetAllStates = () => {
    resetAllSortConfigs();
    clearAllFilters();
    resetAllTabPagination();
    alert('All states reset to defaults.');
  };

  const handleValidateAllConfigs = () => {
    const sortValidation = validateAllSortConfigs();
    const filterValidation = validateAllFilterConfigs();
    console.log('Sort Config Validation:', sortValidation);
    console.log('Filter Config Validation:', filterValidation);
    alert('All configurations validated. Check console for details.');
  };

  const handleAddInvalidData = () => {
    // Add data with different structure to trigger synchronization issues
    setData([
      ...data,
      { id: 4, name: 'Item 4', starred: false, invalidField: 'test' } as BaseItem,
    ]);
  };

  const handleResetData = () => {
    setData(mockData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">State Synchronization Example</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configuration Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configuration</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Card Type:</label>
            <select
              value={selectedCardType}
              onChange={(e) => setSelectedCardType(e.target.value as CardType)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="instance">Instance</option>
              <option value="profile">Profile</option>
              <option value="series">Series</option>
              <option value="template">Template</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Data Items: {data.length}</label>
            <div className="space-y-2">
              {data.map(item => (
                <div key={item.id} className="p-2 bg-gray-100 rounded text-sm">
                  ID: {item.id}, Name: {item.name}, Starred: {item.starred ? 'Yes' : 'No'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Status</h2>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Needs Synchronization:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                needsSynchronization ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {needsSynchronization ? 'Yes' : 'No'}
              </span>
            </div>
            
            {needsSynchronization && (
              <div className="mt-3">
                <h4 className="font-medium text-sm mb-2">Recommended Fixes:</h4>
                <ul className="text-sm space-y-1">
                  {getStateFixes().map((fix, index) => (
                    <li key={index} className="text-gray-600">• {fix}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            onClick={handleValidateState}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Validate State
          </button>
          
          <button
            onClick={handleGetSynchronizedState}
            className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Get Synchronized State
          </button>
          
          <button
            onClick={handleAutoSynchronize}
            className="p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            Auto Synchronize
          </button>
          
          <button
            onClick={handleResetState}
            className="p-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Reset Current State
          </button>
          
          <button
            onClick={handleResetAllStates}
            className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Reset All States
          </button>
          
          <button
            onClick={handleValidateAllConfigs}
            className="p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Validate All Configs
          </button>
          
          <button
            onClick={handleAddInvalidData}
            className="p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Add Invalid Data
          </button>
          
          <button
            onClick={handleResetData}
            className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset Data
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">How to Use:</h3>
        <ol className="text-sm space-y-1 text-gray-700">
          <li>1. Select a card type to test state synchronization</li>
          <li>2. Use "Validate State" to check current state validity</li>
          <li>3. Use "Get Synchronized State" to get validated configurations</li>
          <li>4. Use "Auto Synchronize" to automatically fix state issues</li>
          <li>5. Use "Add Invalid Data" to simulate synchronization problems</li>
          <li>6. Check the browser console for detailed validation results</li>
        </ol>
      </div>
    </div>
  );
} 