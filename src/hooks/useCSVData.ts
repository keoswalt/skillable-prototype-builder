'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CSVParser, CSV_FILES } from '../utils/csvParser';
import { 
  TemplateData, 
  LabProfileData, 
  LabSeriesData, 
  LabInstanceData,
  CSVParsingResult 
} from '../types/csv';

interface UseCSVDataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  meta: Papa.ParseMeta | null;
  errors: Papa.ParseError[];
}

interface UseCSVDataOptions {
  cache?: boolean;
  validate?: boolean;
  requiredFields?: string[];
  clean?: boolean;
}

/**
 * React hook for loading and managing CSV data
 */
export function useCSVData<T>(
  fileType: keyof typeof CSV_FILES,
  options: UseCSVDataOptions = {}
): UseCSVDataState<T> & { refetch: () => Promise<void> } {
  const { cache = true, validate = false, requiredFields = [], clean = true } = options;

  // Memoize requiredFields to avoid unnecessary effect triggers
  const memoizedRequiredFields = useMemo(() => requiredFields, [JSON.stringify(requiredFields)]);

  const [state, setState] = useState<UseCSVDataState<T>>({
    data: [],
    loading: true,
    error: null,
    meta: null,
    errors: []
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      let result: CSVParsingResult<T>;
      switch (fileType) {
        case 'template':
          result = (await CSVParser.parseTemplateData()) as CSVParsingResult<T>;
          break;
        case 'labProfile':
          result = (await CSVParser.parseLabProfileData()) as CSVParsingResult<T>;
          break;
        case 'labSeries':
          result = (await CSVParser.parseLabSeriesData()) as CSVParsingResult<T>;
          break;
        case 'labInstance':
          result = (await CSVParser.parseLabInstanceData()) as CSVParsingResult<T>;
          break;
        default:
          throw new Error(`Unknown file type: ${fileType}`);
      }
      let processedData = result.data;
      if (clean) {
        processedData = CSVParser.cleanData(processedData);
      }
      if (validate && memoizedRequiredFields.length > 0) {
        const validation = CSVParser.validateData(processedData, memoizedRequiredFields);
        if (!validation.isValid) {
          throw new Error(`Data validation failed: ${validation.errors.join(', ')}`);
        }
      }
      setState({
        data: processedData,
        loading: false,
        error: null,
        meta: result.meta,
        errors: result.errors
      });
    } catch (error) {
      setState({
        data: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        meta: null,
        errors: []
      });
    }
  }, [fileType, validate, memoizedRequiredFields, clean]);

  useEffect(() => {
    loadData();
     
  }, [loadData]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { ...state, refetch };
}

// Specialized hooks for each data type
export function useTemplateData(options?: UseCSVDataOptions) {
  return useCSVData<TemplateData>('template', options);
}

export function useLabProfileData(options?: UseCSVDataOptions) {
  return useCSVData<LabProfileData>('labProfile', options);
}

export function useLabSeriesData(options?: UseCSVDataOptions) {
  return useCSVData<LabSeriesData>('labSeries', options);
}

export function useLabInstanceData(options?: UseCSVDataOptions) {
  return useCSVData<LabInstanceData>('labInstance', options);
}

/**
 * Hook to load all CSV data at once
 */
export function useAllCSVData(options?: UseCSVDataOptions) {
  const { clean = true } = options || {};
  const [state, setState] = useState<{
    data: {
      template: TemplateData[];
      labProfile: LabProfileData[];
      labSeries: LabSeriesData[];
      labInstance: LabInstanceData[];
    };
    loading: boolean;
    error: string | null;
  }>({
    data: {
      template: [],
      labProfile: [],
      labSeries: [],
      labInstance: []
    },
    loading: true,
    error: null
  });

  const loadAllData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await CSVParser.parseAllData();
      setState({
        data: {
          template: clean ? CSVParser.cleanData(result.template.data) : result.template.data,
          labProfile: clean ? CSVParser.cleanData(result.labProfile.data) : result.labProfile.data,
          labSeries: clean ? CSVParser.cleanData(result.labSeries.data) : result.labSeries.data,
          labInstance: clean ? CSVParser.cleanData(result.labInstance.data) : result.labInstance.data
        },
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }, [clean]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return { ...state, refetch: loadAllData };
} 