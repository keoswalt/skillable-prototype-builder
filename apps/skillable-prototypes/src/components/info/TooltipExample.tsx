/**
 * TooltipExample
 * Demonstrates the five arrow-direction variants of the Tooltip component.
 */

import React from 'react';
import Tooltip from './Tooltip';

export const TooltipExample: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 p-8 border-2 border-dashed border-primary-main w-fit">
      <Tooltip content="My Tooltip" direction="none">
        <span className="inline-block bg-softgrey-light rounded-md px-6 py-3">My Tooltip</span>
      </Tooltip>

      <Tooltip content="My Tooltip" direction="top">
        <span className="inline-block bg-softgrey-light rounded-md px-6 py-3">My Tooltip</span>
      </Tooltip>

      <Tooltip content="My Tooltip" direction="bottom">
        <span className="inline-block bg-softgrey-light rounded-md px-6 py-3">My Tooltip</span>
      </Tooltip>

      <Tooltip content="My Tooltip" direction="right">
        <span className="inline-block bg-softgrey-light rounded-md px-6 py-3">My Tooltip</span>
      </Tooltip>

      <Tooltip content="My Tooltip" direction="left">
        <span className="inline-block bg-softgrey-light rounded-md px-6 py-3">My Tooltip</span>
      </Tooltip>
    </div>
  );
};

export default TooltipExample; 