import { renderHook, act } from '@testing-library/react';
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

describe('useSpeechRecognition (React)', () => {
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

  it('应该初始化状态', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.supported).toBe(true);
    expect(result.current.isListening).toBe(false);
    expect(result.current.transcript).toBe('');
    expect(result.current.interimTranscript).toBe('');
  });

  it('应该调用 start 方法', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // 等待 useEffect 执行完成
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.start();
    });

    expect(mockRecognitionInstance.start).toHaveBeenCalled();
  });

  it('应该调用 stop 方法', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // 等待 useEffect 执行完成
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.stop();
    });

    expect(mockRecognitionInstance.stop).toHaveBeenCalled();
  });

  it('应该重置转录内容', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // 等待 useEffect 执行完成
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.transcript).toBe('');
    expect(result.current.interimTranscript).toBe('');
  });

  it('应该处理语音识别结果', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // 等待 useEffect 执行完成
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // 启动语音识别
    act(() => {
      result.current.start();
    });

    // 等待 recognitionInstance 被设置
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

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
    act(() => {
      mockRecognitionInstance.onresult(resultEvent);
    });

    // 等待状态更新
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.transcript).toBe('你好世界');
  });
}); 