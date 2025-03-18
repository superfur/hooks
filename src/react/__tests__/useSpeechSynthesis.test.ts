import { renderHook, act } from '@testing-library/react';
import { useSpeechSynthesis } from '../useSpeechSynthesis';

describe('useSpeechSynthesis (React)', () => {
  const mockSpeechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn().mockReturnValue([]),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
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

  it('应该初始化状态', () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    expect(result.current.supported).toBe(true);
    expect(result.current.speaking).toBe(false);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.voices).toEqual([]);
  });

  it('应该调用 speak 方法', () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    act(() => {
      result.current.speak('测试文本');
    });

    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  it('应该调用 cancel 方法', () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    act(() => {
      result.current.cancel();
    });

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  it('应该调用 pause 方法', () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    act(() => {
      result.current.pause();
    });

    expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
  });

  it('应该调用 resume 方法', () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    act(() => {
      result.current.resume();
    });

    expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
  });

  it('应该更新 voices', () => {
    const mockVoices = [{ name: 'Voice 1' }, { name: 'Voice 2' }];
    mockSpeechSynthesis.getVoices.mockReturnValueOnce(mockVoices);

    const { result } = renderHook(() => useSpeechSynthesis());

    // 触发 voiceschanged 事件
    const eventTarget = new EventTarget();
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        ...mockSpeechSynthesis,
        addEventListener: eventTarget.addEventListener.bind(eventTarget),
        removeEventListener: eventTarget.removeEventListener.bind(eventTarget),
        dispatchEvent: eventTarget.dispatchEvent.bind(eventTarget),
      },
      configurable: true,
    });
    const voicesChangedEvent = new Event('voiceschanged');
    window.speechSynthesis.dispatchEvent(voicesChangedEvent);

    expect(mockSpeechSynthesis.getVoices).toHaveBeenCalled();
  });
}); 