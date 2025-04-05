import { onMounted, onUnmounted } from 'vue';

/**
 * 点击事件监听 hook
 * Click event listener hook
 * @param handler 点击事件处理函数 Click event handler function
 */
export const useOnClick = (handler: (event: MouseEvent) => void) => {
  onMounted(() => {
    document.addEventListener('mousedown', handler);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handler);
  });
};

export default useOnClick; 