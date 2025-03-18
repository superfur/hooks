import { createRoot } from 'solid-js';
import { createSignal } from 'solid-js';
import { useDocumentTitle } from '../useDocumentTitle';

describe('useDocumentTitle (Solid)', () => {
  const originalTitle = document.title;
  
  // 在每个测试后重置文档标题
  // Reset document title after each test
  afterEach(() => {
    document.title = originalTitle;
  });

  it('应该设置文档标题 / should set document title', () => {
    const title = '测试标题 / Test Title';
    
    createRoot(dispose => {
      useDocumentTitle(title);
      expect(document.title).toBe(title);
      dispose();
    });
  });

  it('应该使用信号作为标题 / should work with signal title', () => {
    return new Promise<void>(resolve => {
      createRoot(dispose => {
        const [title, setTitle] = createSignal('初始标题 / Initial Title');
        useDocumentTitle(title);
        
        expect(document.title).toBe('初始标题 / Initial Title');
        
        // 更新信号值并等待微任务队列完成，以确保createEffect执行
        // Update signal value and wait for microtask queue to complete, ensuring createEffect runs
        setTitle('新标题 / New Title');
        
        queueMicrotask(() => {
          expect(document.title).toBe('新标题 / New Title');
          dispose();
          resolve();
        });
      });
    });
  });

  it('应该在组件卸载时恢复原始标题 / should restore original title on unmount', () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    createRoot(dispose => {
      useDocumentTitle('测试标题 / Test Title');
      expect(document.title).toBe('测试标题 / Test Title');
      
      dispose();
      expect(document.title).toBe(initialDocTitle);
    });
  });

  it('当 prevailOnUnmount 为 true 时，组件卸载后应保留设置的标题 / should keep title after unmount when prevailOnUnmount is true', () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    createRoot(dispose => {
      useDocumentTitle('测试标题 / Test Title', true);
      expect(document.title).toBe('测试标题 / Test Title');
      
      dispose();
      expect(document.title).toBe('测试标题 / Test Title');
    });
  });
}); 