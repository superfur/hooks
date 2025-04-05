import { useEffect } from 'react';

/**
 * 点击事件监听 hook
 * Click event listener hook
 * @param handler 点击事件处理函数 Click event handler function
 */
export const useOnClick = (handler: (event: MouseEvent) => void) => {
  useEffect(() => {
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [handler]);
};

export default useOnClick; 