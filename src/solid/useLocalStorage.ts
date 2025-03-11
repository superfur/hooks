import { createSignal, createEffect } from 'solid-js';

type UseLocalStorageOptions = {
  serializer?: <T>(value: T) => string;
  deserializer?: <T>(value: string) => T;
};

type UseLocalStorageReturn<T> = [
  () => T,
  (value: T | ((val: T) => T)) => void
];

/**
 * SolidJS版本的本地存储Hook
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 选项
 * @returns 存储值和设置函数
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  // 从localStorage获取初始值
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 写入值到localStorage
  const writeValue = (value: T): void => {
    try {
      window.localStorage.setItem(key, serializer(value));
      // 触发其他标签页的storage事件
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  };

  const [storedValue, setStoredValue] = createSignal<T>(
    typeof window !== 'undefined' ? readValue() : initialValue
  );

  if (typeof window !== 'undefined') {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
  }

  createEffect(() => {
    writeValue(storedValue());
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue()) : value;
    setStoredValue(() => newValue);
  };

  return [storedValue, setValue];
}