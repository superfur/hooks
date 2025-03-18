import { createRoot } from 'solid-js';
import { useSpeechSynthesis } from '../useSpeechSynthesis';
import type { SpeechSynthesisState } from '../useSpeechSynthesis';

describe('useSpeechSynthesis (Solid)', () => {
  let disposeFn: () => void;
  let mockSpeechSynthesis: any;
  const mockVoices = [
    { name: 'Voice 1', lang: 'en-US' },
    { name: 'Voice 2', lang: 'zh-CN' }
  ];

  beforeEach(() => {
    mockSpeechSynthesis = {
      getVoices: jest.fn().mockReturnValue(mockVoices),
      speak: jest.fn(),
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    (window as any).speechSynthesis = mockSpeechSynthesis;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('应该正确初始化', () => {
    createRoot(dispose => {
      disposeFn = dispose;
      const [state] = useSpeechSynthesis();

      expect(state().isPlaying).toBe(false);
      expect(state().speaking).toBe(false);
      expect(state().voices).toEqual([]);
      dispose();
    });
  });

  it('应该调用 speak 方法', () => {
    createRoot((dispose) => {
      const [, { speak }] = useSpeechSynthesis();
      speak('测试文本');
      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
      dispose();
    });
  });

  it('应该调用 cancel 方法', () => {
    createRoot((dispose) => {
      const [, { cancel }] = useSpeechSynthesis();
      cancel();
      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
      dispose();
    });
  });

  it('应该调用 pause 方法', () => {
    createRoot((dispose) => {
      const [, { pause }] = useSpeechSynthesis();
      pause();
      expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
      dispose();
    });
  });

  it('应该调用 resume 方法', () => {
    createRoot((dispose) => {
      const [, { resume }] = useSpeechSynthesis();
      resume();
      expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
      dispose();
    });
  });

  it('应该更新 voices', async () => {
    createRoot(dispose => {
      disposeFn = dispose;
      const [state] = useSpeechSynthesis();

      // 等待 onMount 完成
      setTimeout(() => {
        expect(mockSpeechSynthesis.getVoices).toHaveBeenCalled();
        const voicesChangedListener = mockSpeechSynthesis.addEventListener.mock.calls.find(
          (call: [string, () => void]) => call[0] === 'voiceschanged'
        )?.[1];

        if (voicesChangedListener) {
          voicesChangedListener();
          expect(state().voices).toEqual(mockVoices);
          dispose();
        }
      }, 100);
    });
  }, 15000); // 增加超时时间到 15 秒
}); 