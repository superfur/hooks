import { createRoot, onCleanup } from 'solid-js';
import { useFocus } from '../useFocus';
import { jest } from '@jest/globals';

// 简单的测试工具函数
function renderHook<T>(hookFn: () => T): { result: () => T } {
  let result: T;
  createRoot((dispose) => {
    result = hookFn();
    onCleanup(() => {
      dispose();
    });
  });
  return {
    result: () => result!
  };
}

describe('useFocus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return ref and focus function', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    
    expect(result().elementRef).toBeDefined();
    expect(typeof result().focusElement).toBe('function');
  });

  it('should focus element when focus function is called', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const { elementRef, focusElement } = result();
    
    // 模拟 DOM 元素
    // Mock DOM element
    const mockElement = document.createElement('input');
    const focusSpy = jest.spyOn(mockElement, 'focus');
    
    // 设置 ref 的值
    // Set ref value
    elementRef(mockElement);
    
    focusElement();
    
    // 执行 requestAnimationFrame 回调
    // Execute requestAnimationFrame callback
    jest.runAllTimers();
    
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle null ref', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const { focusElement } = result();
    
    focusElement();
    
    // 执行 requestAnimationFrame 回调
    // Execute requestAnimationFrame callback
    jest.runAllTimers();
    
    // 不应该抛出错误
    // Should not throw error
    expect(true).toBe(true);
  });
}); 