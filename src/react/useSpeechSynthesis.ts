import { useState, useEffect, useCallback } from 'react';

interface SpeechSynthesisOptions {
  voice?: SpeechSynthesisVoice;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
}

interface SpeechSynthesisState {
  isPlaying: boolean;
  voices: SpeechSynthesisVoice[];
  speaking: boolean;
  supported: boolean;
}

/**
 * React hook for text-to-speech functionality
 * @param options - Configuration options for speech synthesis
 * @returns Object containing speech synthesis state and control functions
 */
export function useSpeechSynthesis(options: SpeechSynthesisOptions = {}) {
  const [state, setState] = useState<SpeechSynthesisState>({
    isPlaying: false,
    voices: [],
    speaking: false,
    supported: 'speechSynthesis' in window,
  });

  useEffect(() => {
    if (!state.supported) return;

    const updateVoices = () => {
      setState(prev => ({
        ...prev,
        voices: window.speechSynthesis.getVoices(),
      }));
    };

    // 初始化获取voices
    updateVoices();

    // Chrome和Safari需要等待voiceschanged事件
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!state.supported) return;

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
  }, [options, state.supported]);

  const cancel = useCallback(() => {
    if (!state.supported) return;
    window.speechSynthesis.cancel();
    setState(prev => ({ ...prev, isPlaying: false, speaking: false }));
  }, [state.supported]);

  const pause = useCallback(() => {
    if (!state.supported) return;
    window.speechSynthesis.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, [state.supported]);

  const resume = useCallback(() => {
    if (!state.supported) return;
    window.speechSynthesis.resume();
    setState(prev => ({ ...prev, isPlaying: true }));
  }, [state.supported]);

  return {
    speak,
    cancel,
    pause,
    resume,
    speaking: state.speaking,
    supported: state.supported,
    voices: state.voices,
    isPlaying: state.isPlaying,
  };
} 