import React from 'react';
import { Button } from './Button';

export const ButtonExample: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Large Size */}
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Large Size</h3>
        <div className="flex flex-col gap-4">
          {/* With both icons */}
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary" leftIcon="add" rightIcon="chevronRight" onClick={handleClick}>Primary</Button>
            <Button size="large" variant="secondary" leftIcon="add" rightIcon="chevronRight">Secondary</Button>
            <Button size="large" variant="warning" leftIcon="alert" rightIcon="chevronRight">Warning</Button>
            <Button size="large" variant="error" leftIcon="alert" rightIcon="chevronRight">Error</Button>
            <Button size="large" variant="success" leftIcon="check" rightIcon="chevronRight">Success</Button>
            <Button size="large" variant="outline" leftIcon="add" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* With left icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary" leftIcon="add">Primary</Button>
            <Button size="large" variant="secondary" leftIcon="user">Secondary</Button>
            <Button size="large" variant="warning" leftIcon="alert">Warning</Button>
            <Button size="large" variant="error" leftIcon="alert">Error</Button>
            <Button size="large" variant="success" leftIcon="check">Success</Button>
            <Button size="large" variant="outline" leftIcon="add">Outline</Button>
          </div>

          {/* With right icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary" rightIcon="chevronRight">Primary</Button>
            <Button size="large" variant="secondary" rightIcon="chevronRight">Secondary</Button>
            <Button size="large" variant="warning" rightIcon="chevronRight">Warning</Button>
            <Button size="large" variant="error" rightIcon="chevronRight">Error</Button>
            <Button size="large" variant="success" rightIcon="chevronRight">Success</Button>
            <Button size="large" variant="outline" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* Text only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary">Primary</Button>
            <Button size="large" variant="secondary">Secondary</Button>
            <Button size="large" variant="warning">Warning</Button>
            <Button size="large" variant="error">Error</Button>
            <Button size="large" variant="success">Success</Button>
            <Button size="large" variant="outline">Outline</Button>
          </div>

          {/* Disabled state */}
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary" disabled leftIcon="add" rightIcon="chevronRight">Primary</Button>
            <Button size="large" variant="secondary" disabled rightIcon="chevronRight">Secondary</Button>
            <Button size="large" variant="warning" disabled>Warning</Button>
            <Button size="large" variant="error" disabled>Error</Button>
            <Button size="large" variant="success" disabled>Success</Button>
            <Button size="large" variant="outline" disabled>Outline</Button>
          </div>
        </div>
      </div>

      {/* Medium Size */}
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Medium Size (Default)</h3>
        <div className="flex flex-col gap-4">
          {/* With both icons */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" leftIcon="add" rightIcon="chevronRight" onClick={handleClick}>Primary</Button>
            <Button variant="secondary" leftIcon="add" rightIcon="chevronRight">Secondary</Button>
            <Button variant="warning" leftIcon="alert" rightIcon="chevronRight">Warning</Button>
            <Button variant="error" leftIcon="alert" rightIcon="chevronRight">Error</Button>
            <Button variant="success" leftIcon="check" rightIcon="chevronRight">Success</Button>
            <Button variant="outline" leftIcon="add" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* With left icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" leftIcon="add">Primary</Button>
            <Button variant="secondary" leftIcon="user">Secondary</Button>
            <Button variant="warning" leftIcon="alert">Warning</Button>
            <Button variant="error" leftIcon="alert">Error</Button>
            <Button variant="success" leftIcon="check">Success</Button>
            <Button variant="outline" leftIcon="add">Outline</Button>
          </div>

          {/* With right icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" rightIcon="chevronRight">Primary</Button>
            <Button variant="secondary" rightIcon="chevronRight">Secondary</Button>
            <Button variant="warning" rightIcon="chevronRight">Warning</Button>
            <Button variant="error" rightIcon="chevronRight">Error</Button>
            <Button variant="success" rightIcon="chevronRight">Success</Button>
            <Button variant="outline" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* Text only */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
            <Button variant="success">Success</Button>
            <Button variant="outline">Outline</Button>
          </div>

          {/* Disabled state */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" disabled leftIcon="add" rightIcon="chevronRight">Primary</Button>
            <Button variant="secondary" disabled rightIcon="chevronRight">Secondary</Button>
            <Button variant="warning" disabled>Warning</Button>
            <Button variant="error" disabled>Error</Button>
            <Button variant="success" disabled>Success</Button>
            <Button variant="outline" disabled>Outline</Button>
          </div>
        </div>
      </div>

      {/* Small Size */}
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Small Size</h3>
        <div className="flex flex-col gap-4">
          {/* With both icons */}
          <div className="flex gap-4 flex-wrap">
            <Button size="small" variant="primary" leftIcon="add" rightIcon="chevronRight" onClick={handleClick}>Primary</Button>
            <Button size="small" variant="secondary" leftIcon="add" rightIcon="chevronRight">Secondary</Button>
            <Button size="small" variant="warning" leftIcon="alert" rightIcon="chevronRight">Warning</Button>
            <Button size="small" variant="error" leftIcon="alert" rightIcon="chevronRight">Error</Button>
            <Button size="small" variant="success" leftIcon="check" rightIcon="chevronRight">Success</Button>
            <Button size="small" variant="outline" leftIcon="add" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* With left icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="small" variant="primary" leftIcon="add">Primary</Button>
            <Button size="small" variant="secondary" leftIcon="user">Secondary</Button>
            <Button size="small" variant="warning" leftIcon="alert">Warning</Button>
            <Button size="small" variant="error" leftIcon="alert">Error</Button>
            <Button size="small" variant="success" leftIcon="check">Success</Button>
            <Button size="small" variant="outline" leftIcon="add">Outline</Button>
          </div>

          {/* With right icon only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="small" variant="primary" rightIcon="chevronRight">Primary</Button>
            <Button size="small" variant="secondary" rightIcon="chevronRight">Secondary</Button>
            <Button size="small" variant="warning" rightIcon="chevronRight">Warning</Button>
            <Button size="small" variant="error" rightIcon="chevronRight">Error</Button>
            <Button size="small" variant="success" rightIcon="chevronRight">Success</Button>
            <Button size="small" variant="outline" rightIcon="chevronRight">Outline</Button>
          </div>

          {/* Text only */}
          <div className="flex gap-4 flex-wrap">
            <Button size="small" variant="primary">Primary</Button>
            <Button size="small" variant="secondary">Secondary</Button>
            <Button size="small" variant="warning">Warning</Button>
            <Button size="small" variant="error">Error</Button>
            <Button size="small" variant="success">Success</Button>
            <Button size="small" variant="outline">Outline</Button>
          </div>

          {/* Disabled state */}
          <div className="flex gap-4 flex-wrap">
            <Button size="small" variant="primary" disabled leftIcon="add" rightIcon="chevronRight">Primary</Button>
            <Button size="small" variant="secondary" disabled rightIcon="chevronRight">Secondary</Button>
            <Button size="small" variant="warning" disabled>Warning</Button>
            <Button size="small" variant="error" disabled>Error</Button>
            <Button size="small" variant="success" disabled>Success</Button>
            <Button size="small" variant="outline" disabled>Outline</Button>
          </div>
        </div>
      </div>
      {/* Text-only Variant */}
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Text-only Variant</h3>
        <div className="flex flex-col gap-4">
          {/* Large Size */}
          <div>
            <div className="mb-2 font-medium">Large</div>
            <div className="flex gap-4 flex-wrap">
              <Button size="large" variant="text" color="primary">Primary</Button>
              <Button size="large" variant="text" color="secondary">Secondary</Button>
              <Button size="large" variant="text" color="warning">Warning</Button>
              <Button size="large" variant="text" color="error">Error</Button>
              <Button size="large" variant="text" color="success">Success</Button>
              <Button size="large" variant="text" color="outline">Outline</Button>
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              <Button size="large" variant="text" color="primary" leftIcon="add">Primary</Button>
              <Button size="large" variant="text" color="secondary" leftIcon="user">Secondary</Button>
              <Button size="large" variant="text" color="warning" leftIcon="alert">Warning</Button>
              <Button size="large" variant="text" color="error" leftIcon="alert">Error</Button>
              <Button size="large" variant="text" color="success" leftIcon="check">Success</Button>
              <Button size="large" variant="text" color="outline" leftIcon="check">Outline</Button>
            </div>
          </div>
          {/* Medium Size */}
          <div>
            <div className="mb-2 font-medium">Medium</div>
            <div className="flex gap-4 flex-wrap">
              <Button variant="text" color="primary">Primary</Button>
              <Button variant="text" color="secondary">Secondary</Button>
              <Button variant="text" color="warning">Warning</Button>
              <Button variant="text" color="error">Error</Button>
              <Button variant="text" color="success">Success</Button>
              <Button variant="text" color="outline">Outline</Button>
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              <Button variant="text" color="primary" leftIcon="add">Primary</Button>
              <Button variant="text" color="secondary" leftIcon="user">Secondary</Button>
              <Button variant="text" color="warning" leftIcon="alert">Warning</Button>
              <Button variant="text" color="error" leftIcon="alert">Error</Button>
              <Button variant="text" color="success" leftIcon="check">Success</Button>
              <Button variant="text" color="outline" leftIcon="check">Outline</Button>
            </div>
          </div>
          {/* Small Size */}
          <div>
            <div className="mb-2 font-medium">Small</div>
            <div className="flex gap-4 flex-wrap">
              <Button size="small" variant="text" color="primary">Primary</Button>
              <Button size="small" variant="text" color="secondary">Secondary</Button>
              <Button size="small" variant="text" color="warning">Warning</Button>
              <Button size="small" variant="text" color="error">Error</Button>
              <Button size="small" variant="text" color="success">Success</Button>
              <Button size="small" variant="text" color="outline">Outline</Button>
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              <Button size="small" variant="text" color="primary" leftIcon="add">Primary</Button>
              <Button size="small" variant="text" color="secondary" leftIcon="user">Secondary</Button>
              <Button size="small" variant="text" color="warning" leftIcon="alert">Warning</Button>
              <Button size="small" variant="text" color="error" leftIcon="alert">Error</Button>
              <Button size="small" variant="text" color="success" leftIcon="check">Success</Button>
              <Button size="small" variant="text" color="outline" leftIcon="check">Outline</Button>
            </div>
          </div>
        </div>
      </div>
{/* Icon Only */}
        <div className="flex gap-4 flex-wrap items-center">
                <div className="flex flex-col gap-4 p-4">
              <h3 className="font-headline text-heading-xs mb-4">Icon-only Buttons</h3>
                <div className="flex gap-4 flex-wrap items-center">
                  <Button variant="icon" size="small" leftIcon="add" aria-label="Add" />
                  <Button variant="icon" size="medium" leftIcon="user" aria-label="User" />
                  <Button variant="icon" size="large" leftIcon="check" aria-label="Confirm" />
                  <Button variant="icon" size="medium" leftIcon="alert" disabled aria-label="Alert" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default ButtonExample;

// Icon-only buttons preview – quickly showcase the new variant
// (Placed here to keep the example component self-contained)
export const IconOnlyButtonPreview: React.FC = () => (
  <div className="flex flex-col gap-4 p-4">
    <h3 className="font-headline text-heading-xs mb-4">Icon-only Buttons</h3>
    <div className="flex gap-4 flex-wrap items-center">
      <Button variant="icon" size="small" leftIcon="add" aria-label="Add" />
      <Button variant="icon" size="medium" leftIcon="user" aria-label="User" />
      <Button variant="icon" size="large" leftIcon="check" aria-label="Confirm" />
      <Button variant="icon" size="medium" leftIcon="alert" disabled aria-label="Alert" />
    </div>
  </div>
); 