import { renderHook, act } from '@testing-library/react';
import { useDocumentTitle } from '../useDocumentTitle';

describe('useDocumentTitle (React)', () => {
  const originalTitle = document.title;
  
  // 在每个测试后重置文档标题
  // Reset document title after each test
  afterEach(() => {
    document.title = originalTitle;
  });

  it('应该设置文档标题 / should set document title', () => {
    const title = '测试标题 / Test Title';
    renderHook(() => useDocumentTitle(title));
    expect(document.title).toBe(title);
  });

  it('应该在标题改变时更新文档标题 / should update document title when title changes', () => {
    const { rerender } = renderHook(props => useDocumentTitle(props.title), {
      initialProps: { title: '初始标题 / Initial Title' }
    });
    
    expect(document.title).toBe('初始标题 / Initial Title');
    
    rerender({ title: '新标题 / New Title' });
    expect(document.title).toBe('新标题 / New Title');
  });

  it('应该在组件卸载时恢复原始标题 / should restore original title on unmount', () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    const { unmount } = renderHook(() => useDocumentTitle('测试标题 / Test Title'));
    expect(document.title).toBe('测试标题 / Test Title');
    
    unmount();
    expect(document.title).toBe(initialDocTitle);
  });

  it('当 prevailOnUnmount 为 true 时，组件卸载后应保留设置的标题 / should keep title after unmount when prevailOnUnmount is true', () => {
    const initialDocTitle = 'Original Title';
    document.title = initialDocTitle;
    
    const newTitle = '测试标题 / Test Title';
    const { unmount } = renderHook(() => useDocumentTitle(newTitle, true));
    expect(document.title).toBe(newTitle);
    
    unmount();
    expect(document.title).toBe(newTitle);
  });
}); 