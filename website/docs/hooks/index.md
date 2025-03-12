---
sidebar_position: 1
---

# Hooks 总览

@septem/hooks 是一个兼容 React、Vue 3 和 SolidJS 的 Hooks 库，提供了一系列实用的 hooks，帮助你更高效地开发应用。

## 安装

```bash
# npm
npm install @septem/hooks

# yarn
yarn add @septem/hooks

# pnpm
pnpm add @septem/hooks
```

## 可用的 Hooks

目前，@septem/hooks 提供以下 hooks：

- [useToggle](./useToggle.md) - 用于管理布尔切换状态
- [useLocalStorage](./useLocalStorage.md) - 用于在 localStorage 中持久化数据
- [useClippy](./useClippy.md) - 用于与剪贴板交互

## 使用方式

从特定框架路径导入 hooks:

```js
// React
import { useToggle } from '@septem/hooks/react';

// Vue 3
import { useToggle } from '@septem/hooks/vue';

// SolidJS
import { useToggle } from '@septem/hooks/solid';
```

## 框架差异

虽然所有 hooks 在不同框架中的功能相同，但由于框架特性的不同，它们的返回值格式略有差异：

| 框架 | 状态值格式 | 示例 |
| --- | --- | --- |
| React | 直接值 | `const [value, setValue] = useX()` |
| Vue | 包含 value 属性的 ref 对象 | `const [value, setValue] = useX()` 使用 `value.value` 访问 |
| Solid | 获取函数 | `const [getValue, setValue] = useX()` 使用 `getValue()` 访问 |

每个 hook 的文档页面都包含了针对不同框架的使用示例。