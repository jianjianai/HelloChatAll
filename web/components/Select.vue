<script setup>
import { inject, ref, watchEffect } from "vue";
import ArrowLeftCircleFill from "../icon/ArrowLeftCircleFill.vue"
import { ChatRecordDataManager } from "../class/chatRecord/ChatRecordDataManager.js"
import uerChatRecordData from "../use/uerChatRecordData";
import Trash3 from "../icon/Trash3.vue";

const emit = defineEmits(["SwitchUseRecordData"])

const allChatRecord = ChatRecordDataManager.getAllChatRecord();
const useChatRecord = uerChatRecordData();



let isExpand = ref(true);//是否缩小
let themeColor = inject("themeColor");

function deleteChatRecord(theChatRecord) {
  if(useChatRecord.value && useChatRecord.value.getID()===theChatRecord.getID()){
    useChatRecord.value = undefined;
  }
  theChatRecord.delete();
}


</script>

<template>
  <div class="top" v-on:click="isExpand = !isExpand">
    <Transition name="show">
      <div class="title" v-show="isExpand">
        选择聊天AI
      </div>
    </Transition>

    <ArrowLeftCircleFill class="top-icon" :class="{ small: !isExpand }"></ArrowLeftCircleFill>
  </div>
  <!-- 新建 -->
  <div class="select" v-bind:class="{ selected: useChatRecord === undefined }" v-on:click="useChatRecord = undefined">
    <div class="img">
    </div>
    <Transition name="show">
      <div v-show="isExpand" class="name">
        创建新的聊天
      </div>
    </Transition>

  </div>
  <!-- 列表 -->
  <TransitionGroup name="list">
    <template v-for="re of allChatRecord" :key=re.getID()>
      <div class="select" v-bind:class="{ selected: useChatRecord ? useChatRecord.getID() === re.getID() : false }"
        @click="() => { useChatRecord = re }">
        <div class="img">
        </div>
        <Transition name="show">
          <div v-show="isExpand" class="name">
            {{ re.getName() }}
          </div>
        </Transition>
        <Trash3 class="delte" v-show="isExpand" @click.stop="() => { deleteChatRecord(re) }"></Trash3>
      </div>
    </template>
  </TransitionGroup>
</template>

<style scoped>
.delte {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},100%)`');
  transition: color 0.5s;
}

.delte:hover {
  color: rgba(255, 45, 45, 0.633);
}

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

.select {
  margin: 0.5rem 0.5rem;
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
  position: relative;
}

.select:has(.delte:hover) {
  border: 0.05rem solid rgba(255, 49, 49, 0.618);
  background-color: rgba(255, 179, 179, 0.248);
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
  margin: 0 0.5rem;
  height: 1.5rem;
  width: 7rem;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
}

.title {
  width: 5rem;
  font-size: 1rem;
  height: 1.5rem;
  overflow: hidden;
  margin-left: 1rem;
}


.img {
  background-color: aliceblue;
  margin: 0.3rem;
  height: 2rem;
  width: 2rem;
}


/* 动画 */
.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease;
}

.show-enter-from,
.show-leave-to {
  width: 0;
  margin: 0;
  padding: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from{
  opacity: 0;
  transform: translateX(100%);
}
.list-leave-to{
  opacity: 0;
  transform: translateY(-100%) translateX(100%);
}

.list-leave-active {
  position: absolute;
}
</style>