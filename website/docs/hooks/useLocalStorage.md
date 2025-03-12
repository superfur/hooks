---
sidebar_position: 2
---

# useLocalStorage

`useLocalStorage` 是一个用于在浏览器本地存储中持久化数据的 Hook，支持 React、Vue 和 Solid 三种框架。

## 基本用法

### React

```tsx
import { useLocalStorage } from '@septem/hooks/react';

function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage('my-key', 'initial');
  
  return (
    <div>
      <p>当前值: {value}</p>
      <button onClick={() => setValue('new value')}>设置新值</button>
      <button onClick={() => setValue(prev => `${prev}-updated`)}>更新值</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useLocalStorage } from '@septem/hooks/vue';

const [value, setValue] = useLocalStorage('my-key', 'initial');
</script>

<template>
  <div>
    <p>当前值: {{ value }}</p>
    <button @click="setValue('new value')">设置新值</button>
    <button @click="setValue(prev => `${prev}-updated`)">更新值</button>
  </div>
</template>
```

### Solid

```tsx
import { useLocalStorage } from '@septem/hooks/solid';

function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage('my-key', 'initial');
  
  return (
    <div>
      <p>当前值: {value()}</p>
      <button onClick={() => setValue('new value')}>设置新值</button>
      <button onClick={() => setValue(prev => `${prev}-updated`)}>更新值</button>
    </div>
  );
}
```

## 自定义序列化和反序列化

```tsx
// React 示例
const [value, setValue] = useLocalStorage('my-key', 5, {
  serializer: (v) => String(v * 2),
  deserializer: (v) => Number(v) / 2
});
```

## API

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions
): UseLocalStorageReturn<T>;

type UseLocalStorageOptions = {
  serializer?: <T>(value: T) => string;
  deserializer?: <T>(value: string) => T;
};
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | localStorage 的键名 | `string` | - |
| initialValue | 初始值，当 localStorage 中不存在对应键值时使用 | `T` | - |
| options | 可选配置项 | `UseLocalStorageOptions` | `{}` |

### 选项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| serializer | 自定义序列化函数 | `<T>(value: T) => string` | `JSON.stringify` |
| deserializer | 自定义反序列化函数 | `<T>(value: string) => T` | `JSON.parse` |

### 返回值

| 框架 | 返回类型 | 说明 |
| --- | --- | --- |
| React | `[T, (value: T \| ((prev: T) => T)) => void]` | 存储的值和设置函数 |
| Vue | `[{ value: T }, (value: T \| ((prev: T) => T)) => void]` | 包含value属性的ref对象和设置函数 |
| Solid | `[() => T, (value: T \| ((prev: T) => T)) => void]` | 获取值的函数和设置函数 |

### 注意事项

- 当 localStorage 操作失败时（例如隐私模式或存储已满），会回退到使用内存中的状态值
- 设置函数支持传入新值或更新函数
- 当值发生变化时，会触发 `local-storage` 事件，便于跨标签页同步