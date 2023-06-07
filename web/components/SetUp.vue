<script lang="ts" setup>
import { type ChatWorker } from './chat/ai/ChatWorker';
import Box from './chat/Box.vue';

let props = defineProps<{
  chatWorker?:ChatWorker
}>();

console.log(props.chatWorker)

</script>

<template>
    <Box>
        <component v-if="props.chatWorker" :is="props.chatWorker.getSetUpVue()" :chatWorker="props.chatWorker"></component>
    </Box>
</template>

<style scoped>

</style>