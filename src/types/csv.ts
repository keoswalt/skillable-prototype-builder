// CSV Data Types based on the structure of your CSV files

export interface TemplateData {
  lab_profile: string;
  series: string;
  organization: string;
  created: string;
  last_modified: string;
  platform: string;
}

export interface LabProfileData {
  lab_profile: string;
  organization: string;
  number: string;
  series: string;
  virtualization_platform: string;
  cloud_platform: string;
  virtualization_platform_2?: string; // Handle duplicate column
  cloud_platform_2?: string; // Handle duplicate column
  created: string;
  last_modified: string;
  status: string;
  platform: string;
}

export interface LabSeriesData {
  series: string;
  organization: string;
  created: string;
  last_modified: string;
  status: string;
  platform: string;
}

export interface LabInstanceData {
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

// Union type for all CSV data types
export type CSVDataType = TemplateData | LabProfileData | LabSeriesData | LabInstanceData;

// Generic CSV parsing result
export interface CSVParsingResult<T> {
  data: T[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

// CSV file configuration
export interface CSVFileConfig {
  name: string;
  path: string;
  type: 'template' | 'lab-profile' | 'lab-series' | 'lab-instance';
} 