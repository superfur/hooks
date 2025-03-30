# useDelay

延迟执行 hook。

A hook for delayed execution.

## 使用示例 Usage Examples

### React

```tsx
import { useDelay } from '@hooks/react';

function MyComponent() {
  const done = useDelay(1000);
  
  return <div>{done ? '延迟完成' : '等待中...'}</div>;
}
```

### Vue

```vue
<script setup lang="ts">
import { useDelay } from '@hooks/vue';

const { value: done } = useDelay(1000);
</script>

<template>
  <div>{{ done ? '延迟完成' : '等待中...' }}</div>
</template>
```

### Solid

```tsx
import { useDelay } from '@hooks/solid';

function MyComponent() {
  const done = useDelay(1000);
  
  return <div>{done() ? '延迟完成' : '等待中...'}</div>;
}
```

## API

### 参数 Parameters

| 参数名 | 类型 | 描述 | 默认值 |
|--------|------|------|--------|
| delay | `number` | 延迟时间(毫秒) / Delay time (milliseconds) | `0` |

### 返回值 Return Value

#### React

```typescript
boolean
```

#### Vue

```typescript
{
  value: Ref<boolean>
}
```

#### Solid

```typescript
Accessor<boolean>
```

## 特性 Features

- 支持零延迟 / Supports zero delay
- 自动清理定时器 / Automatically cleans up timers
- 支持默认值 / Supports default values
- 类型安全 / Type-safe

## 注意事项 Notes

- 当 `delay` 为 0 时,会立即返回 `true` / When `delay` is 0, returns `true` immediately
- 组件卸载时会自动清理定时器 / Automatically cleans up timers when component unmounts
- 在 Vue 中返回的是 `Ref` 对象 / Returns a `Ref` object in Vue
- 在 Solid 中返回的是 `Accessor` 函数 / Returns an `Accessor` function in Solid 