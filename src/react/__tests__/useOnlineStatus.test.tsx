import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useOnlineStatus } from '../useOnlineStatus';

describe('useOnlineStatus (React)', () => {
  // 保存原始的 navigator.onLine
  const originalOnline = window.navigator.onLine;
  
  // 模拟 navigator.onLine
  const mockNavigatorOnline = (online: boolean) => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: online
    });
  };

  // 恢复原始值
  afterAll(() => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: originalOnline
    });
  });

  it('should return the online status', () => {
    // 设置为在线
    mockNavigatorOnline(true);
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);

    // 设置为离线
    mockNavigatorOnline(false);
    const { result: result2 } = renderHook(() => useOnlineStatus());
    expect(result2.current).toBe(false);
  });

  it('should update when online/offline events are triggered', () => {
    // 初始化为在线
    mockNavigatorOnline(true);
    const { result } = renderHook(() => useOnlineStatus());

    // 测试离线事件
    act(() => {
      // 触发离线事件
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);

    // 测试在线事件
    act(() => {
      // 触发在线事件
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
}); 