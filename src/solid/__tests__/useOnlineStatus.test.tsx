import { createRoot } from 'solid-js';
import { useOnlineStatus } from '../useOnlineStatus';

describe('useOnlineStatus (Solid)', () => {
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
    
    createRoot(dispose => {
      const isOnline = useOnlineStatus();
      expect(isOnline()).toBe(true);
      dispose();
    });

    // 设置为离线
    mockNavigatorOnline(false);
    
    createRoot(dispose => {
      const isOnline = useOnlineStatus();
      expect(isOnline()).toBe(false);
      dispose();
    });
  });

  // 修改测试增加超时时间并使用 jest.mock 模拟事件处理
  it('should update when online/offline events are triggered', () => {
    // 模拟 window 的事件监听器
    let onlineListeners: Function[] = [];
    let offlineListeners: Function[] = [];
    
    const originalAddEventListener = window.addEventListener;
    const originalRemoveEventListener = window.removeEventListener;
    
    window.addEventListener = jest.fn((event, handler) => {
      if (event === 'online') onlineListeners.push(handler as Function);
      if (event === 'offline') offlineListeners.push(handler as Function);
    });
    
    window.removeEventListener = jest.fn();
    
    // 初始化为在线
    mockNavigatorOnline(true);
    
    return new Promise<void>((resolve) => {
      createRoot(dispose => {
        const isOnline = useOnlineStatus();
        expect(isOnline()).toBe(true);
        
        // 允许事件监听器被注册
        setTimeout(() => {
          // 手动触发离线事件
          mockNavigatorOnline(false);
          if (offlineListeners.length > 0) {
            offlineListeners.forEach(listener => listener(new Event('offline')));
          }
          
          expect(isOnline()).toBe(false);
          
          // 手动触发在线事件
          mockNavigatorOnline(true);
          if (onlineListeners.length > 0) {
            onlineListeners.forEach(listener => listener(new Event('online')));
          }
          
          expect(isOnline()).toBe(true);
          
          // 清理
          window.addEventListener = originalAddEventListener;
          window.removeEventListener = originalRemoveEventListener;
          dispose();
          resolve();
        }, 100);
      });
    });
  }, 10000); // 增加超时时间
}); 