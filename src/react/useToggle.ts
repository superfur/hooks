import { useState } from 'react';

type UseToggleReturn = [
  boolean,
  (nextValue?: boolean) => void
];

/**
 * React版本的切换状态Hook
 * @param initialValue 初始值
 * @returns 切换状态和切换函数
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = (nextValue?: boolean) => {
    setValue(nextValue !== undefined ? nextValue : !value);
  };

  return [value, toggle];
}