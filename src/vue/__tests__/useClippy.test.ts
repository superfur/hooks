import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { useClippy } from '../useClippy';

// 模拟navigator.clipboard API
const mockClipboard = {
  readText: jest.fn(),
  writeText: jest.fn(),
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

describe('useClippy (Vue)', () => {
  beforeEach(() => {
    // 清除所有模拟调用信息
    jest.clearAllMocks();
  });

  it('应该初始化为空字符串', () => {
    const [value] = useClippy();
    expect(value.value).toBe('');
  });

  it('应该使用提供的初始值初始化', () => {
    const [value] = useClippy('initial-text');
    expect(value.value).toBe('initial-text');
  });

  it('应该使用clipboard API写入剪贴板', async () => {
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    
    const [value, setClipboard] = useClippy();
    
    await setClipboard('new-clipboard-text');
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith('new-clipboard-text');
    expect(value.value).toBe('new-clipboard-text');
  });

  it('应该在clipboard API不可用时使用document.execCommand', async () => {
    // 临时移除clipboard API
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    
    (document.execCommand as jest.Mock).mockReturnValueOnce(true);
    
    const [value, setClipboard] = useClippy();
    
    await setClipboard('fallback-text');
    
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(value.value).toBe('fallback-text');
    
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
    
    // 模拟clipboard.writeText失败
    mockClipboard.writeText.mockRejectedValueOnce(new Error('clipboard error'));
    
    const [value, setClipboard] = useClippy();
    
    await setClipboard('error-text');
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith('error-text');
    expect(console.error).toHaveBeenCalled();
    
    // 恢复console.error
    console.error = originalError;
  });
});