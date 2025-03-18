import { ref, onMounted, onUnmounted, Ref } from 'vue';

interface WindowCommunicationState {
  lastMessage: any;
  messages: any[];
}

const supportsBroadcastAPI = typeof window !== 'undefined' && 'BroadcastChannel' in window;

/**
 * Vue composable for communication between browser windows/tabs
 * @param channelName - The name of the communication channel
 * @returns { state, postMessage } - The current state and a function to post messages
 */
export function useWindowCommunication(channelName: string): {
  state: Ref<WindowCommunicationState>;
  postMessage: (message: any) => void;
} {
  if (channelName === undefined) {
    throw Error('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  }

  const state = ref<WindowCommunicationState>({
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
        // 触发本地存储事件
        window.dispatchEvent(new StorageEvent('storage', {
          key: channelName,
          newValue: msg,
        }));
      }
    }
  }

  function updateState(data: { message: any }) {
    state.value = {
      lastMessage: data.message,
      messages: [...state.value.messages, data.message],
    };
  }

  function updateFromLocalStorage(e: StorageEvent) {
    if (e.key !== channelName) return;
    
    try {
      const data = JSON.parse(e.newValue || '');
      if (data && data.message) {
        updateState({ message: data.message });
      }
    } catch (error) {
      console.info('Window Communication: Failed to parse json from localstorage');
    }
  }

  onMounted(() => {
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

  onUnmounted(() => {
    if (channel) {
      channel.close();
      channel = null;
    }
    window.removeEventListener('storage', updateFromLocalStorage);
  });

  return {
    state,
    postMessage,
  };
} 