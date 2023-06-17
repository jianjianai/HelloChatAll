<script lang="ts" setup>
import { markRaw, reactive, ref, type Raw, type DefineComponent, toRaw, watchEffect, readonly, watch } from 'vue';
import { useAutoScrolling } from '../useAutoScrolling';
import { useThemeColor } from '../ThemeColor';
import type { ChatRecordData } from '../ChatRecordData';
import type { ChatWorker } from './ai/ChatWorker';
import { allTypeList } from './ai/all/AllTypeList';
import type { Message } from './Messages';

class MyMessage implements Message{
  id: string;
  type: string;
  data: Object;
  ref = ref(undefined);
  /**
   * @param save 当data变化时的回调函数，返回可直接json的对象
   */
  constructor(id: string, type: string, data: Object) {
    this.id = id;
    this.type = type;
    this.data = reactive(data);
  }
  delete() {//删除当前消息
    delete messages[this.id];
  }
}

let props = defineProps<{
  chatRecordData: ChatRecordData,
  chatWorker:ChatWorker
}>();

let messageTypes = props.chatWorker.getTypeList();
let messages: { [id: string]: MyMessage } = reactive({});
let messageNextId = ref(1);
let chatBoxDom = ref();

function getMessageType(type:string){
  let the = messageTypes[type];
  if(the){
    return the;
  }
  return allTypeList[type];
}

let chatRecordDataData = props.chatRecordData.getData();
//加载聊天记录，如果有的话
(() => {
  if (chatRecordDataData.chatMessages) {
    let data = chatRecordDataData.chatMessages as {[id:string]:object};
    for(let id in data){
      let theData = data[id] as {type:string,data:Object};
      if(theData.type || theData.data){
        addMessage(theData,id);
      }
    }
  }
})();

//更时新聊天记录保存到浏览器中
function update(id: string, type: string, data: Object) {
  if (!chatRecordDataData.chatMessages) {
    chatRecordDataData.chatMessages = {};
  }
  (chatRecordDataData.chatMessages as {[id:string]:object})[id] = {type,data};
}


function getNextMessageId(): string {
  return (messageNextId.value++).toString();
}


function addMessage(message: { type: string, data: Object }, id?: string) {
  let theId;
  if (id) {
    let nid = parseInt(id);
    if (nid) {
      if (nid >= messageNextId.value) {
        messageNextId.value = nid + 1;
      }
    }
    theId = id;
  } else {
    theId = getNextMessageId();
  }
  let theMessage = markRaw(new MyMessage(theId, message.type, message.data))
  messages[theId] = theMessage;

  //监视消息变化
  watch(theMessage.data,() => {
    update(theMessage.id, theMessage.type, toRaw(theMessage.data));
  });
  return theMessage;
}
/**
 * 添加一条消息
 */
function addNewMessage(type: string, data: object): Raw<MyMessage> {
  return addMessage({ type, data });
}

useAutoScrolling(chatBoxDom);

defineExpose({
  addNewMessage,
  messages:readonly(messages),
  messageNextId:readonly(messageNextId)
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
          <component v-if="getMessageType(message.type)" :is="getMessageType(message.type)" :data="message.data"
            ref="message.ref"></component>
          <div v-else>错误!找不到组件:{{ message.type }}</div>
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

.end {
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
  position: relative;
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