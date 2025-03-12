---
sidebar_position: 1
---

# useToggle

`useToggle` is a Hook for managing boolean state toggles, supporting React, Vue, and Solid frameworks.

## Basic Usage

### React

```tsx
import { useToggle } from '@septem/hooks/react';

function ToggleDemo() {
  const [value, toggle] = useToggle();
  
  return (
    <div>
      <p>Current state: {value.toString()}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Set to true</button>
      <button onClick={() => toggle(false)}>Set to false</button>
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
    <p>Current state: {{ value }}</p>
    <button @click="toggle()">Toggle</button>
    <button @click="toggle(true)">Set to true</button>
    <button @click="toggle(false)">Set to false</button>
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
      <p>Current state: {value().toString()}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Set to true</button>
      <button onClick={() => toggle(false)}>Set to false</button>
    </div>
  );
}
```

## API

```typescript
const [state, toggle] = useToggle(initialValue?: boolean);
```

### Parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| initialValue | Initial state value | `boolean` | `false` |

### Return Values

| Return Value | Description | Type |
| --- | --- | --- |
| state | Current state | Framework-specific state value |
| toggle | Function to toggle state | `(value?: boolean) => void` |