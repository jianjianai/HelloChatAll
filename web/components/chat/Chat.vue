<script lang="ts" setup>
import Input from './Input.vue';
import Messages from './Messages.vue';
import { type ChatWorker } from './ai/ChatWorker';
import { nextTick, ref, type Ref } from 'vue';
import Box from './Box.vue';
import type { ChatRecordData } from '../ChatRecordData';


let props = defineProps<{
  chatWorker?: ChatWorker,
  chatRecordData:ChatRecordData
}>();

const messageApi = ref();
const inputApi = ref();


//聊天
let sendingMessage:any = undefined;

//加载上一次的正在输入
nextTick(()=>{
  let message = messageApi.value.messages[messageApi.value.messageNextId-1];
  if(message){
    let data = message.data;
    if(data && data.isPreview){
      sendingMessage =message;
      if(data.message){
        inputApi.value.setInputText(data.message);
      }
    }
  }
})

/**
 * 回调函数，当用于发送消息时
 */
function onSendMessage(message:string) {
  if (!message) {
    return;
  }
  if (!sendingMessage) {
    sendingMessage = messageApi.value.addNewMessage("AllUserMessage", { message });
  }
  sendingMessage.data.message = message;
  sendingMessage.data.isPreview = false;
  sendingMessage = undefined;

  console.log("send", message)
  inputApi.value.setInputText('');
}

/**
 * 回调函数，当用户输入消息时，只要用户输入框变化就会触发
 * @param {String} message
 */
function onInputMessage(message:string) {
  if (message) {
    if (!sendingMessage) {
      sendingMessage = messageApi.value.addNewMessage("AllUserMessage", { message, isPreview: true });
    }
    sendingMessage.data.message = message;
  } else {
    if (sendingMessage) {
      sendingMessage.delete();
      sendingMessage = undefined;
    }
  }
  console.log("input", message)
}

</script>

<template>
  <div class="chatbox" v-if="props.chatWorker">
    <div class="message">
      <Messages ref=messageApi :chatRecordData="props.chatRecordData">
        <component :is="props.chatWorker.getChatVue()" :chatWorker="props.chatWorker"></component>
      </Messages>
    </div>
    <div class="imput">
      <Input ref=inputApi :chatRecordData="props.chatRecordData" @onSendMessage=onSendMessage @onInputMessage=onInputMessage></Input>
    </div>
  </div>
  <Box v-else>
    错误，无法加载聊天程序！
  </Box>
</template>


<style scoped>
.chatbox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}

.message {
  flex: 1;
  overflow: hidden;
  margin-bottom: 0.3rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  height: 100%;
}

.imput {
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
}
</style>
