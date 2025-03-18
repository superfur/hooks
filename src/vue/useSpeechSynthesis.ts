import { ref, onMounted, onUnmounted } from 'vue';

interface SpeechSynthesisOptions {
  voice?: SpeechSynthesisVoice;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
}

/**
 * Vue composable for text-to-speech functionality
 * @param options - Configuration options for speech synthesis
 * @returns Object containing speech synthesis state and control functions
 */
export function useSpeechSynthesis(options: SpeechSynthesisOptions = {}) {
  const isPlaying = ref(false);
  const voices = ref<SpeechSynthesisVoice[]>([]);
  const speaking = ref(false);
  const supported = ref('speechSynthesis' in window);

  let voicesChangedHandler: () => void;

  onMounted(() => {
    if (!supported.value) return;

    voicesChangedHandler = () => {
      voices.value = window.speechSynthesis.getVoices();
    };

    // 初始化获取voices
    voicesChangedHandler();

    // Chrome和Safari需要等待voiceschanged事件
    window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
  });

  onUnmounted(() => {
    if (supported.value && voicesChangedHandler) {
      window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
    }
  });

  const speak = (text: string) => {
    if (!supported.value) return;

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
      isPlaying.value = true;
      speaking.value = true;
    };

    utterance.onend = () => {
      isPlaying.value = false;
      speaking.value = false;
    };

    utterance.onerror = () => {
      isPlaying.value = false;
      speaking.value = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported.value) return;
    window.speechSynthesis.cancel();
    isPlaying.value = false;
    speaking.value = false;
  };

  const pause = () => {
    if (!supported.value) return;
    window.speechSynthesis.pause();
    isPlaying.value = false;
  };

  const resume = () => {
    if (!supported.value) return;
    window.speechSynthesis.resume();
    isPlaying.value = true;
  };

  return {
    speak,
    cancel,
    pause,
    resume,
    speaking,
    supported,
    voices,
    isPlaying,
  };
} 