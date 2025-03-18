---
sidebar_position: 6
---

# useWindowCommunication

用于在不同浏览器窗口/标签页之间进行通信的 Hook。

## 介绍

`useWindowCommunication` 提供了一种简单的方式来实现不同浏览器窗口或标签页之间的通信。它优先使用现代的 `BroadcastChannel` API，如果浏览器不支持，则回退到使用 `localStorage` 事件。

## 特性

- 支持跨窗口/标签页通信
- 自动在 `BroadcastChannel` 和 `localStorage` 之间切换
- 保存消息历史
- 提供最新消息和消息历史记录
- 支持 React、Vue 3 和 Solid
- TypeScript 支持

## 使用方法

### React

```tsx
import { useWindowCommunication } from '@septem/hooks/react';

function ChatWindow() {
  const [state, postMessage] = useWindowCommunication('chat-channel');
  const { lastMessage, messages } = state;

  const sendMessage = () => {
    postMessage({
      text: 'Hello from window 1!',
      timestamp: Date.now()
    });
  };

  return (
    <div>
      <button onClick={sendMessage}>发送消息</button>
      <div>
        <h3>最新消息：</h3>
        {lastMessage && <pre>{JSON.stringify(lastMessage, null, 2)}</pre>}
      </div>
      <div>
        <h3>消息历史：</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{JSON.stringify(msg)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { useWindowCommunication } from '@septem/hooks/vue';

const { state, postMessage } = useWindowCommunication('chat-channel');

const sendMessage = () => {
  postMessage({
    text: 'Hello from window 1!',
    timestamp: Date.now()
  });
};
</script>

<template>
  <div>
    <button @click="sendMessage">发送消息</button>
    <div>
      <h3>最新消息：</h3>
      <pre v-if="state.lastMessage">{{ JSON.stringify(state.lastMessage, null, 2) }}</pre>
    </div>
    <div>
      <h3>消息历史：</h3>
      <ul>
        <li v-for="(msg, index) in state.messages" :key="index">
          {{ JSON.stringify(msg) }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

### Solid

```tsx
import { useWindowCommunication } from '@septem/hooks/solid';

function ChatWindow() {
  const [state, postMessage] = useWindowCommunication('chat-channel');

  const sendMessage = () => {
    postMessage({
      text: 'Hello from window 1!',
      timestamp: Date.now()
    });
  };

  return (
    <div>
      <button onClick={sendMessage}>发送消息</button>
      <div>
        <h3>最新消息：</h3>
        {state().lastMessage && <pre>{JSON.stringify(state().lastMessage, null, 2)}</pre>}
      </div>
      <div>
        <h3>消息历史：</h3>
        <ul>
          {state().messages.map((msg, index) => (
            <li key={index}>{JSON.stringify(msg)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## API

### 参数

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| channelName | 通信频道名称 | `string` | 是 |

### 返回值

#### React

```typescript
[
  {
    lastMessage: any;    // 最新接收到的消息
    messages: any[];     // 消息历史记录
  },
  (message: any) => void // 发送消息的函数
]
```

#### Vue

```typescript
{
  state: Ref<{
    lastMessage: any;    // 最新接收到的消息
    messages: any[];     // 消息历史记录
  }>,
  postMessage: (message: any) => void // 发送消息的函数
}
```

#### Solid

```typescript
[
  () => ({
    lastMessage: any;    // 最新接收到的消息
    messages: any[];     // 消息历史记录
  }),
  (message: any) => void // 发送消息的函数
]
```

## 注意事项

1. 在使用 `localStorage` 模式时，消息大小受限于 `localStorage` 的容量限制（通常为 5-10MB）。
2. 如果浏览器支持 `BroadcastChannel` API，将优先使用它，因为它提供了更好的性能和可靠性。
3. 消息必须是可以被 JSON 序列化的数据。
4. 在组件卸载时，会自动清理通信通道和事件监听器。
5. 不同框架版本的返回值格式略有不同，请注意使用正确的方式访问状态：
   - React：直接访问 state 对象
   - Vue：通过 state.value 访问
   - Solid：通过 state() 函数调用访问

## 示例

### 基础用法（React）

```tsx
import { useWindowCommunication } from '@septem/hooks/react';

function WindowA() {
  const [state, postMessage] = useWindowCommunication('my-channel');

  return (
    <button onClick={() => postMessage('Hello from Window A')}>
      发送消息
    </button>
  );
}

function WindowB() {
  const [{ lastMessage }] = useWindowCommunication('my-channel');

  return (
    <div>
      收到的消息: {lastMessage}
    </div>
  );
}
```

### 基础用法（Vue）

```vue
<script setup lang="ts">
import { useWindowCommunication } from '@septem/hooks/vue';

// 发送方
const { postMessage } = useWindowCommunication('my-channel');

// 接收方
const { state } = useWindowCommunication('my-channel');
</script>

<template>
  <button @click="() => postMessage('Hello from Window A')">
    发送消息
  </button>
  <div>
    收到的消息: {{ state.lastMessage }}
  </div>
</template>
```

### 基础用法（Solid）

```tsx
import { useWindowCommunication } from '@septem/hooks/solid';

function WindowA() {
  const [state, postMessage] = useWindowCommunication('my-channel');

  return (
    <button onClick={() => postMessage('Hello from Window A')}>
      发送消息
    </button>
  );
}

function WindowB() {
  const [state] = useWindowCommunication('my-channel');

  return (
    <div>
      收到的消息: {state().lastMessage}
    </div>
  );
}
```

## 浏览器兼容性

- `BroadcastChannel` API：
  - Chrome 54+
  - Firefox 38+
  - Edge 79+
  - Safari 15.4+
  - Opera 41+

- `localStorage` 回退方案：
  - IE 8+
  - 所有现代浏览器 