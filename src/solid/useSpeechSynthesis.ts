import { createSignal, onMount, onCleanup } from 'solid-js';

/**
 * Configuration options for speech synthesis.
 * 语音合成配置选项接口。
 * 
 * @public
 */
export interface SpeechSynthesisOptions {
  /** 
   * The voice to use for speech synthesis.
   * 要使用的语音。
   */
  voice?: SpeechSynthesisVoice;
  /** 
   * The pitch of the voice (range: 0 to 2, default: 1).
   * 语音的音调（范围：0 到 2，默认值：1）。
   */
  pitch?: number;
  /** 
   * The rate of speech (range: 0.1 to 10, default: 1).
   * 语音的速率（范围：0.1 到 10，默认值：1）。
   */
  rate?: number;
  /** 
   * The volume of speech (range: 0 to 1, default: 1).
   * 语音的音量（范围：0 到 1，默认值：1）。
   */
  volume?: number;
  /** 
   * The language of speech (e.g., 'en-US', 'zh-CN').
   * 语音的语言（例如：'en-US'，'zh-CN'）。
   */
  lang?: string;
}

/**
 * State interface for speech synthesis.
 * 语音合成状态接口。
 * 
 * @public
 */
export interface SpeechSynthesisState {
  /** 
   * Whether speech is currently playing.
   * 是否正在播放。
   */
  isPlaying: boolean;
  /** 
   * Available voices for speech synthesis.
   * 可用的语音列表。
   */
  voices: SpeechSynthesisVoice[];
  /** 
   * Whether speech synthesis is currently speaking.
   * 是否正在说话。
   */
  speaking: boolean;
  /** 
   * Whether speech synthesis is supported in the current browser.
   * 当前浏览器是否支持语音合成。
   */
  supported: boolean;
}

/**
 * A Solid.js hook for text-to-speech functionality using the Web Speech API.
 * Solid.js 语音合成 Hook，使用 Web Speech API 提供文字转语音功能。
 * 
 * @remarks
 * This hook provides a wrapper around the browser's Speech Synthesis API,
 * offering text-to-speech capabilities with play, pause, resume, and cancel controls.
 * 
 * 这个 hook 封装了浏览器的语音合成 API，提供文字转语音功能，
 * 包括播放、暂停、继续和取消等控制操作。
 * 
 * @example
 * ```tsx
 * // English usage example / 英文使用示例
 * import { useSpeechSynthesis } from './useSpeechSynthesis';
 * 
 * function App() {
 *   const [state, { speak, pause, resume, cancel }] = useSpeechSynthesis({
 *     lang: 'en-US',
 *     rate: 1,
 *     pitch: 1
 *   });
 * 
 *   return (
 *     <div>
 *       <button onClick={() => speak('Hello, world!')}>Play</button>
 *       <button onClick={pause}>Pause</button>
 *       <button onClick={resume}>Resume</button>
 *       <button onClick={cancel}>Cancel</button>
 *     </div>
 *   );
 * }
 * 
 * // Chinese usage example / 中文使用示例
 * function ChineseApp() {
 *   const [state, { speak, pause, resume, cancel }] = useSpeechSynthesis({
 *     lang: 'zh-CN',
 *     rate: 1,
 *     pitch: 1
 *   });
 * 
 *   return (
 *     <div>
 *       <button onClick={() => speak('你好，世界！')}>播放</button>
 *       <button onClick={pause}>暂停</button>
 *       <button onClick={resume}>继续</button>
 *       <button onClick={cancel}>取消</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param options - Configuration options for speech synthesis / 语音合成的配置选项
 * @returns A tuple containing state and control functions / 返回包含状态和控制函数的元组：
 * - `[0]`: Speech synthesis state signal / 语音合成的状态信号
 * - `[1]`: Control functions object / 控制函数对象：
 *   - `speak`: Start speaking the given text / 开始播放指定文本
 *   - `cancel`: Cancel the current speech / 取消当前语音
 *   - `pause`: Pause the current speech / 暂停当前语音
 *   - `resume`: Resume the paused speech / 继续已暂停的语音
 * 
 * @public
 */
export function useSpeechSynthesis(options: SpeechSynthesisOptions = {}) {
  const [state, setState] = createSignal<SpeechSynthesisState>({
    isPlaying: false,
    voices: [],
    speaking: false,
    supported: 'speechSynthesis' in window,
  });

  onMount(() => {
    if (!state().supported) return;

    /**
     * Update available voices when the browser's voice list changes
     * 当浏览器的语音列表发生变化时更新可用的语音列表
     */
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setState(prev => ({
          ...prev,
          voices: voices,
        }));
      }
    };

    // 直接调用 getVoices() 并更新状态
    updateVoices();

    // 添加 voiceschanged 事件监听器
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

    onCleanup(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    });
  });

  /**
   * Speak the specified text content
   * 播放指定的文本内容
   * 
   * @param text - The text to be converted to speech / 要转换成语音的文本内容
   */
  const speak = (text: string) => {
    if (!state().supported) return;

    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // 应用配置选项
    if (options.voice) utterance.voice = options.voice;
    if (options.pitch) utterance.pitch = options.pitch;
    if (options.rate) utterance.rate = options.rate;
    if (options.volume) utterance.volume = options.volume;
    if (options.lang) utterance.lang = options.lang;

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isPlaying: true, speaking: true }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isPlaying: false, speaking: false }));
    };

    utterance.onerror = () => {
      setState(prev => ({ ...prev, isPlaying: false, speaking: false }));
    };

    window.speechSynthesis.speak(utterance);
  };

  /**
   * Cancel the current speech synthesis
   * 取消当前正在播放的语音
   */
  const cancel = () => {
    if (!state().supported) return;
    window.speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, speaking: false }));
  };

  /**
   * Pause the current speech synthesis
   * 暂停当前正在播放的语音
   */
  const pause = () => {
    if (!state().supported) return;
    window.speechSynthesis.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  /**
   * Resume the paused speech synthesis
   * 继续播放已暂停的语音
   */
  const resume = () => {
    if (!state().supported) return;
    window.speechSynthesis.resume();
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  return [
    state,
    {
      speak,
      cancel,
      pause,
      resume,
    },
  ] as const;
} 