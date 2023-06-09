<script lang="ts" setup>
import Option from "../../Option.vue";
import type { BingChatWorker } from "./BingChatWorker";

let props = defineProps<{
  chatWorker: BingChatWorker
}>();

</script>
<template>
  <h3>设置当前会话 - BingAi</h3>
  <Option name="对话风格" describe="选择喜欢的对话风格"></Option>
  <div class="hr"></div>
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
