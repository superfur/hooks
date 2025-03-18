import { defineComponent, ref, nextTick } from 'vue';
import { useDocumentTitle } from '../useDocumentTitle';
import { simpleMount, tick } from './test-utils';

describe('useDocumentTitle (Vue)', () => {
  const originalTitle = document.title;
  
  // 在每个测试后重置文档标题
  // Reset document title after each test
  afterEach(() => {
    document.title = originalTitle;
  });

  it('应该设置文档标题 / should set document title', async () => {
    const title = '测试标题 / Test Title';
    
    const TestComponent = defineComponent({
      setup() {
        useDocumentTitle(title);
        return {};
      },
      template: '<div>测试组件</div>'
    });
    
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    expect(document.title).toBe(title);
    wrapper.unmount();
  });

  it('应该使用ref标题 / should work with ref title', async () => {
    const titleRef = ref('初始标题 / Initial Title');
    
    const TestComponent = defineComponent({
      setup() {
        useDocumentTitle(titleRef);
        return { titleRef };
      },
      template: '<div>测试组件</div>'
    });
    
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    expect(document.title).toBe('初始标题 / Initial Title');
    
    // 更新ref的值
    // Update ref value
    titleRef.value = '新标题 / New Title';
    await nextTick();
    
    expect(document.title).toBe('新标题 / New Title');
    wrapper.unmount();
  });

  it('应该在组件卸载时恢复原始标题 / should restore original title on unmount', async () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    const TestComponent = defineComponent({
      setup() {
        useDocumentTitle('测试标题 / Test Title');
        return {};
      },
      template: '<div>测试组件</div>'
    });
    
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    expect(document.title).toBe('测试标题 / Test Title');
    
    wrapper.unmount();
    await tick();
    
    expect(document.title).toBe(initialDocTitle);
  });

  it('当 prevailOnUnmount 为 true 时，组件卸载后应保留设置的标题 / should keep title after unmount when prevailOnUnmount is true', async () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    const TestComponent = defineComponent({
      setup() {
        useDocumentTitle('测试标题 / Test Title', true);
        return {};
      },
      template: '<div>测试组件</div>'
    });
    
    const wrapper = simpleMount(TestComponent);
    await tick();
    
    expect(document.title).toBe('测试标题 / Test Title');
    
    wrapper.unmount();
    await tick();
    
    expect(document.title).toBe('测试标题 / Test Title');
  });
}); 