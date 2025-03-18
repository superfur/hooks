import { createRoot } from 'solid-js';

export function createHookRoot<T>(fn: () => T): T {
  let result: T;
  createRoot((dispose) => {
    result = fn();
    return dispose;
  });
  return result!;
} 