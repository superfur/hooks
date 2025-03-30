import { createSignal, onCleanup, onMount } from 'solid-js';

/**
 * 延迟执行 hook
 * Delay execution hook
 * @param delay 延迟时间(毫秒) Delay time (milliseconds)
 * @returns 是否延迟完成 Whether delay is complete
 */
export const useDelay = (delay: number = 0) => {
  const [done, setDone] = createSignal(false);
  let timer: number | null = null;

  onMount(() => {
    timer = window.setTimeout(() => {
      setDone(true);
    }, delay);
  });

  onCleanup(() => {
    if (timer !== null) {
      window.clearTimeout(timer);
    }
  });

  return done;
};

export default useDelay; 