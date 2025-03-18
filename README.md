# @septem/hooks

A hooks library compatible with React, Vue 3, and SolidJS.

## Features

- **Framework Agnostic**: Use the same hooks across React, Vue 3, and SolidJS
- **TypeScript Support**: Full TypeScript support with proper types for each framework
- **Lightweight**: Minimal dependencies and tree-shakable
- **Consistent API**: Similar API patterns across all frameworks

## Installation

```bash
# npm
npm install @septem/hooks

# yarn
yarn add @septem/hooks

# pnpm
pnpm add @septem/hooks
```

## Usage

Import hooks from the specific framework path:

### React

```jsx
import { useToggle, useLocalStorage, useClippy } from '@septem/hooks/react';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const [name, setName] = useLocalStorage('user-name', '');
  const [clipboard, setClipboard] = useClippy();
  
  // Use the hooks...
}
```

### Vue 3

```vue
<script setup>
import { useToggle, useLocalStorage, useClippy } from '@septem/hooks/vue';

const [value, toggle] = useToggle(false);
const [name, setName] = useLocalStorage('user-name', '');
const [clipboard, setClipboard] = useClippy();
</script>
```

### SolidJS

```jsx
import { useToggle, useLocalStorage, useClippy } from '@septem/hooks/solid';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const [name, setName] = useLocalStorage('user-name', '');
  const [clipboard, setClipboard] = useClippy();
  
  // Use the hooks...
}
```

## Available Hooks

- **useToggle**: A hook for managing boolean toggle states
- **useLocalStorage**: A hook for persisting data in localStorage
- **useClippy**: A hook for interacting with the clipboard
- **useOnlineStatus**: A hook for tracking user's online status
- **useDocumentTitle**: A hook for updating and managing document title

## Documentation

For detailed documentation and examples, visit our [documentation site](https://your-docs-site.com).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 中文文档

[查看中文文档](./README.zh-CN.md)

### useToggle

切换布尔值状态的钩子。
A hook for toggling boolean state.

### useOnlineStatus

跟踪用户在线状态的钩子。
A hook for tracking user's online status.

### useDocumentTitle

用于更新和管理文档标题的钩子。
A hook for updating and managing document title.

#### React 示例 / React Example

```jsx
import { useDocumentTitle } from '@your-org/hooks/react';

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

#### Vue 示例 / Vue Example

```vue
<script setup>
import { ref } from 'vue';
import { useDocumentTitle } from '@your-org/hooks/vue';

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

#### Solid 示例 / Solid Example

```jsx
import { createSignal } from 'solid-js';
import { useDocumentTitle } from '@your-org/hooks/solid';

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