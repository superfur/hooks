---
sidebar_position: 1
---

# useToggle

`useToggle` 是一个用于管理布尔状态切换的 Hook，支持 React、Vue 和 Solid 三种框架。

## 基本用法

### React

```tsx
import { useToggle } from '@septem/hooks/react';

function ToggleDemo() {
  const [value, toggle] = useToggle();
  
  return (
    <div>
      <p>当前状态: {value.toString()}</p>
      <button onClick={() => toggle()}>切换</button>
      <button onClick={() => toggle(true)}>设为 true</button>
      <button onClick={() => toggle(false)}>设为 false</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useToggle } from '@septem/hooks/vue';

const [value, toggle] = useToggle();
</script>

<template>
  <div>
    <p>当前状态: {{ value }}</p>
    <button @click="toggle()">切换</button>
    <button @click="toggle(true)">设为 true</button>
    <button @click="toggle(false)">设为 false</button>
  </div>
</template>
```

### Solid

```tsx
import { useToggle } from '@septem/hooks/solid';

function ToggleDemo() {
  const [value, toggle] = useToggle();
  
  return (
    <div>
      <p>当前状态: {value().toString()}</p>
      <button onClick={() => toggle()}>切换</button>
      <button onClick={() => toggle(true)}>设为 true</button>
      <button onClick={() => toggle(false)}>设为 false</button>
    </div>
  );
}
```

## API

```typescript
function useToggle(initialValue?: boolean): UseToggleReturn;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValue | 可选的初始值 | `boolean` | `false` |

### 返回值

| 框架 | 返回类型 | 说明 |
| --- | --- | --- |
| React | `[boolean, (nextValue?: boolean) => void]` | 布尔状态值和切换函数 |
| Vue | `[{ value: boolean }, (nextValue?: boolean) => void]` | 包含value属性的ref对象和切换函数 |
| Solid | `[() => boolean, (nextValue?: boolean) => void]` | 获取状态值的函数和切换函数 |

### 切换函数

切换函数接受一个可选的布尔参数：

- 不传参数：切换当前状态（true 变为 false，false 变为 true）
- 传入布尔值：将状态设置为指定的值