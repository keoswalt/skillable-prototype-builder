import React from 'react';
import { Divider } from './Divider';

export const DividerExample: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>        
        {/* Horizontal Dividers */}
        <div className="space-y-4 mb-8">
          <h4 className="text-body-lg font-medium text-[var(--components-text-primary)]">
            Horizontal Dividers
          </h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-body-md text-[var(--components-text-secondary)] mb-2">
                Basic horizontal divider:
              </p>
              <div className="p-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
                <p className="text-body-sm text-[var(--components-text-primary)] mb-2">
                  Content above the divider
                </p>
                <Divider variant="horizontal" />
                <p className="text-body-sm text-[var(--components-text-primary)] mt-2">
                  Content below the divider
                </p>
              </div>
            </div>

            <div>
              <p className="text-body-md text-[var(--components-text-secondary)] mb-2">
                Horizontal divider with custom spacing:
              </p>
              <div className="p-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
                <p className="text-body-sm text-[var(--components-text-primary)] mb-4">
                  Content with more space above
                </p>
                <Divider variant="horizontal" className="my-6" />
                <p className="text-body-sm text-[var(--components-text-primary)] mt-4">
                  Content with more space below
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Dividers */}
        <div className="space-y-4 mb-8">
          <h4 className="text-body-lg font-medium text-[var(--components-text-primary)]">
            Vertical Dividers
          </h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-body-md text-[var(--components-text-secondary)] mb-2">
                Basic vertical divider:
              </p>
              <div className="flex items-center p-4 mb-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
                <span className="text-body-sm text-[var(--components-text-primary)]">
                  Left content
                </span>
                <Divider variant="vertical" className="mx-4" />
                <span className="text-body-sm text-[var(--components-text-primary)]">
                  Right content
                </span>
              </div>
              
              <div>
                <p className="text-body-md text-[var(--components-text-secondary)] mb-2">
                  Vertical divider with different content heights:
                </p>
                <div className="flex items-start p-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
                  <div className="text-body-sm text-[var(--components-text-primary)]">
                    <p>Short content</p>
                  </div>
                  <Divider variant="vertical" className="mx-4" />
                  <div className="text-body-sm text-[var(--components-text-primary)]">
                    <p>Longer content that spans multiple lines to demonstrate how the divider stretches to match the tallest sibling element</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-body-md text-[var(--components-text-secondary)] mb-2">
                Vertical divider in navigation:
              </p>
              <div className="flex items-center p-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
                <button className="px-3 py-2 text-body-sm text-[var(--components-text-primary)] hover:bg-[var(--components-background-contrast-sm)] rounded">
                  Home
                </button>
                <Divider variant="vertical" className="mx-2" />
                <button className="px-3 py-2 text-body-sm text-[var(--components-text-primary)] hover:bg-[var(--components-background-contrast-sm)] rounded">
                  About
                </button>
                <Divider variant="vertical" className="mx-2" />
                <button className="px-3 py-2 text-body-sm text-[var(--components-text-primary)] hover:bg-[var(--components-background-contrast-sm)] rounded">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mixed Usage */}
        <div className="space-y-4">
          <h4 className="text-body-lg font-medium text-[var(--components-text-primary)]">
            Mixed Usage Example
          </h4>
          
          <div className="p-4 bg-[var(--components-background-default)] rounded border border-[var(--components-divider-main)]">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-body-md font-medium text-[var(--components-text-primary)]">
                Section Header
              </h5>
              <div className="flex items-center space-x-2">
                <span className="text-body-xs text-[var(--components-text-secondary)]">
                  Actions
                </span>
                <Divider variant="vertical" />
                <button className="text-body-xs text-[var(--components-text-primary)] hover:text-[var(--primary-main)]">
                  Edit
                </button>
              </div>
            </div>
            
            <Divider variant="horizontal" className="mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-body-sm text-[var(--components-text-secondary)]">
                <p>Left column content</p>
              </div>
              <div className="flex items-center">
                <Divider variant="vertical" className="mr-4" />
                <div className="text-body-sm text-[var(--components-text-secondary)]">
                  <p>Right column content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividerExample; 