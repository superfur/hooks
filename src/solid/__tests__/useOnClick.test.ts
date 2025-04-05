import { createRoot, onCleanup } from 'solid-js';
import { useOnClick } from '../useOnClick';
import { jest } from '@jest/globals';

describe('useOnClick', () => {
  beforeEach(() => {
    // 模拟 document.addEventListener 和 document.removeEventListener
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add event listener on mount', () => {
    const handler = jest.fn();
    
    // 创建一个使用 useOnClick 的根
    createRoot((dispose) => {
      useOnClick(handler);
      onCleanup(dispose);
    });
    
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler);
  });

  it('should remove event listener on cleanup', () => {
    const handler = jest.fn();
    let dispose: (() => void) | undefined;
    
    // 创建一个使用 useOnClick 的根
    createRoot((d) => {
      dispose = d;
      useOnClick(handler);
    });
    
    // 清理根
    if (dispose) {
      dispose();
    }
    
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler);
  });

  it('should update event listener when handler changes', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    let dispose: (() => void) | undefined;
    
    // 创建一个使用 useOnClick 的根，初始使用 handler1
    createRoot((d) => {
      dispose = d;
      useOnClick(handler1);
    });
    
    // 初始挂载时添加 handler1
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler1);
    
    // 清理根
    if (dispose) {
      dispose();
    }
    
    // 创建一个新的根，使用 handler2
    createRoot((d) => {
      dispose = d;
      useOnClick(handler2);
    });
    
    // 应该移除旧的 handler1 并添加新的 handler2
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler1);
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler2);
  });
}); 