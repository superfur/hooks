---
sidebar_position: 1
---

# Hooks Overview

@septem/hooks is a hooks library compatible with React, Vue 3, and SolidJS, providing a series of practical hooks to help you develop applications more efficiently.

## Installation

```bash
# npm
npm install @septem/hooks

# yarn
yarn add @septem/hooks

# pnpm
pnpm add @septem/hooks
```

## Available Hooks

Currently, @septem/hooks provides the following hooks:

- [useToggle](./useToggle.md) - For managing boolean toggle states
- [useLocalStorage](./useLocalStorage.md) - For persisting data in localStorage
- [useClippy](./useClippy.md) - For interacting with the clipboard

## Usage

Import hooks from the specific framework path:

```js
// React
import { useToggle } from '@septem/hooks/react';

// Vue 3
import { useToggle } from '@septem/hooks/vue';

// SolidJS
import { useToggle } from '@septem/hooks/solid';
```

## Framework Differences

Although all hooks have the same functionality across different frameworks, their return value formats differ slightly due to framework characteristics:

| Framework | State Format | Example |
| --- | --- | --- |
| React | Direct value | `const [value, setValue] = useState(false)` |
| Vue 3 | Ref object | `const [value, setValue] = useState(false) // value.value` |
| SolidJS | Signal | `const [value, setValue] = createSignal(false)` |