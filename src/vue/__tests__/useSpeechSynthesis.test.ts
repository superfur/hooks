import { defineComponent, nextTick } from 'vue';
import { useSpeechSynthesis } from '../useSpeechSynthesis';
import { simpleMount, tick } from './test-utils';

describe('useSpeechSynthesis (Vue)', () => {
  const mockSpeechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn().mockReturnValue([]),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };

  beforeAll(() => {
    // 模拟 window.speechSynthesis
    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('应该初始化状态', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    // @ts-ignore
    const state = wrapper.vm.state;
    expect(state.supported.value).toBe(true);
    expect(state.speaking.value).toBe(false);
    expect(state.isPlaying.value).toBe(false);
    expect(state.voices.value).toEqual([]);
    wrapper.unmount();
  });

  it('应该调用 speak 方法', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        speech.speak('测试文本');
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该调用 cancel 方法', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        speech.cancel();
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该调用 pause 方法', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        speech.pause();
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该调用 resume 方法', async () => {
    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        speech.resume();
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该更新 voices', async () => {
    const mockVoices = [{ name: 'Voice 1' }, { name: 'Voice 2' }];
    mockSpeechSynthesis.getVoices.mockReturnValueOnce(mockVoices);

    const TestComponent = defineComponent({
      template: '<div>{{ state }}</div>',
      setup() {
        const speech = useSpeechSynthesis();
        return { state: speech };
      },
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    // 触发 voiceschanged 事件
    const voicesChangedEvent = new Event('voiceschanged');
    window.speechSynthesis.dispatchEvent(voicesChangedEvent);
    await tick();

    expect(mockSpeechSynthesis.getVoices).toHaveBeenCalled();
    wrapper.unmount();
  });
}); 