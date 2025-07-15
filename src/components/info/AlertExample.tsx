/**
 * Alert Example Component
 * 
 * Demonstrates all variants and states of the Alert component.
 * Shows both filled and outlined styles for error, warning, success, and info states.
 */
import React, { useState } from 'react';
import { Alert } from './Alert';

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
    </div>
  );
}; 