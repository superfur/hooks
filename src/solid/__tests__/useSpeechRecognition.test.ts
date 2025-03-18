import { createRoot } from 'solid-js';
import { useSpeechRecognition } from '../useSpeechRecognition';

declare global {
  interface Window {
    SpeechRecognition: jest.Mock;
  }
}

type SpeechRecognitionEvent = Event & {
  resultIndex: number;
  results: { transcript: string }[][];
};

describe('useSpeechRecognition (Solid)', () => {
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

  describe('基本功能', () => {
    it('应该调用 start 方法', () => {
      createRoot(dispose => {
        const [state, { start }] = useSpeechRecognition();
        
        // 等待组件挂载
        setTimeout(() => {
          start();
          expect(mockRecognitionInstance.start).toHaveBeenCalled();
          dispose();
        }, 0);
      });
    });

    it('应该调用 stop 方法', () => {
      createRoot(dispose => {
        const [state, { stop }] = useSpeechRecognition();
        
        // 等待组件挂载
        setTimeout(() => {
          stop();
          expect(mockRecognitionInstance.stop).toHaveBeenCalled();
          dispose();
        }, 0);
      });
    });
  });

  describe('语音识别', () => {
    it('应该处理语音识别结果', () => {
      createRoot(dispose => {
        const [state, { start }] = useSpeechRecognition();
        
        // 等待组件挂载
        setTimeout(() => {
          // 启动语音识别
          start();

          // 模拟语音识别结果
          const resultEvent = new Event('result') as SpeechRecognitionEvent;
          Object.defineProperty(resultEvent, 'results', {
            get: () => [[{ transcript: '你好' }, { transcript: '世界' }]],
          });
          Object.defineProperty(resultEvent, 'resultIndex', {
            get: () => 0,
          });

          // 调用事件处理器
          mockRecognitionInstance.onresult(resultEvent);

          // 验证状态更新
          expect(state().transcript).toBe('你好世界');
          dispose();
        }, 0);
      });
    });
  });
}); 