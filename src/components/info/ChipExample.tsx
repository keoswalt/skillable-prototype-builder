import React from 'react';
import Chip from './Chip';

export const ChipExample: React.FC = () => {
  const handleDelete = () => {
    console.log('Delete clicked');
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Default Size</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            <Chip icon="info">Default Chip</Chip>
            <Chip variant="primary" icon="check" onDelete={handleDelete}>Primary</Chip>
            <Chip variant="secondary" icon="user" onDelete={handleDelete}>Secondary</Chip>
            <Chip variant="warning" icon="alert" onDelete={handleDelete}>Warning</Chip>
            <Chip variant="error" icon="alert" onDelete={handleDelete}>Error</Chip>
            <Chip variant="success" icon="check" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without icons */}
          <div className="flex gap-4 flex-wrap">
            <Chip onDelete={handleDelete}>Default</Chip>
            <Chip variant="primary" onDelete={handleDelete}>Primary</Chip>
            <Chip variant="secondary" onDelete={handleDelete}>Secondary</Chip>
            <Chip variant="warning" onDelete={handleDelete}>Warning</Chip>
            <Chip variant="error" onDelete={handleDelete}>Error</Chip>
            <Chip variant="success" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without delete button */}
          <div className="flex gap-4 flex-wrap">
            <Chip icon="info">Default</Chip>
            <Chip variant="primary" icon="check">Primary</Chip>
            <Chip variant="secondary" icon="user">Secondary</Chip>
            <Chip variant="warning" icon="alert">Warning</Chip>
            <Chip variant="error" icon="alert">Error</Chip>
            <Chip variant="success" icon="check">Success</Chip>
          </div>

          {/* Text only examples */}
          <div className="flex gap-4 flex-wrap">
            <Chip>Default</Chip>
            <Chip variant="primary">Primary</Chip>
            <Chip variant="secondary">Secondary</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="error">Error</Chip>
            <Chip variant="success">Success</Chip>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-headline text-heading-xs mb-4">Small Size</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            <Chip size="small" icon="info">Default Chip</Chip>
            <Chip size="small" variant="primary" icon="check" onDelete={handleDelete}>Primary</Chip>
            <Chip size="small" variant="secondary" icon="user" onDelete={handleDelete}>Secondary</Chip>
            <Chip size="small" variant="warning" icon="alert" onDelete={handleDelete}>Warning</Chip>
            <Chip size="small" variant="error" icon="alert" onDelete={handleDelete}>Error</Chip>
            <Chip size="small" variant="success" icon="check" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without icons */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="small" onDelete={handleDelete}>Default</Chip>
            <Chip size="small" variant="primary" onDelete={handleDelete}>Primary</Chip>
            <Chip size="small" variant="secondary" onDelete={handleDelete}>Secondary</Chip>
            <Chip size="small" variant="warning" onDelete={handleDelete}>Warning</Chip>
            <Chip size="small" variant="error" onDelete={handleDelete}>Error</Chip>
            <Chip size="small" variant="success" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without delete button */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="small" icon="info">Default</Chip>
            <Chip size="small" variant="primary" icon="check">Primary</Chip>
            <Chip size="small" variant="secondary" icon="user">Secondary</Chip>
            <Chip size="small" variant="warning" icon="alert">Warning</Chip>
            <Chip size="small" variant="error" icon="alert">Error</Chip>
            <Chip size="small" variant="success" icon="check">Success</Chip>
          </div>

          {/* Text only examples */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="small">Default</Chip>
            <Chip size="small" variant="primary">Primary</Chip>
            <Chip size="small" variant="secondary">Secondary</Chip>
            <Chip size="small" variant="warning">Warning</Chip>
            <Chip size="small" variant="error">Error</Chip>
            <Chip size="small" variant="success">Success</Chip>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-headline text-heading-xs mb-4">Extra Small Size</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            <Chip size="extra-small" icon="info">Default Chip</Chip>
            <Chip size="extra-small" variant="primary" icon="check" onDelete={handleDelete}>Primary</Chip>
            <Chip size="extra-small" variant="secondary" icon="user" onDelete={handleDelete}>Secondary</Chip>
            <Chip size="extra-small" variant="warning" icon="alert" onDelete={handleDelete}>Warning</Chip>
            <Chip size="extra-small" variant="error" icon="alert" onDelete={handleDelete}>Error</Chip>
            <Chip size="extra-small" variant="success" icon="check" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without icons */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="extra-small" onDelete={handleDelete}>Default</Chip>
            <Chip size="extra-small" variant="primary" onDelete={handleDelete}>Primary</Chip>
            <Chip size="extra-small" variant="secondary" onDelete={handleDelete}>Secondary</Chip>
            <Chip size="extra-small" variant="warning" onDelete={handleDelete}>Warning</Chip>
            <Chip size="extra-small" variant="error" onDelete={handleDelete}>Error</Chip>
            <Chip size="extra-small" variant="success" onDelete={handleDelete}>Success</Chip>
          </div>

          {/* Examples without delete button */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="extra-small" icon="info">Default</Chip>
            <Chip size="extra-small" variant="primary" icon="check">Primary</Chip>
            <Chip size="extra-small" variant="secondary" icon="user">Secondary</Chip>
            <Chip size="extra-small" variant="warning" icon="alert">Warning</Chip>
            <Chip size="extra-small" variant="error" icon="alert">Error</Chip>
            <Chip size="extra-small" variant="success" icon="check">Success</Chip>
          </div>

          {/* Text only examples */}
          <div className="flex gap-4 flex-wrap">
            <Chip size="extra-small">Default</Chip>
            <Chip size="extra-small" variant="primary">Primary</Chip>
            <Chip size="extra-small" variant="secondary">Secondary</Chip>
            <Chip size="extra-small" variant="warning">Warning</Chip>
            <Chip size="extra-small" variant="error">Error</Chip>
            <Chip size="extra-small" variant="success">Success</Chip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipExample; 