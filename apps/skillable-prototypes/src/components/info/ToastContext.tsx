'use client';

/**
 * Toast Context
 * 
 * Provides global state management for toast notifications.
 * Handles adding, removing, and queuing of toast messages.
 */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AlertState, AlertVariant } from './Alert';

export interface Toast {
  id: string;
  state: AlertState;
  title?: string;
  description?: string;
  variant?: AlertVariant;
  duration?: number;
  autoDismiss?: boolean;
  onClose?: () => void;
  createdAt: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: { id: string } }
  | { type: 'CLEAR_ALL_TOASTS' };

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Generate unique ID for toasts
const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Toast reducer
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      console.log('Reducer: Removing toast with id:', action.payload.id); // Debug log
      const filteredToasts = state.toasts.filter(toast => toast.id !== action.payload.id);
      console.log('Reducer: Toasts after removal:', filteredToasts.map(t => t.id)); // Debug log
      return {
        ...state,
        toasts: filteredToasts
      };
    case 'CLEAR_ALL_TOASTS':
      return {
        ...state,
        toasts: []
      };
    default:
      return state;
  }
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = (toastData: Omit<Toast, 'id' | 'createdAt'>): string => {
    const id = generateToastId();
    const toast: Toast = {
      ...toastData,
      id,
      createdAt: Date.now()
    };
    
    dispatch({ type: 'ADD_TOAST', payload: toast });
    return id;
  };

  const removeToast = (id: string): void => {
    console.log('removeToast called with id:', id); // Debug log
    console.log('Current toasts before removal:', state.toasts.map(t => t.id)); // Debug log
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  };

  const clearAllToasts = (): void => {
    dispatch({ type: 'CLEAR_ALL_TOASTS' });
  };

  const value: ToastContextType = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearAllToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast context
export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}; 