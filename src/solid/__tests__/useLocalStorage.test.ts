import { useLocalStorage } from '../useLocalStorage';

// 模拟localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

// 替换全局的localStorage
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 模拟事件分发
window.dispatchEvent = jest.fn();

describe('useLocalStorage (Solid)', () => {
  beforeEach(() => {
    // 清除所有模拟调用信息
    jest.clearAllMocks();
    // 清除localStorage
    localStorageMock.clear();
  });

  it('应该使用初始值初始化', () => {
    const [value] = useLocalStorage('test-key', 'initial');
    expect(value()).toBe('initial');
    // 应该尝试从localStorage获取值
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('应该从localStorage读取现有值', () => {
    // 预设localStorage中的值
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));
    
    const [value] = useLocalStorage('test-key', 'initial');
    expect(value()).toBe('stored-value');
  });

  it('应该更新值并存储到localStorage', () => {
    const [value, setValue] = useLocalStorage('test-key', 'initial');
    
    setValue('new-value');
    
    expect(value()).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  it('应该使用函数更新值', () => {
    const [value, setValue] = useLocalStorage<number>('test-key', 1);
    
    setValue((prev) => prev + 1);
    
    expect(value()).toBe(2);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(2));
  });

  it('应该使用自定义序列化和反序列化函数', () => {
    const serializer = jest.fn((value: number) => String(value * 2));
    const deserializer = jest.fn((value: string) => Number(value) / 2);
    
    // 预设localStorage中的值
    localStorageMock.setItem('test-key', '10');
    
    const [value, setValue] = useLocalStorage('test-key', 5, { serializer, deserializer });
    
    // 应该使用自定义反序列化函数
    expect(deserializer).toHaveBeenCalledWith('10');
    expect(value()).toBe(5); // 10/2
    
    setValue(8);
    
    // 应该使用自定义序列化函数
    expect(serializer).toHaveBeenCalledWith(8);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', '16'); // 8*2
  });

  it('应该处理localStorage错误', () => {
    // 模拟localStorage.getItem抛出错误
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('getItem error');
    });
    
    // 模拟console.warn
    const originalWarn = console.warn;
    console.warn = jest.fn();
    
    const [value] = useLocalStorage('test-key', 'fallback');
    
    // 应该使用回退值
    expect(value()).toBe('fallback');
    expect(console.warn).toHaveBeenCalled();
    
    // 模拟localStorage.setItem抛出错误
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('setItem error');
    });
    
    const [_, setValue] = useLocalStorage('test-key', 'initial');
    setValue('new-value');
    
    // 应该记录警告
    expect(console.warn).toHaveBeenCalledTimes(2);
    
    // 恢复原始console.warn
    console.warn = originalWarn;
  });
});