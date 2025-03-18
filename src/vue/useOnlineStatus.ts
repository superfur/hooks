import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Gets the current online status
 * 获取当前在线状态
 * 
 * @returns Current online status / 当前在线状态
 */
function getOnlineStatus(): boolean {
  return typeof navigator !== 'undefined' && 
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
}

/**
 * A Vue composition function that tracks the user's online status
 * 一个跟踪用户在线状态的 Vue 组合式函数
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useOnlineStatus } from '@septem/hooks/vue';
 * 
 * const isOnline = useOnlineStatus();
 * </script>
 * 
 * <template>
 *   <div>
 *     <p>You are {{ isOnline ? 'online' : 'offline' }}</p>
 *   </div>
 * </template>
 * ```
 * 
 * @returns A ref holding a boolean indicating if the user is online / 一个包含布尔值的 ref，表示用户是否在线
 * @public
 */
export function useOnlineStatus() {
  const isOnline = ref<boolean>(getOnlineStatus());

  const handleOnline = () => {
    isOnline.value = true;
  };

  const handleOffline = () => {
    isOnline.value = false;
  };

  onMounted(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  });

  return isOnline;
} 