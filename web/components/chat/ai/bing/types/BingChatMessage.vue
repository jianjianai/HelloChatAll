<script lang="ts" setup>
import "@/assets/github-markdown-css.css"
import { ref, watchEffect } from 'vue';
import { marked } from 'marked';
import type { BingChatMessageData } from "./BingChatMessageData";


let props = defineProps<{
    data:BingChatMessageData
}>();
let data = props.data;
let makerdom = ref("");

watchEffect(() => {
    makerdom.value = marked.parse(data.makerMessage);
});
</script>

<template>
    <div class="align">
        <div class="bubble">
            <div class="messageBox markdown-body" v-html="makerdom"></div>
        </div>
    </div>
</template>


<style scoped>
.bubble {
    background-color: rgb(255, 255, 255);
    display: inline-block;
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 0.8rem;
    max-width: 90%;
}

.align {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
}
</style>