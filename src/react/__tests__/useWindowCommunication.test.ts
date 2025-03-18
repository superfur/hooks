import { renderHook, act } from '@testing-library/react';
import { useWindowCommunication } from '../useWindowCommunication';

describe('useWindowCommunication (React)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should throw error if channelName is undefined', () => {
    expect(() => {
      renderHook(() => useWindowCommunication(undefined as unknown as string));
    }).toThrow('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useWindowCommunication('test-channel'));
    const [state] = result.current;

    expect(state).toEqual({
      lastMessage: undefined,
      messages: [],
    });
  });

  it('should update state when receiving message through localStorage', () => {
    const { result } = renderHook(() => useWindowCommunication('test-channel'));
    const message = { text: 'Hello from another window' };

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'test-channel',
        newValue: JSON.stringify({ message, time: Date.now() }),
      });
      window.dispatchEvent(event);
    });

    const [state] = result.current;
    expect(state.lastMessage).toEqual(message);
    expect(state.messages).toContainEqual(message);
  });

  it('should handle invalid JSON in localStorage', () => {
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const { result } = renderHook(() => useWindowCommunication('test-channel'));

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'test-channel',
        newValue: 'invalid-json',
      });
      window.dispatchEvent(event);
    });

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Window Communication: Failed to parse json from localstorage'
    );
    consoleInfoSpy.mockRestore();
  });

  it('should post message to localStorage when BroadcastChannel is not supported', () => {
    const { result } = renderHook(() => useWindowCommunication('test-channel'));
    const [, postMessage] = result.current;
    const message = { text: 'Test message' };

    act(() => {
      postMessage(message);
    });

    const storedData = window.localStorage.getItem('test-channel');
    expect(storedData).toBeTruthy();
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.message).toEqual(message);
    expect(parsedData.time).toBeDefined();
  });

  it('should clean up on unmount', () => {
    const { unmount } = renderHook(() => useWindowCommunication('test-channel'));
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
}); 