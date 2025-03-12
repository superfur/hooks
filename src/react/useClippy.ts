import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

interface ClipboardDataWindow extends Window {
  clipboardData: DataTransfer | null;
}

type ClipboardEventListener = EventListener | EventListenerObject | null;

// 自定义类型，不再继承Navigator
interface ClipboardNavigator {
  clipboard: {
    readText(): Promise<string>;
    writeText(text: string): Promise<void>;
    addEventListener(type: string, listener: ClipboardEventListener): void;
    removeEventListener(type: string, listener: ClipboardEventListener): void;
  };
}

type ClipboardTuple = [
  string,
  (clipboard: string) => void,
];

type VoidFunction = () => void;

const hasClipboardData = (w: Window): w is ClipboardDataWindow =>
  Object.prototype.hasOwnProperty.call(w, 'clipboardData');

const getClipboardData = (w: ClipboardDataWindow | Window): DataTransfer | null => {
  if (hasClipboardData(w)) {
    return w.clipboardData;
  }
  return null;
};

const isClipboardApiEnabled = (navigator: Navigator): boolean => (
  typeof navigator === 'object' &&
  typeof navigator.clipboard === 'object'
);

const NOT_ALLOWED_ERROR = new Error('NotAllowed');

const zeroStyles = (element: HTMLElement, ...properties: string[]): void => {
  for (const property of properties) {
    element.style.setProperty(property, '0');
  }
};

const createTextArea = (): HTMLTextAreaElement => {
  const textArea: HTMLTextAreaElement = document.createElement('textarea');
  textArea.setAttribute('cols', '0');
  textArea.setAttribute('rows', '0');
  zeroStyles(textArea,
    'border-width',
    'bottom',
    'margin-left', 'margin-top',
    'outline-width',
    'padding-bottom', 'padding-left', 'padding-right', 'padding-top',
    'right',
  );
  textArea.style.setProperty('box-sizing', 'border-box');
  textArea.style.setProperty('height', '1px');
  textArea.style.setProperty('margin-bottom', '-1px');
  textArea.style.setProperty('margin-right', '-1px');
  textArea.style.setProperty('max-height', '1px');
  textArea.style.setProperty('max-width', '1px');
  textArea.style.setProperty('min-height', '1px');
  textArea.style.setProperty('min-width', '1px');
  textArea.style.setProperty('outline-color', 'transparent');
  textArea.style.setProperty('position', 'absolute');
  textArea.style.setProperty('width', '1px');
  document.body.appendChild(textArea);
  return textArea;
};

const removeElement = (element: HTMLElement): void => {
  element.parentNode!.removeChild(element);
};

const read = (): string => {
  const textArea: HTMLTextAreaElement = createTextArea();
  textArea.focus();
  const success: boolean = document.execCommand('paste');

  // If we don't have permission to read the clipboard,
  //   cleanup and throw an error.
  if (!success) {
    removeElement(textArea);
    throw NOT_ALLOWED_ERROR;
  }
  const value: string = textArea.value;
  removeElement(textArea);
  return value;
};

const write = (text: string): void => {
  const textArea: HTMLTextAreaElement = createTextArea();
  textArea.value = text;
  textArea.select();
  const success: boolean = document.execCommand('copy');
  removeElement(textArea);
  if (!success) {
    throw NOT_ALLOWED_ERROR;
  }
};

/**
 * React版本的剪贴板Hook
 * @param initialValue 可选的初始剪贴板值
 * @returns [剪贴板内容, 设置剪贴板内容的函数]
 */
export function useClippy(initialValue = ''): ClipboardTuple {
  const [clipboard, setClipboard] = useState(initialValue);

  // If the user manually updates their clipboard,
  //   re-render with the new value.
  useEffect((): void | VoidFunction => {
    if (isClipboardApiEnabled(navigator)) {
      // 在测试环境中，navigator.clipboard可能没有addEventListener方法
      // 所以我们需要检查这些方法是否存在
      const hasEventListeners = typeof navigator.clipboard.addEventListener === 'function' &&
                               typeof navigator.clipboard.removeEventListener === 'function';
      
      if (hasEventListeners) {
        const clipboardListener = (event: Event): void => {
          const clipEvent = event as ClipboardEvent;
          const dataTransfer: DataTransfer | null =
            clipEvent.clipboardData ||
            getClipboardData(window) ||
            null;
          if (dataTransfer) {
            const text = dataTransfer.getData('text/plain');
            if (clipboard !== text) {
              setClipboard(text);
            }
          }
        };
        navigator.clipboard.addEventListener('copy', clipboardListener);
        navigator.clipboard.addEventListener('cut', clipboardListener);
        return (): void => {
          navigator.clipboard.removeEventListener('copy', clipboardListener);
          navigator.clipboard.removeEventListener('cut', clipboardListener);
        };
      }
    }

    // Fallback to reading document.getSelection
    const clipboardListener = (): void => {
      try {
        const selection: null | Selection = document.getSelection();
        if (selection) {
          setClipboard(selection.toString());
        }
      } catch (_err) {
        console.error('Failed to write to clipboard:', _err);
      }
    }
    document.addEventListener('copy', clipboardListener);
    document.addEventListener('cut', clipboardListener);
    return (): void => {
      document.removeEventListener('copy',clipboardListener);
      document.removeEventListener('cut',clipboardListener);
    };
  }, []);

  const syncClipboard = useCallback(async (text: string): Promise<void> => {
    // Always update the state regardless of clipboard API success
    setClipboard(text);
    
    try {
      // Try document.execCommand first
      write(text);
    }
    catch (e) {
      if (isClipboardApiEnabled(navigator)) {
        try {
          // Fallback to clipboard API
          await navigator.clipboard.writeText(text);
        }
        catch (_err) { 
          console.error('Failed to write to clipboard:', _err);
        }
      }
    }
  }, []);

  // Try to read synchronously.
  useLayoutEffect((): void => {
    try {
      const text: string = read();
      if (clipboard !== text) {
        setClipboard(text);
      }
    }

    // If synchronous reading is disabled, try to read asynchronously.
    catch (_syncErr) {
      if (isClipboardApiEnabled(navigator)) {
        (async (): Promise<void> => {
          try {
            const text: string = await navigator.clipboard.readText();
            if (clipboard !== text) {
              setClipboard(text);
            }
          }
          catch (_asyncErr) {
            console.error('Failed to read to clipboard:', _asyncErr);
          }
        })();
      }
    }
  }, []);

  return [clipboard, syncClipboard];
}