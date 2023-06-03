<script setup>
import Select from "./components/Select.vue"
import Chat from "./components/Chat.vue"
import StatusBar from "./components/StatusBar.vue";
import { provide, reactive, ref } from 'vue';

let themeColor = reactive({
  r: 0,
  g: 140,
  b: 220
});
provide("themeColor",themeColor);


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
        <Chat></Chat>
      </div>
    </div>
  </div>
</template>





<!-- 标题 -->
<style scoped>





/* 主页面 */
.outset {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.4);
  height: 90vh;
  width: 90vw;
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
  overflow:hidden;
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
.right::-webkit-scrollbar{
  width: 0.5rem;
  height: 100%;
}
.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb{
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},20%)`');
  border-radius: 1rem;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: nowrap;
  justify-content: flex-start;
  border-radius: 0.2rem 0.2rem 0.2rem 0.5rem;
  margin-top: 0.3rem;
  margin-right: 0.3rem;
  overflow-y: auto;
}
.right {
  flex: 1;
  border-radius: 0.2rem 0.2rem 0.5rem 0.2rem;
  margin: 0.3rem 0.5rem 0.5rem 0rem;
  overflow: hidden;
}

.top{
  margin-bottom: 0;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem 0.5rem 0.2rem 0.2rem;
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
