import { renderHook, act } from '@testing-library/react';
import { useDelay } from '../useDelay';
import { jest } from '@jest/globals';

describe('useDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useDelay(1000));
    expect(result.current).toBe(false);
  });

  it('should return true after delay', () => {
    const { result } = renderHook(() => useDelay(1000));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it('should handle zero delay', () => {
    const { result } = renderHook(() => useDelay(0));
    
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe(true);
  });

  it('should handle default delay', () => {
    const { result } = renderHook(() => useDelay());
    
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe(true);
  });

  it('should cleanup timer on unmount', () => {
    const { unmount } = renderHook(() => useDelay(1000));
    
    unmount();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // 如果清理成功,不会触发任何状态更新
    // If cleanup is successful, no state updates will be triggered
  });
}); 