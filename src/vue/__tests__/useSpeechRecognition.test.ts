import { defineComponent, nextTick } from 'vue';
import { useSpeechRecognition } from '../useSpeechRecognition';
import { simpleMount, tick } from './test-utils';

declare global {
  interface Window {
    SpeechRecognition: jest.Mock;
  }
}

type SpeechRecognitionEvent = Event & {
  resultIndex: number;
  results: { transcript: string; isFinal?: boolean }[][];
};

describe('useSpeechRecognition (Vue)', () => {
  let mockRecognitionInstance: any;

  beforeEach(() => {
    mockRecognitionInstance = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      continuous: false,
      interimResults: false,
      lang: '',
      onstart: null,
      onend: null,
      onresult: null,
      onerror: null,
    };

    window.SpeechRecognition = jest.fn(() => mockRecognitionInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('应该调用 start 方法', async () => {
    const TestComponent = defineComponent({
      setup() {
        const speech = useSpeechRecognition();
        
        return {
          speech,
        };
      },
      template: '<div>{{ speech.transcript }}</div>',
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    // @ts-ignore
    wrapper.vm.speech.start();
    expect(mockRecognitionInstance.start).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该调用 stop 方法', async () => {
    const TestComponent = defineComponent({
      setup() {
        const speech = useSpeechRecognition();
        
        return {
          speech,
        };
      },
      template: '<div>{{ speech.transcript }}</div>',
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    // @ts-ignore
    wrapper.vm.speech.stop();
    expect(mockRecognitionInstance.stop).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('应该处理语音识别结果', async () => {
    const TestComponent = defineComponent({
      setup() {
        const speech = useSpeechRecognition();
        
        return {
          speech,
        };
      },
      template: '<div>{{ speech.transcript }}</div>',
    });

    const wrapper = simpleMount(TestComponent);
    await tick();

    // 启动语音识别
    // @ts-ignore
    wrapper.vm.speech.start();

    // 模拟语音识别结果
    const resultEvent = new Event('result') as SpeechRecognitionEvent;
    Object.defineProperty(resultEvent, 'results', {
      get: () => {
        const results = [[{ transcript: '你好世界' }]] as { transcript: string; isFinal?: boolean }[][];
        (results[0] as any).isFinal = true;
        return results;
      }
    });
    Object.defineProperty(resultEvent, 'resultIndex', {
      get: () => 0,
    });

    // 调用事件处理器
    mockRecognitionInstance.onresult(resultEvent);
    await tick();

    expect(wrapper.text()).toBe('你好世界');
    wrapper.unmount();
  });
}); 