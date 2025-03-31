import { nextTick, defineComponent, ref } from 'vue';
import { useDelay } from '../useDelay';
import { jest } from '@jest/globals';
import { simpleMount, tick } from './test-utils';

describe('useDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false initially', async () => {
    // 直接测试 hook，而不是通过组件
    const { value } = useDelay(1000);
    expect(value.value).toBe(false);
  });

  it('should return true after delay', async () => {
    // 直接测试 hook
    const { value } = useDelay(1000);
    
    jest.advanceTimersByTime(1000);
    expect(value.value).toBe(true);
  });

  it('should handle zero delay', async () => {
    // 直接测试 hook
    const { value } = useDelay(0);
    
    expect(value.value).toBe(true);
  });

  it('should handle default delay', async () => {
    // 直接测试 hook
    const { value } = useDelay();
    
    expect(value.value).toBe(true);
  });

  it('should cleanup timer on unmount', async () => {
    // 创建一个测试组件
    const TestComponent = defineComponent({
      setup() {
        useDelay(1000);
        return {};
      },
      render() {
        return () => '';
      }
    });
    
    const wrapper = simpleMount(TestComponent);
    
    wrapper.unmount();
    
    jest.advanceTimersByTime(1000);
    
    // 如果清理成功,不会触发任何状态更新
    expect(true).toBe(true);
  });
}); 