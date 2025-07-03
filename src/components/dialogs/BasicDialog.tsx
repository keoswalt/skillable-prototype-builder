'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../buttons/Button';
import { Icon, Icons } from '../Icon';

export interface BasicDialogProps {
  /** Controls whether the dialog is rendered */
  open: boolean;
  /** Fired when the user clicks the overlay, the close button or presses ESC */
  onClose: () => void;
  /** Fired when the confirm action is triggered */
  onConfirm?: () => void;
  /** Dialog title */
  title?: string;
  /** Dialog body text */
  description?: string;
  /** Visual style of the confirm action */
  variant?: 'default' | 'warning' | 'destructive';
  /** Override label shown in the confirm button */
  confirmLabel?: string;
  /** Override label shown in the cancel button */
  cancelLabel?: string;
  /** Additional classes for the dialog panel */
  className?: string;
}

/**
 * BasicDialog – A simple modal dialog with three visual variants (default, warning, destructive).
 *
 * The component renders into a React portal so that it sits at the end of `document.body`.
 * It is **uncontrolled** from the inside – the parent component must manage `open` state.
 *
 * Accessibility considerations:
 * • `role="dialog"`, `aria-modal="true"`, and headers/description ids are provided.
 * • Focus is moved to the dialog when it opens and restored on close.
 * • The dialog closes on `ESC` key.
 *
 * NOTE: This dialog purposefully avoids external libraries in favour of the project's design-system components.
 */
export const BasicDialog: React.FC<BasicDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  description = 'Are you sure you wish to proceed?',
  variant = 'default',
  confirmLabel,
  cancelLabel = 'Cancel',
  className = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  /* ------------------------------------------------------------------ */
  /* Focus handling                                                     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (open) {
      // Save currently focused element so we can restore later
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      // Move focus inside the dialog (after next paint)
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });
    } else {
      // Restore focus to element that had it before dialog opened
      previouslyFocusedElement.current?.focus();
    }
  }, [open]);

  /* ------------------------------------------------------------------ */
  /* Key handling (Escape)                                              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  /* ------------------------------------------------------------------ */
  /* Confirm button mapping                                             */
  /* ------------------------------------------------------------------ */
  const getConfirmButtonVariant = (): React.ComponentProps<typeof Button>['variant'] => {
    switch (variant) {
      case 'warning':
        return 'warning';
      case 'destructive':
        return 'error';
      default:
        return 'primary';
    }
  };

  const computedConfirmLabel = confirmLabel ?? (variant === 'default' ? 'Save' : 'Confirm');

  // Nothing to render when closed – avoid creating portal nodes unnecessarily
  if (!open) return null;

  const dialog = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-_components-backdrop-fill backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-md rounded-lg bg-_components-background-default p-6 shadow-lg focus:outline-none ${className}`}
      >
        {/* Close button */}
        <button
          aria-label="Close dialog"
          className="absolute right-4 top-4 text-_components-text-secondary transition-colors hover:text-_components-text-primary focus:outline-none"
          onClick={onClose}
        >
          <Icon icon={Icons.close} size={20} />
        </button>

        {/* Title */}
        <h2 id="dialog-title" className="text-heading-xs font-headline text-heading-md text-_components-text-primary">
          {title}
        </h2>

        {/* Description */}
        <p id="dialog-description" className="mt-4 text-body-md text-_components-text-secondary">
          {description}
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={getConfirmButtonVariant()} onClick={onConfirm}>
            {computedConfirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, typeof window !== 'undefined' ? document.body : ({} as HTMLElement));
};

BasicDialog.displayName = 'BasicDialog'; 