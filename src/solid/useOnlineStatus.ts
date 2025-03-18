import { createSignal, onMount, onCleanup } from 'solid-js';

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
 * A Solid.js hook that tracks the user's online status
 * 一个跟踪用户在线状态的 Solid.js hook
 * 
 * @example
 * ```tsx
 * import { useOnlineStatus } from '@septem/hooks/solid';
 * 
 * function App() {
 *   const isOnline = useOnlineStatus();
 *   
 *   return (
 *     <div>
 *       <p>You are {isOnline() ? 'online' : 'offline'}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @returns A signal function that returns a boolean indicating if the user is online / 一个返回布尔值的信号函数，表示用户是否在线
 * @public
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = createSignal<boolean>(getOnlineStatus());

  onMount(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    onCleanup(() => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    });
  });

  return isOnline;
} 