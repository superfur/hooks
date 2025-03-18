import { useState, useEffect } from 'react';

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
 * A React hook that tracks the user's online status
 * 一个跟踪用户在线状态的 React hook
 * 
 * @example
 * ```tsx
 * import { useOnlineStatus } from '@septem/hooks/react';
 * 
 * function App() {
 *   const isOnline = useOnlineStatus();
 *   
 *   return (
 *     <div>
 *       <p>You are {isOnline ? 'online' : 'offline'}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @returns A boolean indicating if the user is online / 一个布尔值，表示用户是否在线
 * @public
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(getOnlineStatus());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
} 