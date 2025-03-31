# useFocus

元素焦点管理 hook。

Element focus management hook.

## 使用示例 Usage Examples

### React

```tsx
import { useFocus } from '@septem/hooks/react';

function MyComponent() {
  const [inputRef, focusInput] = useFocus<HTMLInputElement>();
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { useFocus } from '@septem/hooks/vue';

const { elementRef, focusElement } = useFocus<HTMLInputElement>();
</script>

<template>
  <div>
    <input :ref="elementRef" />
    <button @click="focusElement">聚焦输入框</button>
  </div>
</template>
```

### Solid

```tsx
import { useFocus } from '@septem/hooks/solid';

function MyComponent() {
  const { elementRef, focusElement } = useFocus<HTMLInputElement>();
  
  return (
    <div>
      <input ref={elementRef} />
      <button onClick={focusElement}>聚焦输入框</button>
    </div>
  );
}
```

## API

### 参数 Parameters

无参数 / No parameters

### 返回值 Return Value

#### React

```typescript
[React.RefObject<T>, () => void]
```

#### Vue

```typescript
{
  elementRef: Ref<T | null>,
  focusElement: () => void
}
```

#### Solid

```typescript
{
  elementRef: (el?: T) => T | undefined,
  focusElement: () => void
}
```

## 特性 Features

- 支持泛型类型 / Supports generic types
- 自动处理 requestAnimationFrame / Automatically handles requestAnimationFrame
- 空引用安全 / Null reference safe
- 类型安全 / Type-safe

## 注意事项 Notes

- 使用 requestAnimationFrame 确保在下一帧执行聚焦操作 / Uses requestAnimationFrame to ensure focus operation executes in the next frame
- 当元素引用为空时不会抛出错误 / Does not throw error when element reference is null
- 在 Vue 中返回的是 `Ref` 对象 / Returns a `Ref` object in Vue
- 在 Solid 中返回的是引用回调函数 / Returns a ref callback function in Solid 