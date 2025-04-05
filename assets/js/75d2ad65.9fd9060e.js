"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[81],{3933:(e,s,o)=>{o.r(s),o.d(s,{assets:()=>d,contentTitle:()=>l,default:()=>a,frontMatter:()=>i,metadata:()=>r,toc:()=>h});var n=o(4848),t=o(8453);const i={sidebar_position:1},l="Hooks \u603b\u89c8",r={id:"hooks/index",title:"Hooks \u603b\u89c8",description:"@septem/hooks \u662f\u4e00\u4e2a\u517c\u5bb9 React\u3001Vue 3 \u548c SolidJS \u7684 Hooks \u5e93\uff0c\u63d0\u4f9b\u4e86\u4e00\u7cfb\u5217\u5b9e\u7528\u7684 hooks\uff0c\u5e2e\u52a9\u4f60\u66f4\u9ad8\u6548\u5730\u5f00\u53d1\u5e94\u7528\u3002",source:"@site/docs/hooks/index.md",sourceDirName:"hooks",slug:"/hooks/",permalink:"/hooks/hooks/",draft:!1,unlisted:!1,editUrl:"https://github.com/superfur/hooks/edit/main/website/docs/hooks/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"hooksSidebar",next:{title:"useToggle",permalink:"/hooks/hooks/useToggle"}},d={},h=[{value:"\u5b89\u88c5",id:"\u5b89\u88c5",level:2},{value:"\u53ef\u7528\u7684 Hooks",id:"\u53ef\u7528\u7684-hooks",level:2},{value:"\u4f7f\u7528\u65b9\u5f0f",id:"\u4f7f\u7528\u65b9\u5f0f",level:2},{value:"\u6846\u67b6\u5dee\u5f02",id:"\u6846\u67b6\u5dee\u5f02",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"hooks-\u603b\u89c8",children:"Hooks \u603b\u89c8"}),"\n",(0,n.jsx)(s.p,{children:"@septem/hooks \u662f\u4e00\u4e2a\u517c\u5bb9 React\u3001Vue 3 \u548c SolidJS \u7684 Hooks \u5e93\uff0c\u63d0\u4f9b\u4e86\u4e00\u7cfb\u5217\u5b9e\u7528\u7684 hooks\uff0c\u5e2e\u52a9\u4f60\u66f4\u9ad8\u6548\u5730\u5f00\u53d1\u5e94\u7528\u3002"}),"\n",(0,n.jsx)(s.h2,{id:"\u5b89\u88c5",children:"\u5b89\u88c5"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"# npm\nnpm install @septem/hooks\n\n# yarn\nyarn add @septem/hooks\n\n# pnpm\npnpm add @septem/hooks\n"})}),"\n",(0,n.jsx)(s.h2,{id:"\u53ef\u7528\u7684-hooks",children:"\u53ef\u7528\u7684 Hooks"}),"\n",(0,n.jsx)(s.p,{children:"\u76ee\u524d\uff0c@septem/hooks \u63d0\u4f9b\u4ee5\u4e0b hooks\uff1a"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useToggle",children:"useToggle"})," - \u7528\u4e8e\u7ba1\u7406\u5e03\u5c14\u5207\u6362\u72b6\u6001"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useLocalStorage",children:"useLocalStorage"})," - \u7528\u4e8e\u5728 localStorage \u4e2d\u6301\u4e45\u5316\u6570\u636e"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useClippy",children:"useClippy"})," - \u7528\u4e8e\u4e0e\u526a\u8d34\u677f\u4ea4\u4e92"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useOnlineStatus",children:"useOnlineStatus"})," - \u7528\u4e8e\u8ddf\u8e2a\u7528\u6237\u5728\u7ebf\u72b6\u6001"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useDocumentTitle",children:"useDocumentTitle"})," - \u7528\u4e8e\u66f4\u65b0\u548c\u7ba1\u7406\u6587\u6863\u6807\u9898"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"/hooks/hooks/useWindowCommunication",children:"useWindowCommunication"})," - \u7528\u4e8e\u8de8\u7a97\u53e3\u901a\u4fe1"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"\u4f7f\u7528\u65b9\u5f0f",children:"\u4f7f\u7528\u65b9\u5f0f"}),"\n",(0,n.jsx)(s.p,{children:"\u4ece\u7279\u5b9a\u6846\u67b6\u8def\u5f84\u5bfc\u5165 hooks:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"// React\nimport { useToggle } from '@septem/hooks/react';\n\n// Vue 3\nimport { useToggle } from '@septem/hooks/vue';\n\n// SolidJS\nimport { useToggle } from '@septem/hooks/solid';\n"})}),"\n",(0,n.jsx)(s.h2,{id:"\u6846\u67b6\u5dee\u5f02",children:"\u6846\u67b6\u5dee\u5f02"}),"\n",(0,n.jsx)(s.p,{children:"\u867d\u7136\u6240\u6709 hooks \u5728\u4e0d\u540c\u6846\u67b6\u4e2d\u7684\u529f\u80fd\u76f8\u540c\uff0c\u4f46\u7531\u4e8e\u6846\u67b6\u7279\u6027\u7684\u4e0d\u540c\uff0c\u5b83\u4eec\u7684\u8fd4\u56de\u503c\u683c\u5f0f\u7565\u6709\u5dee\u5f02\uff1a"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{children:"\u6846\u67b6"}),(0,n.jsx)(s.th,{children:"\u72b6\u6001\u503c\u683c\u5f0f"}),(0,n.jsx)(s.th,{children:"\u793a\u4f8b"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"React"}),(0,n.jsx)(s.td,{children:"\u76f4\u63a5\u503c"}),(0,n.jsx)(s.td,{children:(0,n.jsx)(s.code,{children:"const [value, setValue] = useX()"})})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Vue"}),(0,n.jsx)(s.td,{children:"\u5305\u542b value \u5c5e\u6027\u7684 ref \u5bf9\u8c61"}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)(s.code,{children:"const [value, setValue] = useX()"})," \u4f7f\u7528 ",(0,n.jsx)(s.code,{children:"value.value"})," \u8bbf\u95ee"]})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{children:"Solid"}),(0,n.jsx)(s.td,{children:"\u83b7\u53d6\u51fd\u6570"}),(0,n.jsxs)(s.td,{children:[(0,n.jsx)(s.code,{children:"const [getValue, setValue] = useX()"})," \u4f7f\u7528 ",(0,n.jsx)(s.code,{children:"getValue()"})," \u8bbf\u95ee"]})]})]})]}),"\n",(0,n.jsx)(s.p,{children:"\u6bcf\u4e2a hook \u7684\u6587\u6863\u9875\u9762\u90fd\u5305\u542b\u4e86\u9488\u5bf9\u4e0d\u540c\u6846\u67b6\u7684\u4f7f\u7528\u793a\u4f8b\u3002"})]})}function a(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},8453:(e,s,o)=>{o.d(s,{R:()=>l,x:()=>r});var n=o(6540);const t={},i=n.createContext(t);function l(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);