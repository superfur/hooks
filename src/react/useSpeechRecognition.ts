import { useState, useEffect, useCallback } from 'react';

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
 * React hook for speech recognition functionality
 * @param options - Configuration options for speech recognition
 * @returns Object containing speech recognition state and control functions
 */
export function useSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    supported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
  });

  const recognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = options.continuous ?? true;
    recognitionInstance.interimResults = options.interimResults ?? true;
    recognitionInstance.lang = options.lang ?? 'en-US';

    return recognitionInstance;
  }, [options.continuous, options.interimResults, options.lang]);

  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  useEffect(() => {
    if (!state.supported) return;

    const instance = recognition();
    setRecognitionInstance(instance);

    instance.onstart = () => {
      setState(prev => ({ ...prev, isListening: true }));
    };

    instance.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    instance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setState(prev => ({
        ...prev,
        transcript: finalTranscript,
        interimTranscript,
      }));
    };

    instance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setState(prev => ({ ...prev, isListening: false }));
    };

    return () => {
      if (instance) {
        instance.stop();
      }
    };
  }, [state.supported, recognition]);

  const start = useCallback(() => {
    if (!state.supported || !recognitionInstance) return;
    recognitionInstance.start();
  }, [state.supported, recognitionInstance]);

  const stop = useCallback(() => {
    if (!state.supported || !recognitionInstance) return;
    recognitionInstance.stop();
  }, [state.supported, recognitionInstance]);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      interimTranscript: '',
    }));
  }, []);

  return {
    start,
    stop,
    reset,
    transcript: state.transcript,
    interimTranscript: state.interimTranscript,
    isListening: state.isListening,
    supported: state.supported,
  };
} 