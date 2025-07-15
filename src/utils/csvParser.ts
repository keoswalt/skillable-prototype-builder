import Papa from 'papaparse';
import { 
  TemplateData, 
  LabProfileData, 
  LabSeriesData, 
  LabInstanceData,
  CSVParsingResult,
  CSVFileConfig 
} from '../types/csv';

// CSV file configurations
export const CSV_FILES: Record<string, CSVFileConfig> = {
  template: {
    name: 'template-seed-data.csv',
    path: '/data/template-seed-data.csv',
    type: 'template'
  },
  labProfile: {
    name: 'lab-profile-seed-data.csv',
    path: '/data/lab-profile-seed-data.csv',
    type: 'lab-profile'
  },
  labSeries: {
    name: 'lab-series-seed-data.csv',
    path: '/data/lab-series-seed-data.csv',
    type: 'lab-series'
  },
  labInstance: {
    name: 'lab-instance-seed-data.csv',
    path: '/data/lab-instance-seed-data.csv',
    type: 'lab-instance'
  }
};

// Default PapaParse configuration
const DEFAULT_CONFIG: Papa.ParseConfig = {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.trim(),
  transform: (value) => value.trim()
};

/**
 * Generic CSV parser with type safety
 */
export class CSVParser {
  /**
   * Parse CSV string synchronously
   */
  static parseString<T>(csvString: string, config?: Papa.ParseConfig): CSVParsingResult<T> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const result = Papa.parse(csvString, finalConfig);
    
    return {
      data: result.data as T[],
      errors: result.errors,
      meta: result.meta
    };
  }

  /**
   * Parse CSV file asynchronously
   */
  static parseFile<T>(file: File, config?: Papa.ParseConfig): Promise<CSVParsingResult<T>> {
    return new Promise((resolve, reject) => {
      const finalConfig = { 
        ...DEFAULT_CONFIG, 
        ...config,
        complete: (results: Papa.ParseResult<T>) => {
          resolve({
            data: results.data as T[],
            errors: results.errors,
            meta: results.meta
          });
        },
        error: (error: any) => {
          reject(error);
        }
      };
      
      Papa.parse(file, finalConfig);
    });
  }

  /**
   * Parse CSV from URL (for public files)
   */
  static parseURL<T>(url: string, config?: Papa.ParseConfig): Promise<CSVParsingResult<T>> {
    return new Promise((resolve, reject) => {
      const finalConfig = { 
        ...DEFAULT_CONFIG, 
        download: true, // <-- THIS IS CRITICAL
        ...config,
        complete: (results: Papa.ParseResult<T>) => {
          resolve({
            data: results.data as T[],
            errors: results.errors,
            meta: results.meta
          });
        },
        error: (error: any) => {
          reject(error);
        }
      };
      
      Papa.parse(url as any, finalConfig);
    });
  }

  /**
   * Parse specific CSV file types with proper typing
   */
  static async parseTemplateData(): Promise<CSVParsingResult<TemplateData>> {
    return this.parseURL<TemplateData>(CSV_FILES.template.path);
  }

  static async parseLabProfileData(): Promise<CSVParsingResult<LabProfileData>> {
    return this.parseURL<LabProfileData>(CSV_FILES.labProfile.path);
  }

  static async parseLabSeriesData(): Promise<CSVParsingResult<LabSeriesData>> {
    return this.parseURL<LabSeriesData>(CSV_FILES.labSeries.path);
  }

  static async parseLabInstanceData(): Promise<CSVParsingResult<LabInstanceData>> {
    return this.parseURL<LabInstanceData>(CSV_FILES.labInstance.path);
  }

  /**
   * Parse all CSV files and return combined data
   */
  static async parseAllData() {
    try {
      const [templateResult, profileResult, seriesResult, instanceResult] = await Promise.all([
        this.parseTemplateData(),
        this.parseLabProfileData(),
        this.parseLabSeriesData(),
        this.parseLabInstanceData()
      ]);

      return {
        template: templateResult,
        labProfile: profileResult,
        labSeries: seriesResult,
        labInstance: instanceResult
      };
    } catch (error) {
      console.error('Error parsing CSV files:', error);
      throw error;
    }
  }

  /**
   * Validate CSV data structure
   */
  static validateData<T>(data: T[], requiredFields: string[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!data || data.length === 0) {
      errors.push('No data found in CSV');
      return { isValid: false, errors };
    }

    // Check if all required fields are present in the first row
    const firstRow = data[0] as Record<string, any>;
    const missingFields = requiredFields.filter(field => !(field in firstRow));
    
    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Check for empty required fields
    data.forEach((row, index) => {
      const rowData = row as Record<string, any>;
      requiredFields.forEach(field => {
        if (!rowData[field] || rowData[field].toString().trim() === '') {
          errors.push(`Row ${index + 1}: Empty required field '${field}'`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Clean and transform CSV data
   */
  static cleanData<T>(data: T[]): T[] {
    return data.filter(row => {
      const rowData = row as Record<string, any>;
      // Remove rows where all values are empty or null
      return Object.values(rowData).some(value => 
        value !== null && value !== undefined && value.toString().trim() !== ''
      );
    });
  }
}

// Convenience functions for common use cases
export const parseCSV = CSVParser.parseString;
export const parseCSVFile = CSVParser.parseFile;
export const parseCSVURL = CSVParser.parseURL; 