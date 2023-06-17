<script lang="ts" setup>
import Input from './Input.vue';
import Messages from './Messages.vue';
import { type ChatWorker } from './ai/ChatWorker';
import { nextTick, onMounted, ref, type Ref } from 'vue';
import RightBox from './RightBox.vue';
import type { ChatRecordData } from '../ChatRecordData';
import type { AllUserMessageData } from './ai/all/AllUserMessageData';
import type { AllUserMessage } from './Messages';


let props = defineProps<{
  chatWorker: ChatWorker,
  chatRecordData: ChatRecordData
}>();
const isLoaded = ref(false);
const messageApi = ref();
const inputApi = ref();

//聊天
let sendingMessage: AllUserMessage|undefined = undefined;

onMounted(()=>{
  //初始化chatworker
  props.chatWorker.init(props.chatRecordData,messageApi.value.addNewMessage);
  isLoaded.value = true;
  //加载上一次的正在输入
  let message = messageApi.value.messages[messageApi.value.messageNextId - 1];
  if (message && message.type==="AllUserMessage") {
    let data = message.data;
    if (data) {
      if (data.isPreview) {
        sendingMessage = message;
        if (data.message) {
          inputApi.value.setInputText(data.message);
        }
      }
    }
  }
  //将全部正在发送设置为发送失败
  for(let key in messageApi.value.messages){
    let the = messageApi.value.messages[key];
    if (the && the.type==="AllUserMessage") {
      let data = the.data;
      if (data) {
        if (data.isSending) {
          data.isSending = false;
          data.isFall = true;
        }
      }
    }
  }
});

/**
 * 回调函数，当用于发送消息时
 */
function onSendMessage(message: string) {
  if (!message) {
    return;
  }
  if (!sendingMessage) {
    let data:AllUserMessageData = {message:message,isPreview:false,isSending:true,isFall:false};
    sendingMessage = messageApi.value.addNewMessage("AllUserMessage", data);
  }
  sendingMessage!.data.message = message;
  sendingMessage!.data.isPreview = false;
  sendingMessage!.data.isSending = true;


  let fSendingMessage = sendingMessage;
  //传递消息worker
  props.chatWorker.sendMessage(message,fSendingMessage!).then(()=>{
    fSendingMessage!.data.isSending = false;
  }).catch((error)=>{
    console.warn(error);
    fSendingMessage!.data.isSending = false;
    fSendingMessage!.data.isFall = true;
  });

  sendingMessage = undefined;
  inputApi.value.setInputText('');
}

/**
 * 回调函数，当用户输入消息时，只要用户输入框变化就会触发
 * @param {String} message
 */
function onInputMessage(message: string) {
  if (message) {
    if (!sendingMessage) {
      let data:AllUserMessageData = {message:message,isPreview:true,isSending:false,isFall:false};
      sendingMessage = messageApi.value.addNewMessage("AllUserMessage", data);
    }
    sendingMessage!.data.message = message;
  } else {
    if (sendingMessage) {
      sendingMessage.delete();
      sendingMessage = undefined;
    }
  }
}

</script>

<template>
  <div class="chatbox" v-if="props.chatWorker">
    <div class="message">
      <Messages ref=messageApi :chatRecordData="props.chatRecordData" :chatWorker="props.chatWorker">
        <component v-if="isLoaded" :is="props.chatWorker.getChatVue()" :chatWorker="props.chatWorker"></component>
      </Messages>
    </div>
    <div class="imput">
      <Input ref=inputApi @onSendMessage=onSendMessage @onInputMessage=onInputMessage></Input>
    </div>
  </div>
  <RightBox v-else>
    错误，无法加载聊天程序！
  </RightBox>
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
