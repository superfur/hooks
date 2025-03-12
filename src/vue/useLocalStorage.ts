import { ref, watch } from 'vue';

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

type UseLocalStorageReturn<T> = [
  ReturnType<typeof ref<T>>,
  (value: T | ((val: T) => T)) => void
];

// 确保类型安全的辅助函数
function ensureRefType<T>(value: any): any {
  return value;
}

/**
 * Vue版本的本地存储Hook
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 选项
 * @returns 存储值和设置函数
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
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

  const storedValue = ref<T>(typeof window !== 'undefined' ? readValue() : initialValue);

  if (typeof window !== 'undefined') {
    const handleStorageChange = () => {
      storedValue.value = readValue();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
  }

  watch(storedValue, (newValue) => {
    writeValue(newValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue.value) : value;
    storedValue.value = newValue;
    writeValue(newValue);
  };

  return [ensureRefType(storedValue), setValue];
}