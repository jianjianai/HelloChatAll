<script setup>
import { inject, markRaw, reactive, ref } from 'vue';
import AiMakerDownMessage from './Messagebubbles/AiMakerDownMessage.vue';
import AiErrorMessage from './Messagebubbles/AiErrorMessage.vue';
import UserMessage from './Messagebubbles/UserMessage.vue';
import useAutoScrolling from "../../use/useAutoScrolling"

let themeColor = inject("themeColor");
let messages = reactive({});
let messageNextId = 0;
let chatBoxDom = ref();

function getNextMessageId() {
  return messageNextId++;
}

/**
 * 
 * @param {组件} type 
 * @param {对象} data 
 */
function addNewBaseMessage(type, data) {
  let id = getNextMessageId();
  let theMessage = reactive({
    id: id,
    type: markRaw(type),
    data: reactive(data),
    delete() {//删除当前消息
      delete messages[this.id];
    }
  });
  messages[id] = theMessage;
  return theMessage;
}

useAutoScrolling(chatBoxDom);

defineExpose({
  /**
   * 添加一条AI发送的makerdown消息
   */
  addAiMakerDownMessage(message) {
    return addNewBaseMessage(AiMakerDownMessage, {
      message
    })
  },
  /**
   * 添加一条错误消息
   */
  addAiErrorMessage(message) {
    return addNewBaseMessage(AiErrorMessage, {
      message
    })
  },
  /**
   * 添加一条用户消息,默认是预览状态
   */
  addUserMessage(message) {
    let theMessage = addNewBaseMessage(UserMessage, {
      message, isPreview: true
    })
    return theMessage;
  }
});


</script>

<template>
  <div class="box">
    <div class="chatBox" ref=chatBoxDom>
      <div class="slot">
        <slot></slot>
      </div>
      <div class="messagesBox" v-for="message in messages" :key="message.id">
        <component :is="message.type" :data="message.data"></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
}

.chatBox {
  margin: 0.5rem;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.messagesBox {
  width: 100%;
}

.chatBox::-webkit-scrollbar {
  width: 0.5rem;
  height: 100%;
}

.chatBox::-webkit-scrollbar-thumb {
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},30%)`');
  border-radius: 1rem;
}
</style>