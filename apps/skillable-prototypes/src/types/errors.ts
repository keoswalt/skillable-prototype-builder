/*************************
 * Error Types
 * Custom error types for dashboard operations
 *************************/

// Base error class for dashboard operations
export class DashboardError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'DashboardError';
    this.code = code;
    this.context = context;
  }
}

// Specific error types for different operations
export class DataTransformationError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'DATA_TRANSFORMATION_ERROR', context);
    this.name = 'DataTransformationError';
  }
}

export class CSVParseError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'CSV_PARSE_ERROR', context);
    this.name = 'CSVParseError';
  }
}

export class ValidationError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', context);
    this.name = 'ValidationError';
  }
}

export class StateManagementError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'STATE_MANAGEMENT_ERROR', context);
    this.name = 'StateManagementError';
  }
}

export class PaginationError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'PAGINATION_ERROR', context);
    this.name = 'PaginationError';
  }
}

export class SortingError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'SORTING_ERROR', context);
    this.name = 'SortingError';
  }
}

export class FilteringError extends DashboardError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'FILTERING_ERROR', context);
    this.name = 'FilteringError';
  }
}

// Error codes enum for better type safety
export enum ErrorCodes {
  DATA_TRANSFORMATION_ERROR = 'DATA_TRANSFORMATION_ERROR',
  CSV_PARSE_ERROR = 'CSV_PARSE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  STATE_MANAGEMENT_ERROR = 'STATE_MANAGEMENT_ERROR',
  PAGINATION_ERROR = 'PAGINATION_ERROR',
  SORTING_ERROR = 'SORTING_ERROR',
  FILTERING_ERROR = 'FILTERING_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Error context types for better type safety
export interface DataTransformationErrorContext {
  dataType: string;
  transformationFunction: string;
  inputData?: unknown;
  expectedType?: string;
}

export interface CSVParseErrorContext {
  fileName?: string;
  lineNumber?: number;
  columnName?: string;
  rawData?: string;
}

export interface ValidationErrorContext {
  fieldName?: string;
  value?: unknown;
  expectedType?: string;
  validationRule?: string;
}

export interface StateManagementErrorContext {
  stateKey?: string;
  operation?: string;
  currentState?: unknown;
  newState?: unknown;
}

export interface PaginationErrorContext {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  requestedPage?: number;
}

export interface SortingErrorContext {
  sortField?: string;
  sortDirection?: string;
  dataType?: string;
  itemCount?: number;
}

export interface FilteringErrorContext {
  filterColumn?: string;
  filterOperator?: string;
  filterValue?: unknown;
  dataType?: string;
}

// Utility function to create typed errors
export function createDashboardError<T extends DashboardError>(
  ErrorClass: new (message: string, context?: Record<string, unknown>) => T,
  message: string,
  context?: Record<string, unknown>
): T {
  return new ErrorClass(message, context);
}

// Error handler type for better error handling
export type ErrorHandler<T = void> = (error: DashboardError) => T;

// Error result type for operations that can fail
export type Result<T, E extends DashboardError = DashboardError> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Utility function to create success result
export function createSuccessResult<T>(data: T): Result<T> {
  return { success: true, data };
}

// Utility function to create error result
export function createErrorResult<T, E extends DashboardError>(error: E): Result<T, E> {
  return { success: false, error };
}

// Error logging interface
export interface ErrorLogger {
  logError(error: DashboardError): void;
  logWarning(message: string, context?: Record<string, unknown>): void;
  logInfo(message: string, context?: Record<string, unknown>): void;
}

// Default error logger implementation
export class ConsoleErrorLogger implements ErrorLogger {
  logError(error: DashboardError): void {
    console.error(`[${error.code}] ${error.name}:`, error.message, error.context);
  }

  logWarning(message: string, context?: Record<string, unknown>): void {
    console.warn(`[WARNING] ${message}`, context);
  }

  logInfo(message: string, context?: Record<string, unknown>): void {
    console.info(`[INFO] ${message}`, context);
  }
} 