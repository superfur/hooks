# useOnClick

一个用于监听点击事件的 Vue Composition API hook。

## 用法

```ts
import { useOnClick } from '@vueuse/core';

// 在组件中使用
const MyComponent = defineComponent({
  setup() {
    useOnClick((event) => {
      console.log('点击事件触发', event);
    });
  }
});
```

## 类型定义

```ts
function useOnClick(handler: (event: MouseEvent) => void): void
```

## 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| handler | `(event: MouseEvent) => void` | 点击事件处理函数 |

## 特性

- 自动在组件挂载时添加事件监听器
- 自动在组件卸载时移除事件监听器
- 支持 TypeScript
- 使用 Vue 的生命周期钩子 `onMounted` 和 `onUnmounted`

## 示例

### 基本用法

```ts
import { useOnClick } from '@vueuse/core';

const MyComponent = defineComponent({
  setup() {
    useOnClick(() => {
      console.log('点击了文档');
    });
  }
});
```

### 获取点击位置

```ts
import { useOnClick } from '@vueuse/core';

const MyComponent = defineComponent({
  setup() {
    useOnClick((event) => {
      console.log('点击位置:', event.clientX, event.clientY);
    });
  }
});
```

### 条件处理

```ts
import { useOnClick } from '@vueuse/core';

const MyComponent = defineComponent({
  setup() {
    useOnClick((event) => {
      // 只在点击特定元素时处理
      if (event.target instanceof HTMLElement && event.target.matches('.my-button')) {
        console.log('点击了按钮');
      }
    });
  }
});
```

## 注意事项

- 事件监听器会在组件卸载时自动移除，无需手动清理
- 如果需要动态更新处理函数，建议在组件中重新渲染
- 事件监听器是全局的，会捕获整个文档的点击事件 