import { ref } from 'vue';

type UseToggleReturn = [
  { value: boolean },
  (nextValue?: boolean) => void
];

/**
 * Vue版本的切换状态Hook
 * @param initialValue 初始值
 * @returns 切换状态和切换函数
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const value = ref(initialValue);

  const toggle = (nextValue?: boolean) => {
    value.value = nextValue !== undefined ? nextValue : !value.value;
  };

  return [value, toggle];
}