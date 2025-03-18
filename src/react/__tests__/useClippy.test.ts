import { renderHook, act } from '@testing-library/react';
import { useClippy } from '../useClippy';

// 模拟navigator.clipboard API
const mockClipboard = {
  readText: jest.fn().mockResolvedValue(''),
  writeText: jest.fn().mockResolvedValue(undefined),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// 模拟document.execCommand
Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
});

// 模拟navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  configurable: true,
});

describe('useClippy (React)', () => {
  beforeEach(() => {
    // 清除所有模拟调用信息
    jest.clearAllMocks();
  });

  it('应该初始化为空字符串', () => {
    const { result } = renderHook(() => useClippy());
    expect(result.current[0]).toBe('');
  });

  it('应该使用提供的初始值初始化', () => {
    const { result } = renderHook(() => useClippy('initial-text'));
    expect(result.current[0]).toBe('initial-text');
  });

  it('应该使用clipboard API写入剪贴板', async () => {
    // 模拟clipboard API
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
      readText: jest.fn().mockResolvedValue(''),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true,
    });

    const { result } = renderHook(() => useClippy());
    
    // 使用act包装状态更新
    await act(async () => {
      await result.current[1]('new-clipboard-text');
    });
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith('new-clipboard-text');
    expect(result.current[0]).toBe('new-clipboard-text');
  });

  it('应该在clipboard API不可用时使用document.execCommand', async () => {
    // 临时移除clipboard API
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    
    (document.execCommand as jest.Mock).mockReturnValueOnce(true);
    
    const { result } = renderHook(() => useClippy());
    
    await act(async () => {
      await result.current[1]('fallback-text');
    });
    
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(result.current[0]).toBe('fallback-text');
    
    // 恢复clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('应该处理clipboard API错误', async () => {
    // 模拟console.error
    const originalError = console.error;
    console.error = jest.fn();
    
    // 模拟clipboard API
    const mockWriteText = jest.fn().mockRejectedValueOnce(new Error('clipboard error'));
    const mockClipboard = {
      writeText: mockWriteText,
      readText: jest.fn().mockResolvedValue(''),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true,
    });
    
    const { result } = renderHook(() => useClippy());
    
    await act(async () => {
      await result.current[1]('error-text');
    });
    
    expect(mockWriteText).toHaveBeenCalledWith('error-text');
    expect(console.error).toHaveBeenCalled();
    
    // 恢复console.error
    console.error = originalError;
  });
});