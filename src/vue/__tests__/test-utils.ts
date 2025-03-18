import { createApp } from 'vue';

// 简单的挂载函数，创建并返回组件实例
export function simpleMount(component: any) {
  const app = createApp(component);
  const root = document.createElement('div');
  const vm = app.mount(root);
  return {
    vm,
    text: () => root.textContent,
    unmount: () => app.unmount()
  };
}

// 模拟不可避免的异步操作等待
export async function tick() {
  return new Promise(resolve => setTimeout(resolve, 0));
} 