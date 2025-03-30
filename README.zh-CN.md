# @septem/hooks

一个兼容 React、Vue 3 和 SolidJS 的 Hooks 库。

## 特性

- **框架无关**: 在 React、Vue 3 和 SolidJS 中使用相同的 hooks
- **TypeScript 支持**: 为每个框架提供完整的 TypeScript 类型支持
- **轻量级**: 最小化依赖，支持 tree-shaking
- **一致的 API**: 在所有框架中使用相似的 API 模式

## 安装

```bash
# npm
npm install @septem/hooks

# yarn
yarn add @septem/hooks

# pnpm
pnpm add @septem/hooks
```

## 使用方法

从特定框架路径导入 hooks:

### React

```jsx
import { useToggle, useLocalStorage, useClippy } from '@septem/hooks/react';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const [name, setName] = useLocalStorage('user-name', '');
  const [clipboard, setClipboard] = useClippy();
  
  // 使用这些 hooks...
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
  
  // 使用这些 hooks...
}
```

## 可用的 Hooks

- **useToggle**: 用于管理布尔值切换状态的钩子
- **useLocalStorage**: 用于在 localStorage 中持久化数据的钩子
- **useClippy**: 用于与剪贴板交互的钩子
- **useOnlineStatus**: 用于跟踪用户在线状态的钩子
- **useDocumentTitle**: 用于更新和管理文档标题的钩子
- **useDelay**: 用于延迟执行的钩子

## 文档

有关详细文档和示例，请访问我们的[文档网站](https://your-docs-site.com)。

### useDocumentTitle

用于更新和管理文档标题的钩子。

#### React 示例

```jsx
import { useDocumentTitle } from '@your-org/hooks/react';

function ProfilePage({ username }) {
  // 设置文档标题，组件卸载时会恢复原始标题
  useDocumentTitle(`${username}的个人资料 | My App`);

  // 设置文档标题并在组件卸载时保留设置的标题
  // useDocumentTitle(`${username}的个人资料 | My App`, true);
  
  return <div>个人资料内容</div>;
}
```

#### Vue 示例

```vue
<script setup>
import { ref } from 'vue';
import { useDocumentTitle } from '@your-org/hooks/vue';

// 使用静态标题
useDocumentTitle('新页面标题 | My App');

// 使用响应式标题
const title = ref('初始标题');
useDocumentTitle(title);

// 5秒后更新标题
setTimeout(() => {
  title.value = '更新后的标题';
}, 5000);
</script>
```

#### Solid 示例

```jsx
import { createSignal } from 'solid-js';
import { useDocumentTitle } from '@your-org/hooks/solid';

function App() {
  // 基本用法
  useDocumentTitle('页面标题 | My App');
  
  // 使用信号
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

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件。

## English Documentation

[View English Documentation](./README.md)