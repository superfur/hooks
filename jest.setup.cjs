// Vue 相关配置
const Vue = require('vue');
global.Vue = Vue;

// 添加 Vue 编译器相关配置
const VueCompilerDOM = require('@vue/compiler-dom');
global.VueCompilerDOM = VueCompilerDOM;

// 添加 VueServerRenderer 模拟
global.VueServerRenderer = { 
  renderToString: () => '<div></div>' 
};

// 确保 window 对象可用
if (typeof window === 'undefined') {
  global.window = global;
}

// 将 Vue 暴露给 window
global.window.Vue = Vue;

// 解决模块导入的问题
jest.mock('@vue/test-utils', () => {
  const VueTestUtils = jest.requireActual('@vue/test-utils');
  return VueTestUtils;
});

const { createApp } = Vue;

const app = createApp({});
globalThis.Vue = Vue;
globalThis.app = app;

// 添加语音合成相关的全局定义
globalThis.SpeechSynthesisUtterance = class SpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.voice = null;
    this.pitch = 1;
    this.rate = 1;
    this.volume = 1;
    this.lang = 'en-US';
  }
};

// 添加语音识别相关的全局定义
globalThis.SpeechRecognition = class SpeechRecognition {
  constructor() {
    this.continuous = true;
    this.interimResults = true;
    this.lang = 'en-US';
  }
  start() {}
  stop() {}
  addEventListener() {}
  removeEventListener() {}
};

// 模拟函数
const mockFn = () => {
  const fn = function() {};
  fn.mockReturnValue = () => fn;
  fn.mockImplementation = () => fn;
  fn.mockRestore = () => fn;
  return fn;
};

// 添加 EventTarget 到 speechSynthesis
globalThis.speechSynthesis = {
  ...globalThis.speechSynthesis,
  addEventListener: mockFn(),
  removeEventListener: mockFn(),
  dispatchEvent: mockFn(),
}; 