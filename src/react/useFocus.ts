import React, { useRef } from 'react';

/**
 * 元素焦点管理 hook
 * Element focus management hook
 * @returns 元素引用和聚焦方法 / Element reference and focus method
 */
export const useFocus = <T extends HTMLElement>(): [React.RefObject<T>, () => void] => {
  const ref = useRef<T>(null);
  const focusElement = () => {
    requestAnimationFrame(() => {
      ref.current?.focus();
    });
  };
  return [ref, focusElement];
};

export default useFocus; 