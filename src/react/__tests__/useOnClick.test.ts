import { renderHook } from '@testing-library/react';
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
    renderHook(() => useOnClick(handler));

    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler);
  });

  it('should remove event listener on unmount', () => {
    const handler = jest.fn();
    const { unmount } = renderHook(() => useOnClick(handler));

    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler);
  });

  it('should update event listener when handler changes', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    
    const { rerender } = renderHook(
      ({ handler }) => useOnClick(handler),
      { initialProps: { handler: handler1 } }
    );

    // 初始挂载时添加 handler1
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler1);
    
    // 更新为 handler2
    rerender({ handler: handler2 });
    
    // 应该移除旧的 handler1 并添加新的 handler2
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler1);
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler2);
  });
}); 