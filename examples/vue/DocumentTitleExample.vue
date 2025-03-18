<script setup>
import { ref } from 'vue';
import { useDocumentTitle } from '../../src/vue';

// 初始标题值
// Initial title value
const title = ref('Vue页面 | 初始标题');

// 是否在组件卸载时保留标题
// Whether to keep the title when component unmounts
const keepOnUnmount = ref(false);

// 使用useDocumentTitle钩子来设置文档标题
// Use useDocumentTitle hook to set document title
useDocumentTitle(title, keepOnUnmount);
</script>

<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1>useDocumentTitle 示例 (Vue)</h1>
    <p>当前文档标题: <strong>{{ title }}</strong></p>
    
    <div style="margin-bottom: 15px;">
      <label for="title-input">更改标题: </label>
      <input 
        id="title-input"
        type="text" 
        v-model="title" 
        style="padding: 5px; margin-left: 10px; width: 300px;"
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <label>
        <input 
          type="checkbox" 
          v-model="keepOnUnmount"
        />
        组件卸载时保留标题
      </label>
      <p style="font-size: 14px; color: #666;">
        {{ keepOnUnmount 
          ? '当组件卸载时，标题将保持不变' 
          : '当组件卸载时，标题将恢复到原始值' }}
      </p>
    </div>
    
    <div style="color: #777; font-size: 14px; margin-top: 30px;">
      <p>说明:</p>
      <ol>
        <li>更改输入框的值会立即更新文档标题</li>
        <li>可以通过复选框控制组件卸载时的行为</li>
        <li>打开浏览器的标签页查看实际效果</li>
      </ol>
    </div>
  </div>
</template> 