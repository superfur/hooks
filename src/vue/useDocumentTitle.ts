import { onMounted, onUnmounted, ref, watch, Ref } from 'vue';

/**
 * 用于更新文档标题的钩子
 * A hook for updating the document title
 *
 * @param title - 要设置的新文档标题，可以是字符串或ref / The new title to set for the document, can be a string or ref
 * @param prevailOnUnmount - 组件卸载时是否保留设置的标题，默认为false / Whether to retain the title when component unmounts, defaults to false
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useDocumentTitle } from 'my-hooks';
 * 
 * // 基本用法 / Basic usage
 * useDocumentTitle('新页面标题 | My App');
 * 
 * // 使用响应式标题 / Using reactive title
 * const title = ref('初始标题');
 * useDocumentTitle(title);
 * 
 * // 5秒后更新标题 / Update title after 5 seconds
 * setTimeout(() => {
 *   title.value = '更新后的标题';
 * }, 5000);
 * </script>
 * ```
 */
function useDocumentTitle(
  title: string | Ref<string>,
  prevailOnUnmount = false
): void {
  // 保存原始标题，以便在组件卸载时恢复
  // Save the original title to restore it when the component unmounts
  const defaultTitle = ref(document.title);

  // 当传入的是字符串时，转换为ref
  // Convert to ref when the input is a string
  const titleRef = typeof title === 'string' ? ref(title) : title;

  // 更新文档标题的函数
  // Function to update the document title
  const updateTitle = () => {
    document.title = titleRef.value;
  };

  // 组件挂载时设置标题
  // Set the title when the component is mounted
  onMounted(updateTitle);

  // 监听标题变化
  // Watch for title changes
  watch(titleRef, updateTitle, { immediate: true });

  // 组件卸载时恢复原始标题（如果需要）
  // Restore the original title when the component unmounts (if needed)
  onUnmounted(() => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.value;
    }
  });
}

export { useDocumentTitle }; 