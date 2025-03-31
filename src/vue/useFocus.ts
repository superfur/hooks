import { ref } from 'vue';

/**
 * 元素焦点管理 hook
 * Element focus management hook
 * @returns 元素引用和聚焦方法 / Element reference and focus method
 */
export function useFocus<T extends HTMLElement>() {
  const elementRef = ref<T | null>(null);
  
  const focusElement = () => {
    requestAnimationFrame(() => {
      elementRef.value?.focus();
    });
  };
  
  return {
    elementRef,
    focusElement
  };
}

export default useFocus; 