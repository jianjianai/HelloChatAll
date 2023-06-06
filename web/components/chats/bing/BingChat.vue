<script setup>
import Box from '../all/Box.vue';
import { ChatWorker } from '../all/ChatWorker';

let props = defineProps({
  chatWorker: ChatWorker
});

</script>

<template>
  <h2>
    hello BingAi
  </h2>
  <div class="theBox">
    <Box>
      <h3>调整偏好设置</h3>
      <div class="listBox">
        <div class="option">
          <h3>有创造力</h3>
          <p>使对话更有创造力</p>
        </div>
        <div class="option">
          <h3>平衡</h3>
          <p>在有创造力和精确之间平衡</p>
        </div>
        <div class="option">
          <h3>精确</h3>
          <p>使对话更精确</p>
        </div>
      </div>
    </Box>
  </div>
</template>
<style scoped>
.option {
  width: 10rem;
  height: 5rem;
  background-color: rgba(240, 248, 255, 0.322);
  margin: 1rem;
  border-radius: 1rem;
  border: 0.05rem solid rgba(0, 0, 0, 0.219);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
}

.option>h3 {
  margin: 0;
  font-size: 1rem;
}

.option>p {
  margin: 0;
  font-size: 0.8rem;
}

.listBox {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
}

.theBox {
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
  margin:0rem;
  margin-top: 1rem;
}
</style>
