<script setup>
import { inject } from 'vue';
let themeColor = inject("themeColor");
let props = defineProps({
    boder:Boolean
})
</script>
<template>
    <div class="box">
        <div class="inbox" v-bind:class="{boder:props.boder}">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;
}
.inbox{
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 30%);
    flex: 1;
    overflow-y: auto;
}
.boder{
    border: 0.05rem solid rgba(0, 0, 0, 30%);
}
.inbox::-webkit-scrollbar {
  width: 0.5rem;
  height: 100%;
}

.inbox::-webkit-scrollbar-thumb {
  background-color: v-bind('`rgba(${themeColor.r},${themeColor.g},${themeColor.b},30%)`');
  border-radius: 1rem;
}
</style>