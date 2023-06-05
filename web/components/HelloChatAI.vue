<script setup>
import Select from "./Select.vue"
import Chat from "./Chat.vue"
import StatusBar from "./StatusBar.vue";
import { provide, reactive, ref, watchEffect } from 'vue';
import GearFill from "../icon/GearFill.vue"
import ChatDotsFill from "../icon/ChatDotsFill.vue";
import SetUp from "./SetUp.vue"
import NewChat from "./NewChat.vue";
import uerChatRecordData from "../use/uerChatRecordData";
import {ChatWorker} from "./chats/all/ChatWorker";
import ChatAiManager from "./chats/ChatAiManager";

const useChatRecord = uerChatRecordData();
const useChatWorker = ref(undefined);
watchEffect(()=>{//当useChatRecord变化时，加载对应的ChatWorker
  let value = undefined;
  if(useChatRecord.value){
    let AIID = useChatRecord.value.getListData().AIID;
    if(AIID){
      let chatAi = ChatAiManager.getChatAi(AIID);
      if(chatAi){
        value = chatAi.newWorker(useChatRecord.value);
      }
    }
  }
  useChatWorker.value = value;
});
const openSetUp = ref(false);
let themeColor = reactive({
  r: 0,
  g: 140,
  b: 220
});
provide("themeColor", themeColor);


</script>

<template>
  <!-- 背景 -->
  <div class="background">
  </div>

  <!-- 最外层 -->
  <div class="outset">
    <!-- 上面 -->
    <div class="top">
      <StatusBar></StatusBar>
    </div>
    <!-- 下面 -->
    <div class="thedown">
      <!-- 左边部分 -->
      <div class="left">
        <Select></Select>
      </div>
      <!-- 右边部分 -->
      <div class="right">

        <!-- 设置切换按钮 -->
        <GearFill class="setUp rotate" v-show="!openSetUp" @click="openSetUp = !openSetUp"></GearFill>
        <ChatDotsFill class="setUp" v-show="openSetUp" @click="openSetUp = !openSetUp"></ChatDotsFill>

        <!-- 设置和聊天组件 -->
        <TransitionGroup name="rightTransition">
            <SetUp v-if="!useChatRecord"  v-show="openSetUp" :key="'NewSetUp'"></SetUp>
            <NewChat v-if="!useChatRecord" v-show="!openSetUp" :key="'NewChat'" ></NewChat>
            <SetUp v-if="useChatRecord"  v-show="openSetUp" :chatWorker="useChatWorker" :key="useChatRecord?useChatRecord.getID():'SetUp'+'-SetUp'"></SetUp>
            <Chat v-if="useChatRecord" v-show="!openSetUp"  :chatWorker="useChatWorker" :key="useChatRecord.getID()+'-Chat'"></Chat>
        </TransitionGroup>

      </div>
    </div>
  </div>
</template>





<!-- 标题 -->
<style scoped>
/* 动画 */
.rightTransition-enter-active {
  position: absolute;
  transition: all 0.5s ease;
}

.rightTransition-leave-active {
  position: absolute;
  transition: all 1s ease;
}

.rightTransition-enter-from {
  opacity: 0;
  transform: translateY(100%) scale(120%);
}

.rightTransition-leave-to {
  opacity: 0;
  transform: translateY(-60%) scale(80%);
}

/* 主页面 */
.outset {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.4);
  height: 98vh;
  width: 98vw;
  max-width: 75rem;
  max-height: 55rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.thedown {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;
}

.left,
.outset,
.top {
  box-shadow: black 1px 2px 2rem -1.6rem;
}

.left,
.top {
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0.5rem;
}


.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
  width: 0.5rem;
  height: 100%;
}

.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},20%)`');
  border-radius: 1rem;
}

.left {
  border-radius: 0.2rem 0.2rem 0.2rem 0.5rem;
  margin-top: 0.3rem;
  margin-right: 0.3rem;
  overflow-y: auto;
}

.right {
  flex: 1;
  border-radius: 0.2rem 0.2rem 0.5rem 0.2rem;
  margin: 0.3rem 0.5rem 0.5rem 0;
  overflow: hidden;
  position: relative;
}

.top {
  margin-bottom: 0;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem 0.5rem 0.2rem 0.2rem;
}

.setUp {
  color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},80%)`');
  position: absolute;
  top: 0;
  right: 0;
  height: 1.7rem;
  width: 1.7rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: color 0.5s;
}

.rotate {
  animation: 10s linear infinite running rotate;
}

.setUp:hover {
  color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},100%)`');
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 背景 */
.background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -10;
  height: 100vh;
  width: 100vw;
  background: v-bind('`linear-gradient(163deg, rgba(${themeColor.r},${themeColor.g},${themeColor.b},30%) 20%,rgba(${themeColor.r + 100},${themeColor.g - 50},${themeColor.b},30%) 50%,rgba(${themeColor.r},${themeColor.g},${themeColor.b},30%) 80%)`');
}
</style>
