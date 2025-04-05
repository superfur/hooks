"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[569],{8032:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var t=s(4848),l=s(8453);const i={},o="useFocus",r={id:"hooks/useFocus",title:"useFocus",description:"\u5143\u7d20\u7126\u70b9\u7ba1\u7406 hook\u3002",source:"@site/docs/hooks/useFocus.md",sourceDirName:"hooks",slug:"/hooks/useFocus",permalink:"/hooks/hooks/useFocus",draft:!1,unlisted:!1,editUrl:"https://github.com/superfur/hooks/edit/main/website/docs/hooks/useFocus.md",tags:[],version:"current",frontMatter:{}},u={},c=[{value:"\u4f7f\u7528\u793a\u4f8b Usage Examples",id:"\u4f7f\u7528\u793a\u4f8b-usage-examples",level:2},{value:"React",id:"react",level:3},{value:"Vue",id:"vue",level:3},{value:"Solid",id:"solid",level:3},{value:"API",id:"api",level:2},{value:"\u53c2\u6570 Parameters",id:"\u53c2\u6570-parameters",level:3},{value:"\u8fd4\u56de\u503c Return Value",id:"\u8fd4\u56de\u503c-return-value",level:3},{value:"React",id:"react-1",level:4},{value:"Vue",id:"vue-1",level:4},{value:"Solid",id:"solid-1",level:4},{value:"\u7279\u6027 Features",id:"\u7279\u6027-features",level:2},{value:"\u6ce8\u610f\u4e8b\u9879 Notes",id:"\u6ce8\u610f\u4e8b\u9879-notes",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"usefocus",children:"useFocus"}),"\n",(0,t.jsx)(n.p,{children:"\u5143\u7d20\u7126\u70b9\u7ba1\u7406 hook\u3002"}),"\n",(0,t.jsx)(n.p,{children:"Element focus management hook."}),"\n",(0,t.jsx)(n.h2,{id:"\u4f7f\u7528\u793a\u4f8b-usage-examples",children:"\u4f7f\u7528\u793a\u4f8b Usage Examples"}),"\n",(0,t.jsx)(n.h3,{id:"react",children:"React"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { useFocus } from '@septem/hooks/react';\n\nfunction MyComponent() {\n  const [inputRef, focusInput] = useFocus<HTMLInputElement>();\n  \n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={focusInput}>\u805a\u7126\u8f93\u5165\u6846</button>\n    </div>\n  );\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"vue",children:"Vue"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-vue",children:'<script setup lang="ts">\nimport { useFocus } from \'@septem/hooks/vue\';\n\nconst { elementRef, focusElement } = useFocus<HTMLInputElement>();\n<\/script>\n\n<template>\n  <div>\n    <input :ref="elementRef" />\n    <button @click="focusElement">\u805a\u7126\u8f93\u5165\u6846</button>\n  </div>\n</template>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"solid",children:"Solid"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { useFocus } from '@septem/hooks/solid';\n\nfunction MyComponent() {\n  const { elementRef, focusElement } = useFocus<HTMLInputElement>();\n  \n  return (\n    <div>\n      <input ref={elementRef} />\n      <button onClick={focusElement}>\u805a\u7126\u8f93\u5165\u6846</button>\n    </div>\n  );\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,t.jsx)(n.h3,{id:"\u53c2\u6570-parameters",children:"\u53c2\u6570 Parameters"}),"\n",(0,t.jsx)(n.p,{children:"\u65e0\u53c2\u6570 / No parameters"}),"\n",(0,t.jsx)(n.h3,{id:"\u8fd4\u56de\u503c-return-value",children:"\u8fd4\u56de\u503c Return Value"}),"\n",(0,t.jsx)(n.h4,{id:"react-1",children:"React"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"[React.RefObject<T>, () => void]\n"})}),"\n",(0,t.jsx)(n.h4,{id:"vue-1",children:"Vue"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"{\n  elementRef: Ref<T | null>,\n  focusElement: () => void\n}\n"})}),"\n",(0,t.jsx)(n.h4,{id:"solid-1",children:"Solid"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"{\n  elementRef: (el?: T) => T | undefined,\n  focusElement: () => void\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u7279\u6027-features",children:"\u7279\u6027 Features"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u652f\u6301\u6cdb\u578b\u7c7b\u578b / Supports generic types"}),"\n",(0,t.jsx)(n.li,{children:"\u81ea\u52a8\u5904\u7406 requestAnimationFrame / Automatically handles requestAnimationFrame"}),"\n",(0,t.jsx)(n.li,{children:"\u7a7a\u5f15\u7528\u5b89\u5168 / Null reference safe"}),"\n",(0,t.jsx)(n.li,{children:"\u7c7b\u578b\u5b89\u5168 / Type-safe"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u6ce8\u610f\u4e8b\u9879-notes",children:"\u6ce8\u610f\u4e8b\u9879 Notes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4f7f\u7528 requestAnimationFrame \u786e\u4fdd\u5728\u4e0b\u4e00\u5e27\u6267\u884c\u805a\u7126\u64cd\u4f5c / Uses requestAnimationFrame to ensure focus operation executes in the next frame"}),"\n",(0,t.jsx)(n.li,{children:"\u5f53\u5143\u7d20\u5f15\u7528\u4e3a\u7a7a\u65f6\u4e0d\u4f1a\u629b\u51fa\u9519\u8bef / Does not throw error when element reference is null"}),"\n",(0,t.jsxs)(n.li,{children:["\u5728 Vue \u4e2d\u8fd4\u56de\u7684\u662f ",(0,t.jsx)(n.code,{children:"Ref"})," \u5bf9\u8c61 / Returns a ",(0,t.jsx)(n.code,{children:"Ref"})," object in Vue"]}),"\n",(0,t.jsx)(n.li,{children:"\u5728 Solid \u4e2d\u8fd4\u56de\u7684\u662f\u5f15\u7528\u56de\u8c03\u51fd\u6570 / Returns a ref callback function in Solid"}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>r});var t=s(6540);const l={},i=t.createContext(l);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);