'use client';

import React, { useState } from 'react';
import { useTemplateData, useLabProfileData, useAllCSVData } from '../../hooks/useCSVData';
import { CSVParser } from '../../utils/csvParser';
import { TemplateData, LabProfileData } from '../../types/csv';
import { Button } from '../buttons/Button';

export default function CSVDemo() {
  const [activeTab, setActiveTab] = useState<'template' | 'profile' | 'all'>('template');
  
  // Example usage of the CSV hooks
  const templateData = useTemplateData({
    cache: true,
    clean: true,
    validate: true,
    requiredFields: ['lab_profile', 'series', 'organization']
  });

  const profileData = useLabProfileData({
    cache: true,
    clean: true
  });

  const allData = useAllCSVData({
    cache: true,
    clean: true
  });

  // Example of manual CSV parsing
  const [manualData, setManualData] = useState<TemplateData[]>([]);
  const [csvString, setCsvString] = useState('');

  const handleManualParse = () => {
    if (csvString.trim()) {
      const result = CSVParser.parseString<TemplateData>(csvString);
      setManualData(result.data);
    }
  };

  const renderDataTable = (data: any[], title: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-_components-background-default text-_components-text-default border border-gray-300">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border-b bg-_components-background-contrast-sm text-left text-sm font-medium">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, valueIndex) => (
                    <td key={valueIndex} className="px-4 py-2 border-b text-sm">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm mt-2">
            Showing first 5 rows of {data.length} total rows
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );

  const renderLoadingState = (title: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span>Loading...</span>
      </div>
    </div>
  );

  const renderErrorState = (error: string, title: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CSV Parser Demo</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <Button
          onClick={() => setActiveTab('template')}
          variant={activeTab === 'template' ? 'primary' : 'outline'}
          size="medium"
        >
          Template Data
        </Button>
        <Button
          onClick={() => setActiveTab('profile')}
          variant={activeTab === 'profile' ? 'primary' : 'outline'}
          size="medium"
        >
          Lab Profile Data
        </Button>
        <Button
          onClick={() => setActiveTab('all')}
          variant={activeTab === 'all' ? 'primary' : 'outline'}
          size="medium"
        >
          All Data
        </Button>
      </div>

      {/* Template Data Tab */}
      {activeTab === 'template' && (
        <div>
          {templateData.loading && renderLoadingState('Template Data')}
          {templateData.error && renderErrorState(templateData.error, 'Template Data Error')}
          {!templateData.loading && !templateData.error && renderDataTable(templateData.data, 'Template Data')}
          
          {templateData.meta && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Parse Metadata</h3>
              <div className="bg-_components-background-contrast-sm p-4 rounded-md">
                <p className="text-sm">
                  <strong>Fields:</strong> {templateData.meta.fields?.join(', ')}
                </p>
                <p className="text-sm">
                  <strong>Delimiter:</strong> {templateData.meta.delimiter}
                </p>
                <p className="text-sm">
                  <strong>Line Breaks:</strong> {templateData.meta.linebreak}
                </p>
              </div>
            </div>
          )}

          {templateData.errors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Parse Errors</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                {templateData.errors.map((error, index) => (
                  <p key={index} className="text-yellow-800 text-sm">
                    Row {error.row}: {error.message}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lab Profile Data Tab */}
      {activeTab === 'profile' && (
        <div>
          {profileData.loading && renderLoadingState('Lab Profile Data')}
          {profileData.error && renderErrorState(profileData.error, 'Lab Profile Data Error')}
          {!profileData.loading && !profileData.error && renderDataTable(profileData.data, 'Lab Profile Data')}
        </div>
      )}

      {/* All Data Tab */}
      {activeTab === 'all' && (
        <div>
          {allData.loading && renderLoadingState('All CSV Data')}
          {allData.error && renderErrorState(allData.error, 'All Data Error')}
          {!allData.loading && !allData.error && (
            <div>
              {renderDataTable(allData.data.template, 'Template Data')}
              {renderDataTable(allData.data.labProfile, 'Lab Profile Data')}
              {renderDataTable(allData.data.labSeries, 'Lab Series Data')}
              {renderDataTable(allData.data.labInstance, 'Lab Instance Data')}
            </div>
          )}
        </div>
      )}

      {/* Manual CSV Parsing Demo */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">Manual CSV Parsing Demo</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Paste CSV Data (Template format):
            </label>
            <textarea
              value={csvString}
              onChange={(e) => setCsvString(e.target.value)}
              placeholder="lab_profile,series,organization,created,last_modified,platform&#10;Example Lab,Test Series,Test Org,2024-01-01,2024-01-02,ESX"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={handleManualParse}
            variant="outline"
            size="medium"
          >
            Parse CSV
          </Button>
          {manualData.length > 0 && renderDataTable(manualData, 'Manually Parsed Data')}
        </div>
      </div>
    </div>
  );
} 