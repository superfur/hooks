import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 延迟执行
 * Delay execution
 * @param delay 延迟时间(毫秒) Delay time (milliseconds)
 * @returns 延迟状态 Delay status
 */
export function useDelay(delay = 0) {
  const done = ref(false);
  let timer: number | null = null;

  if (delay === 0) {
    done.value = true;
  } else {
    timer = window.setTimeout(() => {
      done.value = true;
    }, delay);
  }

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  return { value: done };
}

export default useDelay; 