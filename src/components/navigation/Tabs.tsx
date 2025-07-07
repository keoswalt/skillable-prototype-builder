'use client';

/**
 * Tabs Component
 * ---------------------------------------------
 * A reusable tab navigation component that supports horizontal (default)
 * and vertical orientations. When the tab list exceeds its container, arrow
 * buttons appear that scroll the list (left/right for horizontal,
 * up/down for vertical). The component is fully accessible and keyboard
 * navigable (WAI-ARIA practices) and uses the project's Tailwind CSS design
 * tokens for consistent styling.
 *
 * Props:
 *  - items: Array<{ id: string; label: React.ReactNode; content: React.ReactNode }>
 *  - orientation?: 'horizontal' | 'vertical'  (default 'horizontal')
 *  - defaultIndex?: number                     (default 0)
 *  - onChange?: (index: number, id: string) => void
 *  - className?: string                        (optional utility classes)
 *
 * Usage:
 *  <Tabs
 *    items={tabsArray}
 *    orientation="vertical"
 *    onChange={(idx, id) => console.log(idx, id)}
 *  />
 */

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Icon, Icons } from '../Icon';

// --------------------------------------------------
// Types
// --------------------------------------------------
export type TabItem = {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

export interface TabsProps {
  items: TabItem[];
  orientation?: 'horizontal' | 'vertical';
  defaultIndex?: number;
  onChange?(index: number, id: string): void;
  className?: string;
}

// --------------------------------------------------
// Component
// --------------------------------------------------
export const Tabs: React.FC<TabsProps> = ({
  items,
  orientation = 'horizontal',
  defaultIndex = 0,
  onChange,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const listRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const isHorizontal = orientation === 'horizontal';

  // --------------------------------------------------
  // Handle visibility of scroll arrow buttons
  // --------------------------------------------------
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const updateButtons = () => {
      if (isHorizontal) {
        setShowPrev(container.scrollLeft > 0);
        setShowNext(container.scrollLeft + container.clientWidth < container.scrollWidth);
      } else {
        setShowPrev(container.scrollTop > 0);
        setShowNext(container.scrollTop + container.clientHeight < container.scrollHeight);
      }
    };

    updateButtons();
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    return () => {
      container.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [items.length, isHorizontal]);

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  const scrollBy = (direction: 'prev' | 'next') => {
    const container = listRef.current;
    if (!container) return;

    const distance = isHorizontal ? container.clientWidth * 0.8 : container.clientHeight * 0.8;
    const delta = direction === 'prev' ? -distance : distance;

    container.scrollBy({
      left: isHorizontal ? delta : 0,
      top: isHorizontal ? 0 : delta,
      behavior: 'smooth',
    });
  };

  const selectTab = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    onChange?.(index, items[index].id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    let newIndex = index;
    if (e.key === 'ArrowRight' && isHorizontal) newIndex = (index + 1) % items.length;
    if (e.key === 'ArrowLeft' && isHorizontal) newIndex = (index - 1 + items.length) % items.length;
    if (e.key === 'ArrowDown' && !isHorizontal) newIndex = (index + 1) % items.length;
    if (e.key === 'ArrowUp' && !isHorizontal) newIndex = (index - 1 + items.length) % items.length;
    if (e.key === 'Home') newIndex = 0;
    if (e.key === 'End') newIndex = items.length - 1;

    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[newIndex]?.focus();
    selectTab(newIndex);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <div className={`${isHorizontal ? 'w-full' : 'flex'} ${className}`}>
      {/* Tab list + arrows wrapper */}
      <div className={`relative ${isHorizontal ? 'flex items-center' : 'flex flex-col'} ${isHorizontal ? '' : 'shrink-0'}`}>
        {/* Prev Arrow */}
        {showPrev && (
          <button
            type="button"
            onClick={() => scrollBy('prev')}
            aria-label={isHorizontal ? 'Scroll left' : 'Scroll up'}
            className={`
              absolute z-10 p-1 rounded-[5px] hover:bg-softgrey-light transition-colors
              ${isHorizontal ? 'left-0 top-1/2 -translate-y-1/2' : 'top-0 left-1/2 -translate-x-1/2'}
            `}
          >
            <Icon
              icon={Icons[isHorizontal ? 'chevronLeft' : 'chevronUp']}
              size={20}
              className="text-hardgrey-main"
            />
          </button>
        )}

        {/* Tablist */}
        <div
          ref={listRef}
          role="tablist"
          aria-orientation={orientation}
          className={`
            scroll-smooth no-scrollbar
            ${isHorizontal ? 'flex overflow-x-auto space-x-0 pl-2 pr-2' : 'flex flex-col items-start overflow-y-auto space-y-4 pt-8 pb-8'}
          `}
        >
          {items.map((tab, index) => {
            const isActive = index === activeIndex;
            const common = `whitespace-nowrap font-primary font-medium text-body-sm transition-colors focus:outline-none`;
            const baseBorder = isHorizontal ? 'border-b-2' : 'border-r-2';

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={`
                  ${common}
                  ${isHorizontal ? 'pt-5 pb-3 px-4' : 'pt-2 pb-2 px-4 text-left'}
                  ${baseBorder}
                  ${isActive ? 'border-primary-main text-_components-text-primary' : 'border-transparent text-_components-text-primary hover:text-hardgrey-dark'}
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        {showNext && (
          <button
            type="button"
            onClick={() => scrollBy('next')}
            aria-label={isHorizontal ? 'Scroll right' : 'Scroll down'}
            className={`
              absolute z-10 p-1 rounded-[5px] hover:bg-softgrey-light transition-colors
              ${isHorizontal ? 'right-0 top-1/2 -translate-y-1/2' : 'bottom-0 left-1/2 -translate-x-1/2'}
            `}
          >
            <Icon
              icon={Icons[isHorizontal ? 'chevronRight' : 'chevronDown']}
              size={20}
              className="text-hardgrey-main"
            />
          </button>
        )}
      </div>

      {/* Panel */}
      <div
        id={`${items[activeIndex].id}-panel`}
        role="tabpanel"
        className={isHorizontal ? 'mt-4 w-full' : 'ml-6 mt-6 flex-1'}
      >
        {items[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs; 