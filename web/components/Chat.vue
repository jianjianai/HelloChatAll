<script setup>
import Input from './module/Input.vue';
import Message from './module/Messages.vue';
import { ref } from 'vue';
import uerChatRecordData from "../use/uerChatRecordData";

const useChatRecord = uerChatRecordData();
const messageApi = ref();
const inputApi = ref();


//聊天

let sendingMessage = undefined;

/**
 * 回调函数，当用于发送消息时
 * @param {String} message
 */
function onSendMessage(message) {
  if (!message) {
    return;
  }
  if (!sendingMessage) {
    sendingMessage = messageApi.value.addUserMessage(message);
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
function onInputMessage(message) {
  if (message) {
    if (!sendingMessage) {
      sendingMessage = messageApi.value.addUserMessage(message);
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
  <div class="chatbox">
    <div class="message">
      <Message ref=messageApi>
        <!-- <component :is="props.chatAI.chatVue"></component> -->
      </Message>
    </div>
    <div class="imput">
      <Input ref=inputApi @onSendMessage=onSendMessage @onInputMessage=onInputMessage></Input>
    </div>
  </div>
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
