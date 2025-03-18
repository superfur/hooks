import { defineComponent, h } from 'vue';
import { useOnlineStatus } from '../useOnlineStatus';
import { simpleMount, tick } from './test-utils';

describe('useOnlineStatus (Vue)', () => {
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

  it('should return the online status', async () => {
    // 设置为在线
    mockNavigatorOnline(true);
    
    const TestComponent = defineComponent({
      setup() {
        const isOnline = useOnlineStatus();
        return { isOnline };
      },
      render() {
        return h('div', {}, this.isOnline ? 'online' : 'offline');
      }
    });

    const wrapper = simpleMount(TestComponent);
    expect(wrapper.text()).toBe('online');
    wrapper.unmount();

    // 设置为离线并创建新组件
    mockNavigatorOnline(false);
    
    const TestComponent2 = defineComponent({
      setup() {
        const isOnline = useOnlineStatus();
        return { isOnline };
      },
      render() {
        return h('div', {}, this.isOnline ? 'online' : 'offline');
      }
    });

    const wrapper2 = simpleMount(TestComponent2);
    expect(wrapper2.text()).toBe('offline');
    wrapper2.unmount();
  });

  it('should update when online/offline events are triggered', async () => {
    // 初始化为在线
    mockNavigatorOnline(true);
    
    const TestComponent = defineComponent({
      setup() {
        const isOnline = useOnlineStatus();
        return { isOnline };
      },
      render() {
        return h('div', {}, this.isOnline ? 'online' : 'offline');
      }
    });

    const wrapper = simpleMount(TestComponent);
    expect(wrapper.text()).toBe('online');

    // 触发离线事件
    mockNavigatorOnline(false);
    window.dispatchEvent(new Event('offline'));
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.text()).toBe('offline');

    // 触发在线事件
    mockNavigatorOnline(true);
    window.dispatchEvent(new Event('online'));
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.text()).toBe('online');
    
    wrapper.unmount();
  });
}); 