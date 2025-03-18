import { createRoot } from 'solid-js';
import { useWindowCommunication } from '../useWindowCommunication';

type DisposeFn = () => void;

function createTestRoot(fn: (dispose: DisposeFn) => void) {
  createRoot((dispose) => {
    fn(dispose);
    return undefined;
  });
}

describe('useWindowCommunication', () => {
  beforeAll(() => {
    jest.setTimeout(15000);
  });

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should throw error if channelName is undefined', () => {
    expect(() => {
      createTestRoot((dispose) => {
        try {
          useWindowCommunication(undefined as unknown as string);
        } finally {
          dispose();
        }
      });
    }).toThrow('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  });

  it('should handle invalid JSON in localStorage', () => {
    createTestRoot(() => {
      const consoleInfoSpy = jest.spyOn(console, 'info');
      const [, postMessage] = useWindowCommunication('test-channel');

      // Wait for onMount to complete
      setTimeout(() => {
        window.localStorage.setItem('test-channel', 'invalid-json');
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'test-channel',
          newValue: 'invalid-json',
        }));

        try {
          expect(consoleInfoSpy).toHaveBeenCalledWith(
            'Window Communication: Failed to parse json from localstorage'
          );
          consoleInfoSpy.mockRestore();
        } catch (error) {
          consoleInfoSpy.mockRestore();
          throw error;
        }
      }, 0);
    });
  }, 15000);

  it('should update state when receiving messages through localStorage', () => {
    return new Promise<void>((resolve) => {
      createTestRoot((dispose) => {
        const [state, postMessage] = useWindowCommunication('test-channel');
        const message = { test: 'message' };

        jest.advanceTimersByTime(100);
        postMessage(message);
        jest.advanceTimersByTime(100);

        try {
          expect(state().lastMessage).toEqual(message);
          expect(state().messages).toEqual([message]);
          dispose();
          resolve();
        } catch (error) {
          dispose();
          throw error;
        }
      });
    });
  });
}); 