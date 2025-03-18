import { ref, onMounted, onUnmounted } from 'vue';

interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

/**
 * Vue composable for speech recognition functionality
 * @param options - Configuration options for speech recognition
 * @returns Object containing speech recognition state and control functions
 */
export function useSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const isListening = ref(false);
  const transcript = ref('');
  const interimTranscript = ref('');
  const supported = ref('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  let recognition: any = null;

  onMounted(() => {
    if (!supported.value) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = options.continuous ?? true;
    recognition.interimResults = options.interimResults ?? true;
    recognition.lang = options.lang ?? 'en-US';

    recognition.onstart = () => {
      isListening.value = true;
    };

    recognition.onend = () => {
      isListening.value = false;
    };

    recognition.onresult = (event: any) => {
      let currentInterimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += result;
        } else {
          currentInterimTranscript += result;
        }
      }

      transcript.value = finalTranscript;
      interimTranscript.value = currentInterimTranscript;
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      isListening.value = false;
    };
  });

  onUnmounted(() => {
    if (recognition) {
      recognition.stop();
    }
  });

  const start = () => {
    if (!supported.value || !recognition) return;
    recognition.start();
  };

  const stop = () => {
    if (!supported.value || !recognition) return;
    recognition.stop();
  };

  const reset = () => {
    transcript.value = '';
    interimTranscript.value = '';
  };

  return {
    start,
    stop,
    reset,
    transcript,
    interimTranscript,
    isListening,
    supported,
  };
} 