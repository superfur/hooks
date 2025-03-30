import { shallowMount } from '@vue/test-utils';
import { nextTick, h } from 'vue';
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
    const wrapper = shallowMount({
      setup() {
        const { value } = useDelay(1000);
        return () => h('div', value.value);
      }
    });
    expect(wrapper.text()).toBe('false');
  });

  it('should return true after delay', async () => {
    const wrapper = shallowMount({
      setup() {
        const { value } = useDelay(1000);
        return () => h('div', value.value);
      }
    });
    
    jest.advanceTimersByTime(1000);
    await nextTick();
    expect(wrapper.text()).toBe('true');
  });

  it('should handle zero delay', async () => {
    const wrapper = shallowMount({
      setup() {
        const { value } = useDelay(0);
        return () => h('div', value.value);
      }
    });
    
    await nextTick();
    expect(wrapper.text()).toBe('true');
  });

  it('should handle default delay', async () => {
    const wrapper = shallowMount({
      setup() {
        const { value } = useDelay();
        return () => h('div', value.value);
      }
    });
    
    await nextTick();
    expect(wrapper.text()).toBe('true');
  });

  it('should cleanup timer on unmount', () => {
    const wrapper = shallowMount({
      setup() {
        const { value } = useDelay(1000);
        return () => h('div', value.value);
      }
    });
    
    wrapper.unmount();
    
    jest.advanceTimersByTime(1000);
    
    // 如果清理成功,不会触发任何状态更新
    // If cleanup is successful, no state updates will be triggered
  });
}); 