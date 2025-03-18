import { createSignal, onMount, onCleanup } from 'solid-js';

interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  supported: boolean;
}

/**
 * Solid.js hook for speech recognition functionality
 * @param options - Configuration options for speech recognition
 * @returns Object containing speech recognition state and control functions
 */
export function useSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const [state, setState] = createSignal<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    supported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
  });

  let recognition: any = null;

  onMount(() => {
    if (!state().supported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = options.continuous ?? true;
    recognition.interimResults = options.interimResults ?? true;
    recognition.lang = options.lang ?? 'en-US';

    recognition.onstart = () => {
      setState(prev => ({ ...prev, isListening: true }));
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
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

      setState(prev => ({
        ...prev,
        transcript: prev.transcript + finalTranscript,
        interimTranscript: currentInterimTranscript,
      }));
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setState(prev => ({ ...prev, isListening: false }));
    };

    onCleanup(() => {
      if (recognition) {
        recognition.stop();
      }
    });
  });

  const start = () => {
    if (!state().supported || !recognition) return;
    recognition.start();
  };

  const stop = () => {
    if (!state().supported || !recognition) return;
    recognition.stop();
  };

  const reset = () => {
    setState(prev => ({
      ...prev,
      transcript: '',
      interimTranscript: '',
    }));
  };

  return [
    state,
    {
      start,
      stop,
      reset,
    },
  ] as const;
} 