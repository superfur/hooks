import { useState, useEffect } from 'react';

type UseLocalStorageOptions = {
  serializer?: <T>(value: T) => string;
  deserializer?: <T>(value: string) => T;
};

type UseLocalStorageReturn<T> = [
  T,
  (value: T | ((prev: T) => T)) => void
];

/**
 * React版本的本地存储Hook
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

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    return readValue();
  });

  // 监听存储变化
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  const setValue = (value: T | ((val: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
    writeValue(newValue);
  };

  return [storedValue, setValue];
}