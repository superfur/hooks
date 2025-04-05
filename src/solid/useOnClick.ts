import { onMount, onCleanup } from 'solid-js';

/**
 * 点击事件监听 hook
 * Click event listener hook
 * @param handler 点击事件处理函数 Click event handler function
 */
export const useOnClick = (handler: (event: MouseEvent) => void) => {
  onMount(() => {
    document.addEventListener('mousedown', handler);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handler);
  });
};

export default useOnClick; 