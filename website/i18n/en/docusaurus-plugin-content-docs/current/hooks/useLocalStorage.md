---
sidebar_position: 2
---

# useLocalStorage

`useLocalStorage` is a Hook for persisting data in browser's local storage, supporting React, Vue, and Solid frameworks.

## Basic Usage

### React

```tsx
import { useLocalStorage } from '@septem/hooks/react';

function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage('my-key', 'initial');
  
  return (
    <div>
      <p>Current value: {value}</p>
      <button onClick={() => setValue('new value')}>Set new value</button>
      <button onClick={() => setValue(prev => `${prev}-updated`)}>Update value</button>
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
    <p>Current value: {{ value }}</p>
    <button @click="setValue('new value')">Set new value</button>
    <button @click="setValue(prev => `${prev}-updated`)">Update value</button>
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
      <p>Current value: {value()}</p>
      <button onClick={() => setValue('new value')}>Set new value</button>
      <button onClick={() => setValue(prev => `${prev}-updated`)}>Update value</button>
    </div>
  );
}
```

## API

```typescript
const [state, setState] = useLocalStorage(key: string, initialValue: T);
```

### Parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| key | localStorage key | `string` | - |
| initialValue | Initial state value | `T` | - |

### Return Values

| Return Value | Description | Type |
| --- | --- | --- |
| state | Current state | Framework-specific state value |
| setState | Function to update state | `(value: T \| ((prevState: T) => T)) => void` |