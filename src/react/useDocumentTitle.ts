import { useEffect, useRef } from 'react';

/**
 * 用于更新文档标题的钩子
 * A hook for updating the document title
 *
 * @param title - 要设置的新文档标题 / The new title to set for the document
 * @param prevailOnUnmount - 组件卸载时是否保留设置的标题，默认为false / Whether to retain the title when component unmounts, defaults to false
 * 
 * @example
 * ```tsx
 * // 基本用法 / Basic usage
 * function MyComponent() {
 *   useDocumentTitle('新页面标题 | My App');
 *   return <div>内容</div>;
 * }
 * 
 * // 带参数的用法 / Usage with parameters
 * function ProfilePage({ username }) {
 *   useDocumentTitle(`${username}的个人资料 | My App`, true);
 *   return <div>个人资料内容</div>;
 * }
 * ```
 */
function useDocumentTitle(title: string, prevailOnUnmount = false): void {
  // 保存原始标题，以便在组件卸载时恢复
  // Save the original title to restore it when the component unmounts
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    // 设置新标题
    // Set the new title
    document.title = title;
  }, [title]);

  useEffect(() => {
    // 返回清理函数，在组件卸载时执行
    // Return a cleanup function that will run when the component unmounts
    return () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, [prevailOnUnmount]);
}

export { useDocumentTitle }; 