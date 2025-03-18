import { createEffect, onCleanup, Signal } from 'solid-js';

/**
 * 用于更新文档标题的钩子
 * A hook for updating the document title
 *
 * @param title - 要设置的新文档标题，可以是字符串或信号 / The new title to set for the document, can be a string or signal
 * @param prevailOnUnmount - 组件卸载时是否保留设置的标题，默认为false / Whether to retain the title when component unmounts, defaults to false
 * 
 * @example
 * ```tsx
 * import { useDocumentTitle } from 'my-hooks';
 * import { createSignal } from 'solid-js';
 * 
 * function MyComponent() {
 *   // 基本用法 / Basic usage
 *   useDocumentTitle('新页面标题 | My App');
 *   
 *   return <div>内容</div>;
 * }
 * 
 * function DynamicTitleComponent() {
 *   // 使用信号作为标题 / Using a signal as the title
 *   const [title, setTitle] = createSignal('初始标题');
 *   useDocumentTitle(title);
 *   
 *   // 点击按钮更新标题 / Update title on button click
 *   return (
 *     <div>
 *       <button onClick={() => setTitle('更新后的标题')}>
 *         更新标题
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
function useDocumentTitle(
  title: string | Signal<string> | (() => string),
  prevailOnUnmount = false
): void {
  // 保存原始标题，以便在组件卸载时恢复
  // Save the original title to restore it when the component unmounts
  const defaultTitle = document.title;

  // 根据 title 的类型选择获取标题的方法
  // Choose the method to get the title based on the type of title
  const getTitle = () => {
    if (typeof title === 'string') {
      return title;
    }
    if (typeof title === 'function') {
      return title();
    }
    // 如果是信号数组，取第一个元素（读取函数）
    // If it's a signal array, take the first element (the getter)
    if (Array.isArray(title) && typeof title[0] === 'function') {
      return title[0]();
    }
    return '';
  };

  // 立即设置标题
  // Set the title immediately
  document.title = getTitle();

  // 创建副作用来更新标题
  // Create an effect to update the title
  createEffect(() => {
    const newTitle = getTitle();
    document.title = newTitle;
  });

  // 组件卸载时恢复原始标题（如果需要）
  // Restore the original title when the component unmounts (if needed)
  if (!prevailOnUnmount) {
    onCleanup(() => {
      document.title = defaultTitle;
    });
  }
}

export { useDocumentTitle }; 