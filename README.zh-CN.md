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

- **useToggle**: 用于管理布尔切换状态的 hook
- **useLocalStorage**: 用于在 localStorage 中持久化数据的 hook
- **useClippy**: 用于与剪贴板交互的 hook

## 文档

有关详细文档和示例，请访问我们的[文档网站](https://your-docs-site.com)。

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