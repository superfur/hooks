# @septem/hooks

A hooks library compatible with React, Vue 3, and SolidJS.

## Features

- **Framework Agnostic**: Use the same hooks across React, Vue 3, and SolidJS
- **TypeScript Support**: Full TypeScript support with proper types for each framework
- **Lightweight**: Minimal dependencies and tree-shakable
- **Consistent API**: Similar API patterns across all frameworks

## Installation

```bash
# npm
npm install @septem/hooks

# yarn
yarn add @septem/hooks

# pnpm
pnpm add @septem/hooks
```

## Usage

Import hooks from the specific framework path:

### React

```jsx
import { useToggle, useLocalStorage, useClippy } from '@septem/hooks/react';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const [name, setName] = useLocalStorage('user-name', '');
  const [clipboard, setClipboard] = useClippy();
  
  // Use the hooks...
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
  
  // Use the hooks...
}
```

## Available Hooks

- **useToggle**: A hook for managing boolean toggle states
- **useLocalStorage**: A hook for persisting data in localStorage
- **useClippy**: A hook for interacting with the clipboard

## Documentation

For detailed documentation and examples, visit our [documentation site](https://your-docs-site.com).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 中文文档

[查看中文文档](./README.zh-CN.md)