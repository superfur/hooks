---
sidebar_position: 3
---

# useClippy

`useClippy` is a Hook for interacting with the clipboard, supporting React, Vue, and Solid frameworks.

## Basic Usage

### React

```tsx
import { useClippy } from '@septem/hooks/react';

function ClippyDemo() {
  const [clipboard, setClipboard] = useClippy();
  
  return (
    <div>
      <p>Current clipboard content: {clipboard}</p>
      <button onClick={() => setClipboard('Text copied to clipboard')}>Copy text</button>
      <input 
        value={clipboard} 
        onChange={(e) => setClipboard(e.target.value)} 
        placeholder="Enter text to copy"
      />
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useClippy } from '@septem/hooks/vue';

const [clipboard, setClipboard] = useClippy();
</script>

<template>
  <div>
    <p>Current clipboard content: {{ clipboard }}</p>
    <button @click="setClipboard('Text copied to clipboard')">Copy text</button>
    <input 
      v-model="clipboard.value" 
      @input="setClipboard(clipboard.value)" 
      placeholder="Enter text to copy"
    />
  </div>
</template>
```

### Solid

```tsx
import { useClippy } from '@septem/hooks/solid';

function ClippyDemo() {
  const [clipboard, setClipboard] = useClippy();
  
  return (
    <div>
      <p>Current clipboard content: {clipboard()}</p>
      <button onClick={() => setClipboard('Text copied to clipboard')}>Copy text</button>
      <input 
        value={clipboard()} 
        onInput={(e) => setClipboard(e.target.value)} 
        placeholder="Enter text to copy"
      />
    </div>
  );
}
```

## API

```typescript
const [clipboard, setClipboard] = useClippy();
```

### Return Values

| Return Value | Description | Type |
| --- | --- | --- |
| clipboard | Current clipboard content | Framework-specific state value |
| setClipboard | Function to update clipboard | `(value: string) => void` |

### Browser Compatibility

This hook uses the Clipboard API, which is supported in most modern browsers. For older browsers, it falls back to using `document.execCommand('copy')` when possible.