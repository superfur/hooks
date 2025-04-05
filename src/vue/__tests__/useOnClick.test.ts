import { defineComponent, h } from 'vue';
import { useOnClick } from '../useOnClick';
import { jest } from '@jest/globals';
import { simpleMount, tick } from './test-utils';

describe('useOnClick', () => {
  beforeEach(() => {
    // 模拟 document.addEventListener 和 document.removeEventListener
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add event listener on mount', async () => {
    const handler = jest.fn();
    
    // 创建一个使用 useOnClick 的组件
    const TestComponent = defineComponent({
      setup() {
        useOnClick(handler);
        return {};
      },
      render() {
        return h('div');
      }
    });
    
    // 挂载组件
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler);
    wrapper.unmount();
  });

  it('should remove event listener on unmount', async () => {
    const handler = jest.fn();
    
    // 创建一个使用 useOnClick 的组件
    const TestComponent = defineComponent({
      setup() {
        useOnClick(handler);
        return {};
      },
      render() {
        return h('div');
      }
    });
    
    // 挂载组件
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    // 卸载组件
    wrapper.unmount();
    await tick();
    
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler);
  });

  it('should update event listener when handler changes', async () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    
    // 创建一个使用 useOnClick 的组件
    const TestComponent = defineComponent({
      setup() {
        useOnClick(handler1);
        return {};
      },
      render() {
        return h('div');
      }
    });
    
    // 挂载组件
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    // 初始挂载时添加 handler1
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler1);
    
    // 卸载组件
    wrapper.unmount();
    await tick();
    
    // 应该移除旧的 handler1
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', handler1);
    
    // 创建新组件使用 handler2
    const TestComponent2 = defineComponent({
      setup() {
        useOnClick(handler2);
        return {};
      },
      render() {
        return h('div');
      }
    });
    
    // 挂载新组件
    const wrapper2 = simpleMount(TestComponent2);
    await tick();
    
    // 应该添加新的 handler2
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', handler2);
    wrapper2.unmount();
  });
}); 