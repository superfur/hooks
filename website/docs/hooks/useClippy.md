---
sidebar_position: 3
---

# useClippy

`useClippy` 是一个用于操作剪贴板的 Hook，支持 React、Vue 和 Solid 三种框架。

## 基本用法

### React

```tsx
import { useClippy } from '@septem/hooks/react';

function ClippyDemo() {
  const [clipboard, setClipboard] = useClippy();
  
  return (
    <div>
      <p>当前剪贴板内容: {clipboard}</p>
      <button onClick={() => setClipboard('复制到剪贴板的文本')}>复制文本</button>
      <input 
        value={clipboard} 
        onChange={(e) => setClipboard(e.target.value)} 
        placeholder="输入要复制的文本"
      />
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useClippy } from '@septem/hooks/vue';

const [clipboard, setClipboard] = useClippy();
</script>

<template>
  <div>
    <p>当前剪贴板内容: {{ clipboard }}</p>
    <button @click="setClipboard('复制到剪贴板的文本')">复制文本</button>
    <input 
      v-model="clipboard.value" 
      @input="setClipboard(clipboard.value)" 
      placeholder="输入要复制的文本"
    />
  </div>
</template>
```

### Solid

```tsx
import { useClippy } from '@septem/hooks/solid';

function ClippyDemo() {
  const [clipboard, setClipboard] = useClippy();
  
  return (
    <div>
      <p>当前剪贴板内容: {clipboard()}</p>
      <button onClick={() => setClipboard('复制到剪贴板的文本')}>复制文本</button>
      <input 
        value={clipboard()} 
        onInput={(e) => setClipboard(e.target.value)} 
        placeholder="输入要复制的文本"
      />
    </div>
  );
}
```

## API

```typescript
function useClippy(initialValue?: string): UseClippyReturn;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValue | 可选的初始值 | `string` | `''` |

### 返回值

| 框架 | 返回类型 | 说明 |
| --- | --- | --- |
| React | `[string, (text: string) => Promise<void>]` | 剪贴板内容和设置函数 |
| Vue | `[{ value: string }, (text: string) => Promise<void>]` | 包含value属性的ref对象和设置函数 |
| Solid | `[() => string, (text: string) => Promise<void>]` | 获取剪贴板内容的函数和设置函数 |

### 设置函数

设置函数接受一个字符串参数，将其写入剪贴板：

- 优先使用现代的 `navigator.clipboard` API
- 在不支持或无权限的环境中，回退到传统的 `document.execCommand('copy')` 方法
- 返回一个 Promise，可以用于处理复制成功或失败的情况

### 注意事项

- 由于安全限制，剪贴板操作可能需要用户授权或在特定上下文中执行（如用户交互事件处理程序中）
- 在某些环境中（如隐私浏览模式或某些移动浏览器），剪贴板操作可能会被限制
- 错误处理已内置，但你可以通过 Promise 的 catch 方法添加自定义错误处理