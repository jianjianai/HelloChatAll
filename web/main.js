import "./assets/main.css";
import { createApp } from "vue";
import HelloChatAI from "./components/HelloChatAI.vue";

// 配置marked
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { mangle } from "marked-mangle";
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);
marked.use(gfmHeadingId({ prefix: "my-prefix-" }));
marked.use(mangle());

//加载组件
createApp(HelloChatAI).mount("#HelloChatAI");

//加载动画
let load = document.getElementById("load");
load.classList.add("loaded");
setTimeout(() => {
  load.remove();
}, 500);
