import { useState, useEffect, useRef } from 'react';

interface WindowCommunicationState {
  lastMessage: any;
  messages: any[];
}

const initialState: WindowCommunicationState = {
  lastMessage: undefined,
  messages: [],
};

const supportsBroadcastAPI = typeof window !== 'undefined' && 'BroadcastChannel' in window;

/**
 * React hook for communication between browser windows/tabs
 * @param channelName - The name of the communication channel
 * @returns [state, postMessage] - The current state and a function to post messages
 */
export function useWindowCommunication(channelName: string): [WindowCommunicationState, (message: any) => void] {
  if (channelName === undefined) {
    throw Error('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  }

  const [state, setMessages] = useState<WindowCommunicationState>(initialState);
  const channel = useRef<BroadcastChannel | null>(null);

  if (supportsBroadcastAPI && !channel.current) {
    channel.current = new BroadcastChannel(channelName);
  }

  function postMessage(message: any) {
    if (message) {
      const msg = JSON.stringify({
        message,
        time: Date.now(),
      });

      if (supportsBroadcastAPI && channel.current) {
        channel.current.postMessage(msg);
      } else {
        window.localStorage.setItem(channelName, msg);
      }
    }
  }

  function updateState(data: { message: any }) {
    setMessages((prevState) => ({
      lastMessage: data.message,
      messages: [...prevState.messages, data.message],
    }));
  }

  function updateFromLocalStorage(e: StorageEvent) {
    try {
      const data = JSON.parse(e.newValue || '');
      if (data !== null && data !== undefined) {
        updateState(data);
      }
    } catch (error) {
      console.info('Window Communication: Failed to parse json from localstorage');
    }
  }

  useEffect(() => {
    if (supportsBroadcastAPI && channel.current) {
      channel.current.onmessage = (e) => updateState(JSON.parse(e.data));
    } else {
      window.addEventListener('storage', updateFromLocalStorage);
    }

    return () => {
      if (channel.current) {
        channel.current.close();
        channel.current = null;
      } else {
        window.localStorage.removeItem(channelName);
        window.removeEventListener('storage', updateFromLocalStorage);
      }
    };
  }, [channelName]);

  return [state, postMessage];
} 