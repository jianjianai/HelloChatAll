<script setup>
import { inject, ref } from "vue";
import UserChatAi from "../class/UserCharAi"
import ArrowLeftCircleFill from "./icon/ArrowLeftCircleFill.vue"

let isExpand = ref(true);
let themeColor = inject("themeColor");
let userChatAi = UserChatAi.getUseChatAi();
let chatAiArray = UserChatAi.getChatAiArray();


</script>

<template>
  <div class="top" v-on:click="isExpand = !isExpand">
    <div class="title" :class="{ open: isExpand }">
      选择聊天AI
    </div>
    <ArrowLeftCircleFill class="top-icon" :class="{ small: !isExpand }"></ArrowLeftCircleFill>
  </div>
  <template v-for="ai of chatAiArray" :key=ai.id>
    <div class="select" v-bind:class="{ selected: userChatAi.id === ai.id }" v-on:click="ai.use()">
      <div class="img">

      </div>
      <div :class="{ open: isExpand }" class="name">
        {{ ai.name }}
      </div>
    </div>
  </template>
</template>

<style scoped>
.top-icon {
  color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},100%)`');
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.5rem;
  transform: rotate(0deg);
  transition: transform 0.5s;
}

.top-icon.small {
  transform: rotate(180deg);
}

.top {
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  cursor: pointer;
}

.title {
  font-size: 1rem;
  height: 1.5rem;
  overflow: hidden;
  transition: all 0.5s;

  margin: 0;
  width: 0;
}

.title.open {
  margin-left: 1rem;
  width: 5rem;
}

.select {
  margin: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.228);
  border: 0.05rem solid rgba(0, 0, 0, 0.237);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color 0.5s;
}

.select:hover {
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},5%)`');
  border: 0.05rem solid v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},50%)`');
}

.select.selected {
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},20%)`');
  border: 0.05rem solid v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},90%)`');
}

.name {
  font-size: 1rem;

  overflow: hidden;

  transition: all 0.5s;
  margin: 0 0;
  width: 0;
  height: 1.5rem;
}

.name.open {
  width: 5rem;
  margin: 0 0.5rem;
}

.img {
  background-color: aliceblue;
  margin: 0.3rem;
  height: 2rem;
  width: 2rem;
}
</style>