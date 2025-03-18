import { createSignal, onCleanup, onMount } from 'solid-js';

interface WindowCommunicationState {
  lastMessage: any;
  messages: any[];
}

const supportsBroadcastAPI = typeof window !== 'undefined' && 'BroadcastChannel' in window;

/**
 * Solid hook for communication between browser windows/tabs
 * @param channelName - The name of the communication channel
 * @returns [state, postMessage] - The current state and a function to post messages
 */
export function useWindowCommunication(channelName: string): [() => WindowCommunicationState, (message: any) => void] {
  if (channelName === undefined) {
    throw Error('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  }

  const [state, setState] = createSignal<WindowCommunicationState>({
    lastMessage: undefined,
    messages: [],
  });

  let channel: BroadcastChannel | null = null;

  if (supportsBroadcastAPI) {
    channel = new BroadcastChannel(channelName);
  }

  function postMessage(message: any) {
    if (message) {
      const msg = JSON.stringify({
        message,
        time: Date.now(),
      });

      if (supportsBroadcastAPI && channel) {
        channel.postMessage(msg);
      } else {
        window.localStorage.setItem(channelName, msg);
        updateFromLocalStorage({
          key: channelName,
          newValue: msg,
        } as StorageEvent);
        window.dispatchEvent(new StorageEvent('storage', {
          key: channelName,
          newValue: msg,
        }));
      }
    }
  }

  function updateState(data: { message: any }) {
    setState((prev) => ({
      lastMessage: data.message,
      messages: [...prev.messages, data.message],
    }));
  }

  function updateFromLocalStorage(e: StorageEvent) {
    if (e.key !== channelName) {
      return;
    }

    try {
      const value = e.newValue || '';
      const data = JSON.parse(value);
      if (data && data.message) {
        updateState({ message: data.message });
      }
    } catch (error) {
      console.info('Window Communication: Failed to parse json from localstorage');
    }
  }

  onMount(() => {
    if (supportsBroadcastAPI && channel) {
      channel.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data && data.message) {
            updateState({ message: data.message });
          }
        } catch (error) {
          console.info('Window Communication: Failed to parse json from broadcast channel');
        }
      };
    }
    window.addEventListener('storage', updateFromLocalStorage);
  });

  onCleanup(() => {
    if (channel) {
      channel.close();
      channel = null;
    }
    window.removeEventListener('storage', updateFromLocalStorage);
  });

  return [state, postMessage];
} 