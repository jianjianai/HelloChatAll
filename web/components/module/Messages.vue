<script setup>
import { inject, markRaw, reactive, ref } from 'vue';
import useAutoScrolling from "../../use/useAutoScrolling"
import { useThemeColor } from '../../class/ThemeColorManager';
let messages = reactive({});
let messageNextId = 0;
let chatBoxDom = ref();

function getNextMessageId() {
  return messageNextId++;
}

class Message {
  id;
  type;
  data;
  ref = ref(undefined);
  constructor(id, type, data) {
    this.id = id;
    this.type = markRaw(type);
    this.data = reactive(data);
  }
  delete() {//删除当前消息
    delete messages[this.id];
  }
}

/**
 * 添加一条消息
 * @param {组件} type 
 * @param {数据对象} data 
 * @return {Message} 消息对象
 */
function addNewMessage(type, data) {
  let id = getNextMessageId();
  let theMessage = markRaw(new Message(id, type, data));
  messages[id] = theMessage;
  return theMessage;
}

useAutoScrolling(chatBoxDom);

defineExpose({
  addNewMessage
});


</script>

<template>
  <div class="box">
    <div class="chatBox" ref=chatBoxDom>
      <div class="slot">
        <slot></slot>
      </div>
      <TransitionGroup name="messageList">
        <template class="messagesBox" v-for="message in messages" :key="message.id">
          <component :is="message.type" :data="message.data" :ref="message.ref"></component>
        </template>
      </TransitionGroup>
      <div class="end"></div>
    </div>
  </div>
</template>

<style scoped>
.messageList-enter-active,
.messageList-leave-active {
  transition: all 0.5s ease;
}
.messageList-enter-from,
.messageList-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}
.end{
  height: 3rem;
}

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
  background-color: v-bind('`rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},30%)`');
  border-radius: 1rem;
}
</style>