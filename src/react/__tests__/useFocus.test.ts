import { renderHook } from '@testing-library/react';
import { useFocus } from '../useFocus';
import { act } from 'react-dom/test-utils';

describe('useFocus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return ref and focus function', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    
    expect(result.current[0]).toBeDefined();
    expect(typeof result.current[1]).toBe('function');
  });

  it('should focus element when focus function is called', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [ref, focusElement] = result.current;
    
    // 模拟 DOM 元素
    // Mock DOM element
    const mockElement = document.createElement('input');
    const focusSpy = jest.spyOn(mockElement, 'focus');
    
    // 设置 ref 的 current 值
    // Set ref's current value
    (ref as any).current = mockElement;
    
    act(() => {
      focusElement();
    });
    
    // 执行 requestAnimationFrame 回调
    // Execute requestAnimationFrame callback
    act(() => {
      jest.runAllTimers();
    });
    
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle null ref', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [, focusElement] = result.current;
    
    act(() => {
      focusElement();
    });
    
    // 执行 requestAnimationFrame 回调
    // Execute requestAnimationFrame callback
    act(() => {
      jest.runAllTimers();
    });
    
    // 不应该抛出错误
    // Should not throw error
    expect(true).toBe(true);
  });
}); 