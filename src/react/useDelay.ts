import { useEffect, useState } from 'react';

/**
 * 延迟执行 hook
 * Delay execution hook
 * @param delay 延迟时间(毫秒) Delay time (milliseconds)
 * @returns 是否延迟完成 Whether delay is complete
 */
export const useDelay = (delay: number = 0): boolean => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return done;
};

export default useDelay; 