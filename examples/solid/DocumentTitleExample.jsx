import { createSignal } from 'solid-js';
import { useDocumentTitle } from '../../src/solid';

// Solid.js版本的useDocumentTitle示例
// useDocumentTitle example for Solid.js
function DocumentTitleExample() {
  // 初始标题值
  // Initial title value
  const [title, setTitle] = createSignal('Solid页面 | 初始标题');
  
  // 是否在组件卸载时保留标题
  // Whether to keep the title when component unmounts
  const [keepOnUnmount, setKeepOnUnmount] = createSignal(false);
  
  // 使用useDocumentTitle钩子来设置文档标题
  // Use useDocumentTitle hook to set document title
  useDocumentTitle(title, keepOnUnmount);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useDocumentTitle 示例 (Solid)</h1>
      <p>当前文档标题: <strong>{title()}</strong></p>
      
      <div style={{ marginBottom: '15px' }}>
        <label for="title-input">更改标题: </label>
        <input 
          id="title-input"
          type="text" 
          value={title()} 
          onInput={(e) => setTitle(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px', width: '300px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={keepOnUnmount()} 
            onChange={(e) => setKeepOnUnmount(e.target.checked)}
          />
          组件卸载时保留标题
        </label>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {keepOnUnmount() 
            ? '当组件卸载时，标题将保持不变' 
            : '当组件卸载时，标题将恢复到原始值'}
        </p>
      </div>
      
      <div style={{ color: '#777', fontSize: '14px', marginTop: '30px' }}>
        <p>说明:</p>
        <ol>
          <li>更改输入框的值会立即更新文档标题</li>
          <li>可以通过复选框控制组件卸载时的行为</li>
          <li>打开浏览器的标签页查看实际效果</li>
        </ol>
      </div>
    </div>
  );
}

export default DocumentTitleExample; 