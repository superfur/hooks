import { createSignal } from 'solid-js';

/**
 * 元素焦点管理 hook
 * Element focus management hook
 * @returns 元素引用和聚焦方法 / Element reference and focus method
 */
export function useFocus<T extends HTMLElement>() {
  let elementRef: T | undefined;
  
  const focusElement = () => {
    requestAnimationFrame(() => {
      if (elementRef) {
        elementRef.focus();
      }
    });
  };
  
  return {
    elementRef: (el?: T) => {
      if (el) elementRef = el;
      return elementRef;
    },
    focusElement
  };
}

export default useFocus; 