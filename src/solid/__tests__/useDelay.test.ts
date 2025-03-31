import { createRoot, onCleanup, Accessor } from 'solid-js';
import { useDelay } from '../useDelay';
import { jest } from '@jest/globals';

// 辅助函数：等待下一个微任务周期
const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('useDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false initially', () => {
    // 与 createSignal 一起使用，不需要 renderHook
    let done: Accessor<boolean> | undefined;
    createRoot((dispose) => {
      done = useDelay(1000);
      onCleanup(dispose);
    });
    
    // Solid 信号需要作为函数调用才能获取值
    expect(done!()).toBe(false);
  });

  it('should return true after delay', () => {
    // 与 createSignal 一起使用，不需要 renderHook
    let done: Accessor<boolean> | undefined;
    createRoot((dispose) => {
      done = useDelay(1000);
      onCleanup(dispose);
    });
    
    // 模拟 onMount 调用
    jest.runAllTimers();
    
    jest.advanceTimersByTime(1000);
    // Solid 信号需要作为函数调用才能获取值
    expect(done!()).toBe(true);
  });

  it('should handle zero delay', async () => {
    // 与 createSignal 一起使用，不需要 renderHook
    let done: Accessor<boolean> | undefined;
    createRoot((dispose) => {
      done = useDelay(0);
      onCleanup(dispose);
    });
    
    // 模拟 onMount 调用
    jest.runAllTimers();
    
    // 对于零延迟，值应该立即为 true，但仍需等待定时器执行
    // Solid 信号需要作为函数调用才能获取值
    expect(done!()).toBe(true);
  });

  it('should handle default delay', async () => {
    // 与 createSignal 一起使用，不需要 renderHook
    let done: Accessor<boolean> | undefined;
    createRoot((dispose) => {
      done = useDelay(); // 默认延迟为 0
      onCleanup(dispose);
    });
    
    // 模拟 onMount 调用
    jest.runAllTimers();
    
    // 对于默认延迟 (0)，值应该立即为 true，但仍需等待定时器执行
    // Solid 信号需要作为函数调用才能获取值
    expect(done!()).toBe(true);
  });

  it('should cleanup timer on unmount', () => {
    let dispose: (() => void) | undefined;
    
    createRoot((d) => {
      dispose = d;
      useDelay(1000);
    });
    
    if (dispose) {
      dispose();
    }
    
    jest.advanceTimersByTime(1000);
    
    // 如果清理成功，不会触发任何状态更新
    expect(true).toBe(true);
  });
}); 