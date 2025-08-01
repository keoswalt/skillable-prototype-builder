'use client';

/**
 * Alert Example Component
 * 
 * Demonstrates all variants and states of the Alert component.
 * Shows both filled and outlined styles for error, warning, success, and info states.
 * Also demonstrates toast notification functionality.
 */
import React, { useState } from 'react';
import { Alert } from './Alert';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/buttons/Button';

export const AlertExample: React.FC = () => {
  const [alerts, setAlerts] = useState({
    errorFilled: true,
    warningFilled: true,
    successFilled: true,
    infoFilled: true,
    errorOutlined: true,
    warningOutlined: true,
    successOutlined: true,
    infoOutlined: true,
  });

  const toast = useToast();

  const handleClose = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div className="space-y-6 text_components-text-primary">
      <div>
        <h3 className="text-lg font-semibold mb-4">Alert Component Examples</h3>
        <p className="mb-6">
          Demonstrating all variants and states of the Alert component. Each alert can be dismissed using the close button.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Filled Variants */}
        <div className="space-y-4">
          <h4 className="font-medium">Filled Style</h4>
          
          {alerts.errorFilled && (
            <Alert
              variant="filled"
              state="error"
              title="Error"
              description="Something went wrong. Please try again."
              onClose={() => handleClose('errorFilled')}
            />
          )}

          {alerts.warningFilled && (
            <Alert
              variant="filled"
              state="warning"
              title="Warning"
              description="Please review your input before proceeding."
              onClose={() => handleClose('warningFilled')}
            />
          )}

          {alerts.successFilled && (
            <Alert
              variant="filled"
              state="success"
              title="Success"
              description="Your changes have been saved successfully."
              onClose={() => handleClose('successFilled')}
            />
          )}

          {alerts.infoFilled && (
            <Alert
              variant="filled"
              state="info"
              title="Information"
              description="Here's some helpful information for you."
              onClose={() => handleClose('infoFilled')}
            />
          )}
        </div>

        {/* Outlined Variants */}
        <div className="space-y-4">
          <h4 className="font-medium">Outlined Style</h4>
          
          {alerts.errorOutlined && (
            <Alert
              variant="outlined"
              state="error"
              title="Error"
              description="Something went wrong. Please try again."
              onClose={() => handleClose('errorOutlined')}
            />
          )}

          {alerts.warningOutlined && (
            <Alert
              variant="outlined"
              state="warning"
              title="Warning"
              description="Please review your input before proceeding."
              onClose={() => handleClose('warningOutlined')}
            />
          )}

          {alerts.successOutlined && (
            <Alert
              variant="outlined"
              state="success"
              title="Success"
              description="Your changes have been saved successfully."
              onClose={() => handleClose('successOutlined')}
            />
          )}

          {alerts.infoOutlined && (
            <Alert
              variant="outlined"
              state="info"
              title="Information"
              description="Here's some helpful information for you."
              onClose={() => handleClose('infoOutlined')}
            />
          )}
        </div>
      </div>

      {/* Additional Examples */}
      <div className="space-y-4">
        <h4 className="font-medium">Additional Examples</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alert with only title */}
          <Alert
            variant="filled"
            state="warning"
            title="Title Only Alert"
            onClose={() => {}}
          />

          {/* Alert with only description */}
          <Alert
            variant="outlined"
            state="info"
            description="This alert only has a description and no title."
            onClose={() => {}}
          />

          {/* Alert without close button */}
          <Alert
            variant="filled"
            state="success"
            title="No Close Button"
            description="This alert cannot be dismissed."
          />

          {/* Alert with custom icon */}
          <Alert
            variant="outlined"
            state="error"
            title="Custom Icon"
            description="This alert uses a custom icon instead of the default."
            icon={<span className="w-5 h-5 text-red-600">🚨</span>}
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Toast Demonstration */}
      <div className="space-y-4">
        <h4 className="font-headline text-heading-xs font-medium">Toast Notifications</h4>
        <p className="mb-4">
          Click the buttons below to trigger toast notifications. Toasts will appear in the bottom-left corner and auto-dismiss after 3 seconds.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="success"
            onClick={() => toast.success({
              title: 'Success!',
              description: 'Your action was completed successfully.'
            })}
          >
            Success Toast
          </Button>
          
          <Button
            variant="error"
            onClick={() => toast.error({
              title: 'Error',
              description: 'Something went wrong. Please try again.'
            })}
          >
            Error Toast
          </Button>
          
          <Button
            variant="warning"
            onClick={() => toast.warning({
              title: 'Warning',
              description: 'Please review your input before proceeding.'
            })}
          >
            Warning Toast
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => toast.info({
              title: 'Information',
              description: 'Here\'s some helpful information for you.'
            })}
          >
            Info Toast
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="primary"
            onClick={() => toast.success({
              title: 'Custom Duration',
              description: 'This toast will stay for 10 seconds.',
              duration: 10000
            })}
          >
            Long Duration Toast
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.info({
              title: 'No Auto-dismiss',
              description: 'This toast will stay until manually dismissed.',
              autoDismiss: false
            })}
          >
            Persistent Toast
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => {
              toast.success({ title: 'Toast 1', description: 'First toast' });
              setTimeout(() => toast.warning({ title: 'Toast 2', description: 'Second toast' }), 500);
              setTimeout(() => toast.error({ title: 'Toast 3', description: 'Third toast' }), 1000);
            }}
          >
            Show Multiple Toasts
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => toast.clearAll()}
          >
            Clear All Toasts
          </Button>
        </div>
      </div>
    </div>
  );
}; 