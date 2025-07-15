/**
 * useToast Hook
 * 
 * Provides easy-to-use functions for triggering toast notifications.
 * Integrates with ToastContext for global toast management.
 */
import { useToastContext } from '@/components/info/ToastContext';
import { AlertState, AlertVariant } from '@/components/info/Alert';

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  duration?: number;
  autoDismiss?: boolean;
  onClose?: () => void;
}

export const useToast = () => {
  const { addToast, removeToast, clearAllToasts } = useToastContext();

  const showToast = (
    state: AlertState,
    options: ToastOptions = {}
  ): string => {
    return addToast({
      state,
      ...options
    });
  };

  const success = (options: ToastOptions = {}): string => {
    return showToast('success', options);
  };

  const error = (options: ToastOptions = {}): string => {
    return showToast('error', options);
  };

  const warning = (options: ToastOptions = {}): string => {
    return showToast('warning', options);
  };

  const info = (options: ToastOptions = {}): string => {
    return showToast('info', options);
  };

  return {
    showToast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    clearAll: clearAllToasts
  };
}; 