<script setup>
import Box from "../all/Box.vue";
import Option from "../all/Option.vue";
import { ChatWorker } from '../all/ChatWorker';

let props = defineProps({
  chatWorker:ChatWorker
});

</script>
<template>
  <h3>设置 - BingAi</h3>
  <Box :boder="true">
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
  </Box>
  <h3>高级设置 - BingAi</h3>
  <Box :boder="true">
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
    <div class="hr"></div>
    <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
  </Box>
</template>
<style scoped>
h3 {
    font-size: 1.3rem;
    margin: 0;
    margin-left: 0.5rem;
    margin-bottom: 0.2rem;
    margin-top: 1rem;
}
.hr {
    border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
    margin: 0;
}
</style>
