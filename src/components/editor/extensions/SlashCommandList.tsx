import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { SlashCommandListRef, SlashCommandListProps, SlashCommandItem } from '../types';

const SlashCommandList = forwardRef<SlashCommandListRef, SlashCommandListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const componentRef = useRef<HTMLDivElement>(null);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex(
            (selectedIndex + props.items.length - 1) % props.items.length
          );
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % props.items.length);
          return true;
        }
        if (event.key === 'Enter') {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
      selectItem,
      getSelectedIndex: () => selectedIndex,
    }));

    useEffect(() => {
      setSelectedIndex(0);
    }, [props.items]);

    return (
      <div
        ref={componentRef}
        className="rounded shadow-lg border border-text-primary text-sm p-1 bg-editor-slash-command-background text-editor-slash-command-text"
      >
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-3 py-1 rounded hover:bg-editor-slash-command-hover-background ${
                index === selectedIndex ? 'bg-editor-slash-command-selected-background' : ''
              }`}
              onClick={() => selectItem(index)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <div className="p-2">No results</div>
        )}
      </div>
    );
  }
);

SlashCommandList.displayName = 'SlashCommandList';

export default SlashCommandList; 