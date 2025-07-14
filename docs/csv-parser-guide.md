# CSV Parser Implementation Guide

This guide explains how to use the CSV parser utility and React hooks for parsing CSV data throughout your codebase.

## Overview

The CSV parser implementation provides:
- **Type-safe CSV parsing** with TypeScript interfaces
- **React hooks** for easy data loading and state management
- **Caching** for improved performance
- **Error handling** and validation
- **Multiple parsing methods** (string, file, URL)

## Installation

The required dependencies are already installed:
```bash
npm install papaparse @types/papaparse
```

## File Structure

```
src/
├── types/
│   └── csv.ts              # TypeScript interfaces for CSV data
├── utils/
│   └── csvParser.ts        # Main CSV parsing utility
├── hooks/
│   └── useCSVData.ts       # React hooks for CSV data
└── components/
    └── data/
        └── CSVDemo.tsx     # Demo component
```

## CSV Data Types

The following TypeScript interfaces are defined for your CSV files:

### TemplateData
```typescript
interface TemplateData {
  lab_profile: string;
  series: string;
  organization: string;
  created: string;
  last_modified: string;
  platform: string;
}
```

### LabProfileData
```typescript
interface LabProfileData {
  lab_profile: string;
  organization: string;
  number: string;
  series: string;
  virtualization_platform: string;
  cloud_platform: string;
  created: string;
  last_modified: string;
  status: string;
  platform: string;
}
```

### LabSeriesData & LabInstanceData
Similar structures for series and instance data.

## Usage Examples

### 1. Using React Hooks (Recommended)

#### Basic Usage
```typescript
import { useTemplateData } from '../hooks/useCSVData';

function MyComponent() {
  const { data, loading, error } = useTemplateData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.lab_profile}</div>
      ))}
    </div>
  );
}
```

#### With Options
```typescript
import { useLabProfileData } from '../hooks/useCSVData';

function MyComponent() {
  const { data, loading, error, refetch } = useLabProfileData({
    cache: true,                    // Enable caching (default: true)
    clean: true,                    // Remove empty rows (default: true)
    validate: true,                 // Enable validation
    requiredFields: ['lab_profile', 'organization'] // Required fields for validation
  });
  
  return (
    <div>
      <button onClick={refetch}>Refresh Data</button>
      {/* Your component logic */}
    </div>
  );
}
```

#### Loading All Data
```typescript
import { useAllCSVData } from '../hooks/useCSVData';

function MyComponent() {
  const { data, loading, error } = useAllCSVData();
  
  if (loading) return <div>Loading all data...</div>;
  
  return (
    <div>
      <h3>Templates: {data.template.length}</h3>
      <h3>Profiles: {data.labProfile.length}</h3>
      <h3>Series: {data.labSeries.length}</h3>
      <h3>Instances: {data.labInstance.length}</h3>
    </div>
  );
}
```

### 2. Using the CSVParser Utility Directly

#### Parse CSV String
```typescript
import { CSVParser } from '../utils/csvParser';
import { TemplateData } from '../types/csv';

const csvString = `lab_profile,series,organization,created,last_modified,platform
Example Lab,Test Series,Test Org,2024-01-01,2024-01-02,ESX`;

const result = CSVParser.parseString<TemplateData>(csvString);
console.log(result.data); // Array of TemplateData objects
console.log(result.errors); // Any parsing errors
console.log(result.meta); // Parse metadata
```

#### Parse CSV File (File Upload)
```typescript
import { CSVParser } from '../utils/csvParser';

function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (file) {
    CSVParser.parseFile<TemplateData>(file)
      .then(result => {
        console.log('Parsed data:', result.data);
      })
      .catch(error => {
        console.error('Parse error:', error);
      });
  }
}
```

#### Parse Specific CSV Files
```typescript
import { CSVParser } from '../utils/csvParser';

// Parse template data
const templateResult = await CSVParser.parseTemplateData();

// Parse lab profile data
const profileResult = await CSVParser.parseLabProfileData();

// Parse all data at once
const allData = await CSVParser.parseAllData();
```

### 3. Data Validation and Cleaning

#### Validate Data Structure
```typescript
import { CSVParser } from '../utils/csvParser';

const validation = CSVParser.validateData(data, [
  'lab_profile',
  'organization',
  'series'
]);

if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

#### Clean Data
```typescript
import { CSVParser } from '../utils/csvParser';

// Remove empty rows
const cleanedData = CSVParser.cleanData(data);
```

## Configuration Options

### Hook Options
```typescript
interface UseCSVDataOptions {
  cache?: boolean;           // Enable/disable caching (default: true)
  validate?: boolean;        // Enable validation (default: false)
  requiredFields?: string[]; // Required fields for validation
  clean?: boolean;          // Remove empty rows (default: true)
}
```

### PapaParse Configuration
```typescript
const customConfig: Papa.ParseConfig = {
  header: true,              // First row contains headers
  skipEmptyLines: true,      // Skip empty lines
  transformHeader: (header) => header.trim(), // Clean headers
  transform: (value) => value.trim(),         // Clean values
  delimiter: ',',            // Custom delimiter
  // ... other PapaParse options
};
```

## Error Handling

The implementation provides comprehensive error handling:

```typescript
// Hook errors
const { data, loading, error, errors } = useTemplateData();

if (error) {
  // Handle general error
  console.error('Data loading error:', error);
}

if (errors.length > 0) {
  // Handle parsing errors
  errors.forEach(error => {
    console.error(`Row ${error.row}: ${error.message}`);
  });
}
```

## Performance Considerations

### Caching
- Data is cached by default to avoid re-parsing
- Cache is keyed by file type and options
- Use `refetch()` to clear cache and reload data

### Large Files
- For very large CSV files, consider streaming or chunking
- Use `clean: false` to skip data cleaning for performance
- Consider implementing virtual scrolling for large datasets

## Testing the Implementation

Visit `/csv-demo` to see a working demo of the CSV parser functionality.

## Best Practices

1. **Use TypeScript interfaces** for type safety
2. **Enable validation** for critical data
3. **Handle loading and error states** in your components
4. **Use caching** for better performance
5. **Clean data** to remove empty rows
6. **Provide user feedback** during data loading

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CSV files are in the `public` directory
2. **Type Errors**: Check that your data matches the TypeScript interfaces
3. **Empty Data**: Verify CSV file paths and structure
4. **Validation Failures**: Check required fields and data format

### Debug Tips

```typescript
// Enable detailed logging
const result = await CSVParser.parseTemplateData();
console.log('Parse result:', result);

// Check metadata
console.log('Fields:', result.meta.fields);
console.log('Delimiter:', result.meta.delimiter);

// Validate data structure
const validation = CSVParser.validateData(result.data, ['lab_profile']);
console.log('Validation:', validation);
``` 