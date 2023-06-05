<script setup>
import { ref, watchEffect } from 'vue';
import {ChatWorker} from './chats/all/ChatWorker';
import Box from './chats/all/Box.vue';

let props = defineProps({
  chatWorker:ChatWorker
});


</script>

<template>
    <Box>
        <component v-if="props.chatWorker" :is="props.chatWorker.getSetUpVue()" :chatWorker="props.chatWorker"></component>
    </Box>
</template>

<style scoped>

</style>