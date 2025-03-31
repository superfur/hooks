import { defineComponent, h, nextTick } from 'vue';
import { useFocus } from '../useFocus';
import { jest } from '@jest/globals';
import { simpleMount, tick } from './test-utils';

describe('useFocus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return ref and focus function', async () => {
    // 直接测试 hook
    const { elementRef, focusElement } = useFocus<HTMLInputElement>();
    
    expect(elementRef).toBeDefined();
    expect(typeof focusElement).toBe('function');
  });

  it('should focus element when focus function is called', async () => {
    // 创建带有输入元素的 mock
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    // 直接测试 hook
    const { elementRef, focusElement } = useFocus<HTMLInputElement>();
    // 设置 ref 的 value 属性，而不是尝试替换整个 ref 对象
    elementRef.value = input;
    
    const focusSpy = jest.spyOn(input, 'focus');
    
    // 调用聚焦函数
    focusElement();
    
    // 执行 requestAnimationFrame 回调
    jest.runAllTimers();
    
    expect(focusSpy).toHaveBeenCalled();
    
    // 清理创建的元素
    document.body.removeChild(input);
  });

  it('should handle null ref', async () => {
    // 直接测试 hook
    const { focusElement } = useFocus<HTMLInputElement>();
    
    // 调用聚焦函数 - 不应该抛出错误
    focusElement();
    
    // 执行 requestAnimationFrame 回调
    jest.runAllTimers();
    
    // 如果没有错误就通过测试
    expect(true).toBe(true);
  });
});
