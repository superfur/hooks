import { defineComponent, ref, nextTick } from 'vue';
import { useWindowCommunication } from '../useWindowCommunication';
import { Ref } from 'vue';
import { simpleMount, tick } from './test-utils';

interface WindowCommunicationState {
  lastMessage: any;
  messages: any[];
}

describe('useWindowCommunication', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should throw error if channelName is undefined', () => {
    expect(() => {
      useWindowCommunication(undefined as unknown as string);
    }).toThrow('You need to pass a channel name e.g. useWindowCommunication("GreatChannel")');
  });

  it('should initialize with empty messages array', () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state.messages }}</div>',
      setup() {
        const { state } = useWindowCommunication('test-channel');
        return {
          state
        };
      }
    });
    const wrapper = simpleMount(TestComponent);
    // @ts-ignore
    expect(wrapper.vm.state.messages).toEqual([]);
    wrapper.unmount();
  });

  it('should update state when receiving message through localStorage', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state.messages }}</div>',
      setup() {
        const { state } = useWindowCommunication('test-channel');
        return {
          state
        };
      }
    });
    const wrapper = simpleMount(TestComponent);
    const message = { id: '1', text: 'test message' };
    
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test-channel',
        newValue: JSON.stringify({ message, time: Date.now() })
      })
    );

    await tick();
    await new Promise(resolve => setTimeout(resolve, 100));
    // @ts-ignore
    expect(wrapper.vm.state.messages).toContainEqual(message);
    wrapper.unmount();
  });

  it('should handle invalid json in localStorage', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state.messages }}</div>',
      setup() {
        const { state } = useWindowCommunication('test-channel');
        return {
          state
        };
      }
    });
    const wrapper = simpleMount(TestComponent);
    
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test-channel',
        newValue: 'invalid json'
      })
    );

    await tick();
    await new Promise(resolve => setTimeout(resolve, 100));
    // @ts-ignore
    expect(wrapper.vm.state.messages).toEqual([]);
    wrapper.unmount();
  });
}); 