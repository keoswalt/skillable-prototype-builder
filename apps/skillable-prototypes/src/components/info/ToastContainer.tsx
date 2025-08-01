'use client';

/**
 * Toast Container
 * 
 * Renders toast notifications in the bottom-left corner of the screen.
 * Handles positioning, stacking, auto-dismiss timing, and animations.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from './Alert';
import { useToastContext, Toast } from './ToastContext';

interface ToastContainerProps {
  maxToasts?: number;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

interface AnimatedToast extends Toast {
  isExiting?: boolean;
  isManualDismiss?: boolean;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  maxToasts = 5,
  position = 'bottom-left'
}) => {
  const { toasts, removeToast } = useToastContext();
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const [animatedToasts, setAnimatedToasts] = useState<AnimatedToast[]>([]);

  // Main effect to handle all toast state changes
  useEffect(() => {
    setAnimatedToasts(prev => {
      // Remove toasts that no longer exist in the context
      const filteredPrev = prev.filter(existingToast => 
        toasts.find(t => t.id === existingToast.id)
      );
      
      const newToasts = toasts.filter(toast => !filteredPrev.find(t => t.id === toast.id));
      
      if (newToasts.length > 0) {
        // Add new toasts with entry animation state
        const updatedToasts = [
          ...filteredPrev,
          ...newToasts.map(toast => ({ ...toast, isExiting: true, isManualDismiss: false }))
        ];
        
        // Trigger entry animations with staggered timing
        newToasts.forEach((toast, index) => {
          setTimeout(() => {
            setAnimatedToasts(current => 
              current.map(t => 
                t.id === toast.id 
                  ? { ...t, isExiting: false }
                  : t
              )
            );
          }, index * 100 + 50); // Stagger by 100ms + 50ms initial delay
        });
        
        return updatedToasts;
      }
      
      // Update existing toasts
      return filteredPrev.map(existingToast => {
        const updatedToast = toasts.find(t => t.id === existingToast.id);
        if (updatedToast) {
          return { ...updatedToast, isExiting: existingToast.isExiting, isManualDismiss: existingToast.isManualDismiss };
        }
        return existingToast;
      });
    });
  }, [toasts]); // Only depend on toasts, not animatedToasts

  // Handle auto-dismiss timeouts
  useEffect(() => {
    // Clear all existing timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();

    // Set up new timeouts for visible toasts
    animatedToasts.forEach((toast) => {
      if (!toast.isExiting && toast.autoDismiss !== false && toast.duration !== 0) {
        const duration = toast.duration || 3000;
        
        const timeout = setTimeout(() => {
          // Check if toast still exists before starting exit animation
          const toastStillExists = toasts.find(t => t.id === toast.id);
          if (!toastStillExists) {
            timeoutRefs.current.delete(toast.id);
            return;
          }
          
          // Start exit animation
          setAnimatedToasts(prev => 
            prev.map(t => 
              t.id === toast.id 
                ? { ...t, isExiting: true }
                : t
            )
          );
          
          // Remove toast after animation completes
          setTimeout(() => {
            removeToast(toast.id);
            timeoutRefs.current.delete(toast.id);
          }, 300);
        }, duration);

        timeoutRefs.current.set(toast.id, timeout);
      }
    });

    // Cleanup function
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, [animatedToasts, removeToast, toasts]);



  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  // Limit the number of visible toasts
  const visibleToasts = animatedToasts.slice(-maxToasts);

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
      default:
        return 'bottom-4 left-4';
    }
  };

  if (visibleToasts.length === 0) {
    return null;
  }

  return (
    <div
      className={`
        fixed z-50 flex flex-col gap-3 pointer-events-none
        ${getPositionClasses()}
      `}
      role="region"
      aria-label="Toast notifications"
      aria-live="polite"
    >
      {visibleToasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
          style={{
            transform: toast.isExiting ? 'translateX(-100%)' : 'translateX(0)',
            opacity: toast.isExiting ? 0 : 1,
            transition: 'all 300ms ease-out',
            animationDelay: toast.isExiting ? '0ms' : `${index * 100}ms`
          }}
        >
          <Alert
            state={toast.state}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            onClose={() => {
              console.log('Manual dismiss clicked for toast:', toast.id); // Debug log
              
              // Clear timeout if exists
              const timeout = timeoutRefs.current.get(toast.id);
              if (timeout) {
                clearTimeout(timeout);
                timeoutRefs.current.delete(toast.id);
              }
              
              // Call custom onClose if provided
              if (toast.onClose) {
                toast.onClose();
              }
              
              // Remove toast immediately for manual dismiss (no animation)
              removeToast(toast.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}; 