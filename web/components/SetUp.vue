<script lang="ts" setup>
import { type ChatWorker } from './chat/ai/ChatWorker';
import RightBox from './chat/RightBox.vue';

let props = defineProps<{
  chatWorker?:ChatWorker
}>();

console.log(props.chatWorker)

</script>

<template>
    <RightBox>
        <component v-if="props.chatWorker" :is="props.chatWorker.getSetUpVue()" :chatWorker="props.chatWorker"></component>
    </RightBox>
</template>

<style scoped>

</style>