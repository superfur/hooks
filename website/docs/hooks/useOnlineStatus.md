---
id: useOnlineStatus
title: useOnlineStatus
---

# useOnlineStatus

`useOnlineStatus` 是一个用于跟踪用户在线状态的钩子。它能够实时监测用户的网络连接状态变化，并返回一个表示当前在线状态的布尔值。

`useOnlineStatus` is a hook for tracking the user's online status. It monitors network connection status changes in real-time and returns a boolean value representing the current online status.

## 用法 / Usage

### React

```jsx
import { useOnlineStatus } from '@septem/hooks/react';

function NetworkStatus() {
  // 获取当前在线状态
  // Get current online status
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      <h2>网络状态 / Network Status</h2>
      <div style={{ color: isOnline ? 'green' : 'red' }}>
        {isOnline ? '在线 / Online' : '离线 / Offline'}
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useOnlineStatus } from '@septem/hooks/vue';

// 获取当前在线状态
// Get current online status
const isOnline = useOnlineStatus();
</script>

<template>
  <div>
    <h2>网络状态 / Network Status</h2>
    <div :style="{ color: isOnline ? 'green' : 'red' }">
      {{ isOnline ? '在线 / Online' : '离线 / Offline' }}
    </div>
  </div>
</template>
```

### Solid

```jsx
import { useOnlineStatus } from '@septem/hooks/solid';

function NetworkStatus() {
  // 获取当前在线状态
  // Get current online status
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      <h2>网络状态 / Network Status</h2>
      <div style={{ color: isOnline() ? 'green' : 'red' }}>
        {isOnline() ? '在线 / Online' : '离线 / Offline'}
      </div>
    </div>
  );
}
```

## API

### 返回值 / Return Value

- **React**: `boolean` - 表示当前在线状态的布尔值 (true 表示在线，false 表示离线)
- **Vue**: `Ref<boolean>` - 包含当前在线状态的响应式引用
- **Solid**: `() => boolean` - 返回当前在线状态的信号访问器函数

## 实现细节 / Implementation Details

`useOnlineStatus` 钩子在内部使用了浏览器的 `navigator.onLine` 属性和 `online`/`offline` 事件来监听网络状态的变化。

The `useOnlineStatus` hook internally uses the browser's `navigator.onLine` property and the `online`/`offline` events to monitor changes in network status.

### React 实现 / React Implementation

在 React 中，`useOnlineStatus` 使用 `useState` 来存储当前的在线状态，并使用 `useEffect` 来添加和移除事件监听器。

In React, `useOnlineStatus` uses `useState` to store the current online status and `useEffect` to add and remove event listeners.

### Vue 实现 / Vue Implementation

在 Vue 中，`useOnlineStatus` 使用 `ref` 来创建一个响应式的在线状态变量，并在 `onMounted` 和 `onUnmounted` 生命周期钩子中处理事件监听器。

In Vue, `useOnlineStatus` uses `ref` to create a reactive variable for the online status and handles event listeners in the `onMounted` and `onUnmounted` lifecycle hooks.

### Solid 实现 / Solid Implementation

在 Solid 中，`useOnlineStatus` 使用 `createSignal` 来创建一个信号来存储在线状态，并使用 `onMount` 和清理函数来管理事件监听器。

In Solid, `useOnlineStatus` uses `createSignal` to create a signal for storing the online status and uses `onMount` with a cleanup function to manage event listeners.

## 注意事项 / Notes

- 不同浏览器检测网络状态的方式可能有所不同，`navigator.onLine` 在某些情况下可能不够准确。
- The way different browsers detect network status may vary, and `navigator.onLine` might not be accurate in some cases.

- 此钩子仅检测设备是否连接到网络，但不能确保互联网连接是有效的。
- This hook only detects if the device is connected to a network but doesn't ensure that the internet connection is valid.

- 在 SSR (服务器端渲染) 环境中，此钩子会默认返回 `true` (表示在线)，因为服务器环境无法访问浏览器 API。
- In SSR (Server-Side Rendering) environments, this hook will default to `true` (online) as browser APIs are not accessible in server environments. 