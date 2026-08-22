import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let previouslyFocusedElement: HTMLElement | null = null;

    if (isOpen) {
      previouslyFocusedElement = document.activeElement as HTMLElement;

      const focusableElementsString =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsString);
      
      if (focusableElements && focusableElements.length > 0) {
        // Focus the first focusable element when opened
        setTimeout(() => focusableElements[0].focus(), 50);
      } else if (modalRef.current) {
        // Fallback to focusing the modal itself if no focusable children
        modalRef.current.tabIndex = -1;
        setTimeout(() => modalRef.current?.focus(), 50);
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (!modalRef.current) return;
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(focusableElementsString)
        ).filter(el => el.tabIndex !== -1);

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
          previouslyFocusedElement.focus();
        }
      };
    }
  }, [isOpen]);

  return modalRef;
}
