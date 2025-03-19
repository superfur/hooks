---
id: useDocumentTitle
title: useDocumentTitle
---

# useDocumentTitle

`useDocumentTitle` 是一个用于更新和管理文档标题的钩子。它允许您动态地设置页面标题，并可以选择在组件卸载时是否还原原始标题。

`useDocumentTitle` is a hook for updating and managing document title. It allows you to dynamically set the page title and optionally restore the original title when the component unmounts.

## 用法 / Usage

### React

```jsx
import { useDocumentTitle } from '@septem/hooks/react';

function ProfilePage({ username }) {
  // 设置文档标题，组件卸载时会恢复原始标题
  // Set document title, will restore original title on unmount
  useDocumentTitle(`${username}的个人资料 | My App`);

  // 设置文档标题并在组件卸载时保留设置的标题
  // Set document title and keep it when component unmounts
  // useDocumentTitle(`${username}的个人资料 | My App`, true);
  
  return <div>个人资料内容</div>;
}
```

### Vue

```vue
<script setup>
import { ref } from 'vue';
import { useDocumentTitle } from '@septem/hooks/vue';

// 使用静态标题
// Use static title
useDocumentTitle('新页面标题 | My App');

// 使用响应式标题
// Use reactive title
const title = ref('初始标题');
useDocumentTitle(title);

// 5秒后更新标题
// Update title after 5 seconds
setTimeout(() => {
  title.value = '更新后的标题';
}, 5000);
</script>
```

### Solid

```jsx
import { createSignal } from 'solid-js';
import { useDocumentTitle } from '@septem/hooks/solid';

function App() {
  // 基本用法
  // Basic usage
  useDocumentTitle('页面标题 | My App');
  
  // 使用信号
  // Using signal
  const [title, setTitle] = createSignal('初始标题');
  useDocumentTitle(title);
  
  return (
    <div>
      <button onClick={() => setTitle('更新后的标题')}>
        更新标题
      </button>
    </div>
  );
}
```

## API

### 参数 / Parameters

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|-------|------|
| title | `string` \| `Ref<string>` \| `() => string` | 是 | - | 要设置的文档标题。在 React 中可以是字符串，在 Vue 中可以是字符串或 Ref，在 Solid 中可以是字符串或信号函数。 |
| prevailOnUnmount | `boolean` \| `Ref<boolean>` \| `() => boolean` | 否 | false | 控制组件卸载时的行为。设为 true 时，卸载组件不会恢复原始标题；设为 false 时，卸载组件会恢复原始标题。 |

### 返回值 / Return Value

此钩子没有返回值。

This hook does not return a value.

## 实现细节 / Implementation Details

`useDocumentTitle` 钩子会在组件挂载时保存原始的文档标题，并设置新的标题。当组件卸载时，它会根据 `prevailOnUnmount` 参数的值决定是否恢复原始标题。

The `useDocumentTitle` hook saves the original document title when the component mounts and sets the new title. When the component unmounts, it decides whether to restore the original title based on the value of the `prevailOnUnmount` parameter.

### React 实现 / React Implementation

在 React 中，`useDocumentTitle` 使用 `useEffect` 来处理标题的设置和恢复逻辑，并支持标题的动态更新。

In React, `useDocumentTitle` uses `useEffect` to handle the logic for setting and restoring the title, and supports dynamic title updates.

### Vue 实现 / Vue Implementation

在 Vue 中，`useDocumentTitle` 使用 `watchEffect` 来响应式地更新标题，并在 `onUnmounted` 生命周期钩子中处理恢复逻辑。

In Vue, `useDocumentTitle` uses `watchEffect` to reactively update the title and handles restoration logic in the `onUnmounted` lifecycle hook.

### Solid 实现 / Solid Implementation

在 Solid 中，`useDocumentTitle` 使用 `createEffect` 来跟踪标题变化，并使用 `onCleanup` 来处理组件卸载时的恢复逻辑。

In Solid, `useDocumentTitle` uses `createEffect` to track title changes and uses `onCleanup` to handle restoration logic when the component unmounts.

## 使用场景 / Use Cases

- 在单页应用 (SPA) 中为不同的页面设置不同的标题
- Setting different titles for different pages in a Single Page Application (SPA)

- 基于动态数据更新标题，如用户名、项目名等
- Updating titles based on dynamic data such as usernames, project names, etc.

- 创建面包屑式的标题，反映用户在应用中的导航路径
- Creating breadcrumb-style titles that reflect the user's navigation path in the application

## 注意事项 / Notes

- 在服务器端渲染 (SSR) 环境中，此钩子可能需要特殊处理，因为 `document` 对象在服务器上不可用
- In Server-Side Rendering (SSR) environments, this hook might need special handling as the `document` object is not available on the server

- 如果多个组件同时使用此钩子，最后挂载的组件的标题设置将会覆盖之前的设置
- If multiple components use this hook simultaneously, the title setting of the last mounted component will override previous settings

- 标题的更改可能会影响浏览器历史记录中显示的条目名称
- Title changes may affect the entry names displayed in the browser history 