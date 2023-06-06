<script setup>
import { useThemeColor } from '../class/ThemeColorManager';


</script>

<template>
  <div class="background">
    <template v-if="useThemeColor.ball">
      <TransitionGroup name="list">
        <div class="ball" v-for="(b, index) in useThemeColor.ball" :key="b" v-bind:style="{
          top: b.y,
          left: b.x,
          width: b.l,
          height: b.l,
          borderRadius: b.l,
          backgroundColor: `rgba(${b.r},${b.g},${b.b},${b.a})`
        }"></div>
      </TransitionGroup>
    </template>
  </div>
</template>

<style scoped>
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* 背景 */
.background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -10;
  height: 100vh;
  width: 100vw;
  /* background: v-bind('`linear-gradient(163deg, rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},30%) 20%,rgba(${useThemeColor.r + 100},${useThemeColor.g - 50},${useThemeColor.b},30%) 50%,rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},30%) 80%)`'); */
  background-color: v-bind('`rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},40%)`');
  transition: background-color 1s;

}

.ball {
  position: absolute;
  transform: translate(-50%, -50%);
  filter: blur(10rem);
}
</style>